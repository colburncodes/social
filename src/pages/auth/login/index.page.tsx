import { BlitzPage } from "@blitzjs/next"
import { LoginForm } from "./components/LoginForm"
import { useRouter } from "next/router"
import Layout from "~/src/core/layouts/Layout"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Log In">
        <LoginForm
          onSuccess={(_user) => {
            const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
            return router.push(next)
          }}
        />
      </Layout>
    </>
  )
}

export default LoginPage
