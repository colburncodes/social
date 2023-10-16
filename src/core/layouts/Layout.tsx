import Head from "next/head"
import React, { FC, Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
type Props = {
  title?: string;
  children?: React.ReactNode
}
const Layout: BlitzLayout<Props> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "social"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={"Loading..."}>
        <div style={{ width: '100%', maxWidth: 800}}>
          {children}
        </div>
      </Suspense>
    </>
  )
}

export default Layout
