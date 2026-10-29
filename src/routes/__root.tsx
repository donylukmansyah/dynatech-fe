import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { ReactNode } from 'react'

import { SiteFooter } from '#/components/layout/site-footer'
import { SiteHeader } from '#/components/layout/site-header'
import appCss from '#/styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Dynatech International' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/icons/favicon-32.png' },
    ],
  }),
  component: RootLayout,
  shellComponent: RootDocument,
})

// main z-10 menutupi footer fixed sampai akhir halaman
function RootLayout() {
  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-(--pad) z-100 -translate-y-[160%] rounded-full bg-background px-4 py-2.5 font-semibold text-foreground focus-visible:translate-y-0"
      >
        Langsung ke konten
      </a>
      <SiteHeader />
      <main
        id="main"
        className="relative z-10 w-full overflow-clip bg-background"
      >
        <Outlet />
      </main>
      <SiteFooter />
    </>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  )
}
