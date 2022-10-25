/*!
 * Copyright © 2022 United States Government as represented by the Administrator
 * of the National Aeronautics and Space Administration. No copyright is claimed
 * in the United States under Title 17, U.S. Code. All Other Rights Reserved.
 *
 * SPDX-License-Identifier: NASA-1.3
 */

import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import { getLatestUserGroups, maybeThrow } from '~/lib/utils'
import { storage } from './auth.server'

export async function getUser({ headers }: Request) {
  const session = await storage.getSession(headers.get('Cookie'))
  const sub = session.get('sub') as string | null
  const email = session.get('email') as string
  const groups = session.get('groups') as string[]
  const idp = session.get('idp') as string | null
  const refreshToken = session.get('refreshToken') as string
  const cognitoUserName = session.get('cognitoUserName') as string
  if (!sub) return null
  const user = { sub, email, groups, idp, refreshToken, cognitoUserName }
  await getLatestUserGroups(user)
  return user
}

export async function updateSession(user: any) {
  const session = await storage.getSession()
  Object.entries(user).forEach(([key, value]) => {
    session.set(key, value)
  })
  await storage.commitSession(session)
}

export async function addUserToCircularSubmitterGroup(user: {
  sub: string
  email: string
  groups: string[]
  idp: string | null
  refreshToken: string
  cognitoUserName: string
}) {
  try {
    const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({})
    const command = new AdminAddUserToGroupCommand({
      Username: user.cognitoUserName,
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      GroupName: 'gcn.nasa.gov/circular-submitter',
    })
    await cognitoIdentityProviderClient.send(command)
  } catch (error) {
    maybeThrow(error, 'no group added, yet.')
  }
}
