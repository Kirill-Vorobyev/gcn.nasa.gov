import hashlib
from datetime import datetime
from typing import Optional

from boto3.dynamodb.conditions import Key  # type: ignore

from ..api_db import dynamodb, session
from ..base.models import DynamoDBBase  # type: ignore
from ..base.schema import BaseSchema

# Conntect to S3
s3 = session.resource("s3")


class UserModel(BaseSchema, DynamoDBBase):
    """
    Represents a user in the system.

    Attributes
    ----------
    username: str
        The username of the user.
    api_key: str
        The API key associated with the user.
    userlevel: int
        The user level. Defaults to 1.
    """

    __tablename__ = "acrossapi_users"

    username: str
    api_key: str
    userlevel: int = 1

    @classmethod
    def create_table(cls) -> bool:
        """
        Create the DynamoDB table for UserModel.

        Returns:
            bool: True if the table is created successfully, False otherwise.
        """
        table = dynamodb.create_table(
            TableName=cls.__tablename__,
            KeySchema=[
                {"AttributeName": "username", "KeyType": "HASH"},  # Partition key
            ],
            AttributeDefinitions=[
                {"AttributeName": "username", "AttributeType": "S"},
            ],
            ProvisionedThroughput={"ReadCapacityUnits": 5, "WriteCapacityUnits": 5},
        )
        print("Table status:", table.table_status)
        return True


class JobModel(BaseSchema, DynamoDBBase):
    """
    Model for storing information about API jobs.

    Parameters
    ----------
    jobnumber : str, optional
        The job number.
    username : str, optional
        The username associated with the job.
    reqtype : str, optional
        The request type associated with the job.
    apiversion : str, optional
        The API version associated with the job.
    began : datetime.datetime, optional
        The time the job began.
    created : datetime.datetime, optional
        The time the job was created.
    expires : datetime.datetime, optional
        The time the job expires.
    params : dict, optional
        The parameters associated with the job.
    result : str, optional
        The result of the job.
    """

    __tablename__ = "acrossapi_jobs"

    jobnumber: Optional[str] = None
    username: str
    reqtype: str
    apiversion: str
    began: datetime
    created: datetime
    expires: datetime
    params: str
    result: str

    @classmethod
    def create_table(cls) -> bool:
        """
        Creates a new DynamoDB table for storing job data.

        Returns:
            The newly created DynamoDB table object.
        """
        _ = dynamodb.create_table(
            TableName=cls.__tablename__,
            KeySchema=[
                {"AttributeName": "jobnumber", "KeyType": "HASH"},
            ],
            AttributeDefinitions=[
                {"AttributeName": "jobnumber", "AttributeType": "S"},
            ],
            ProvisionedThroughput={"ReadCapacityUnits": 5, "WriteCapacityUnits": 5},
        )
        return True

    def save(self) -> dict:
        """
        Save the job to the database.

        Returns
        -------
        dict
            A dictionary containing information about the result of the database write operation.
        """
        # DynamoDB table
        table = dynamodb.Table(self.__tablename__)

        # Create a unique key based on params, username, reqtype, and apiversion.
        idstr = str(self.params) + self.username + self.reqtype + self.apiversion
        self.jobnumber = hashlib.md5(idstr.encode()).hexdigest()

        # If result is too large, write to S3 bucket and put URI into result
        if len(self.result) > 400000:
            bucket = s3.Bucket("across-api-results")
            bucket.put_object(
                Key=self.jobnumber,
                Body=self.result,
                ContentType="application/json",
                ACL="public-read",
            )
            # Use S3 URI as result, using s3: format
            self.result = f"s3://across-api-results/{self.jobnumber}"

        # Write the job to the database
        result = table.put_item(
            TableName=self.__tablename__,
            Item={
                "jobnumber": self.jobnumber,
                "username": self.username,
                "reqtype": self.reqtype,
                "apiversion": self.apiversion,
                "began": str(self.began),
                "created": str(self.created),
                "expires": str(self.expires),
                "params": str(self.params),
                "result": str(self.result),
            },
        )
        return result

    @classmethod
    def get_by_username_param_reqtype_apiversion(
        cls, username=None, params=None, reqtype=None, apiversion=None
    ) -> object:
        """
        Retrieve a job by username, params, reqtype, and apiversion.

        Parameters
        ----------
        username : str
            The username associated with the job.
        params : dict
            The parameters associated with the job.
        reqtype : str
            The request type associated with the job.
        apiversion : str
            The API version associated with the job.

        Returns
        -------
        Job
            The job object associated with the given parameters, or None if no such job exists.
        """
        # Create unique identifier for this query
        idstr = str(params) + username + reqtype + apiversion
        cls.jobnumber = hashlib.md5(idstr.encode()).hexdigest()

        return cls.get_by_jobnumber(cls.jobnumber)

    @classmethod
    def get_by_jobnumber(cls, jobnumber: str) -> object:
        """
        Retrieve a job by its job number.

        Parameters
        ----------
        jobnumber : str
            The job number to retrieve.

        Returns
        -------
        Jobs or None
            The job object if found, None otherwise.
        """
        # Get the DynamoDB table
        table = dynamodb.Table(cls.__tablename__)

        # Get the job from the database
        response = table.query(KeyConditionExpression=Key("jobnumber").eq(jobnumber))
        items = response.get("Items")
        if not items:
            return None
        item = items[0]

        # If result is an S3 URI, load from S3
        if item["result"].startswith("s3://"):
            bucket = s3.Bucket("across-api-results")
            obj = bucket.Object(jobnumber)
            item["result"] = obj.get()["Body"].read().decode("utf-8")

        return cls(**item)


# FIXME: It's not clear to me why I have to create the tables here, they should be created by including them in api.arc?
try:
    UserModel.create_table()
    JobModel.create_table()
except Exception:
    pass
