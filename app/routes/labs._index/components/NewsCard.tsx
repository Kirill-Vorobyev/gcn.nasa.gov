import { Card, CardHeader, CardMedia, CardBody, CardFooter, Button } from '@trussworks/react-uswds';

interface NewsCardProps {
  title: string;
  body: string;
  link: string;
  imageSrc: string;
  imageDescription: string;
}

export const NewsCard = ({
  title,
  body,
  link,
  imageSrc,
  imageDescription,
}: NewsCardProps) => {
  return (
    <Card
      gridLayout={{ tablet: { col: 4 } }}
      containerProps={{style: { borderRadius: '10px', borderWidth: '0px', backgroundColor: '#161821' } }}
      >
      <CardHeader>
        <h3 className="usa-card__heading text-base-lightest">{title}</h3>
      </CardHeader>
      <CardMedia>
        <img src={imageSrc} alt={imageDescription} />
      </CardMedia>
      <CardBody className="text-base-lightest">
        <p>{body}</p>
      </CardBody>
      <CardFooter>
        <Button type="button" outline onClick={event => window.location.href=link}>Link</Button>
      </CardFooter>
    </Card>
  )
}
