/*!
 * Copyright © 2023 United States Government as represented by the
 * Administrator of the National Aeronautics and Space Administration.
 * All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import type { LinksFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'

import { Footer } from './Footer'
import { Header } from './header/Header'
import { feature } from '~/lib/env.server'
import { type BreadcrumbHandle } from '~/root/Title'

import styles from './across.css'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const handle: BreadcrumbHandle = {
  breadcrumb: 'ACROSS',
}

export function loader() {
  if (feature('LABS')) return null
  else throw new Response(null, { status: 404 })
}

export default function () {
  return (
    <>
      <Header />
      <main id="across-landing-content">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
