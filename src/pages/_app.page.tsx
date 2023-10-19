import { ErrorFallbackProps, ErrorComponent, ErrorBoundary, AppProps } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React, { Suspense } from "react"
import { withBlitz } from "src/blitz-client"
import "src/styles/globals.css"
import "@mantine/core/styles.css"
import { createTheme, MantineProvider, rem } from "@mantine/core"

function RootErrorFallback({ error }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <div>Error: You are not authenticated</div>
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    )
  }
}

const theme = createTheme({
  /** Put your mantine theme override here */
  // colors: {
  //   // Add your color
  //   dark: ['#2C2E33', '#25262B', '#1A1B1E', '#141517', '#101113' /* ... */]
  // },

  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  headings: {
    fontFamily: "Roboto, sans-serif",
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider defaultColorScheme={"light"}>
        <Suspense fallback="Loading...">
          <Component {...pageProps} />
        </Suspense>
      </MantineProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
