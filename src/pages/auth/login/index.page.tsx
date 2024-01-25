import { BlitzPage } from "@blitzjs/next"
import Layout from "~/src/core/layouts/Layout"
import { Stack } from "@mantine/core"
import AuthenticationForm from "~/src/core/components/AuthForm"
import { useCurrentUser } from "~/src/features/users/hooks/useCurrentUser"

const LoginPage: BlitzPage = () => {
  const user = useCurrentUser()

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Log In">
        {!user && (
          <Stack>
            <AuthenticationForm />
          </Stack>
        )}
      </Layout>
    </>
  )
}

export default LoginPage
