import { BlitzPage } from "@blitzjs/next"
import Layout from "~/src/core/layouts/layout"
import AuthenticationForm from "~/src/core/components/auth-form"
import { useCurrentUser } from "~/src/features/users/hooks/useCurrentUser"

const LoginPage: BlitzPage = () => {
  const user = useCurrentUser()

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Log In">
        {!user && (
          <AuthenticationForm />
        )}
      </Layout>
    </>
  )
}

export default LoginPage
