import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "../core/components/AuthForm"
import { useCurrentUser } from "../features/users/hooks/useCurrentUser"
import { Stack } from "@mantine/core"
const Home: BlitzPage = () => {
  const user = useCurrentUser()

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Home">
        {!user && (
          <Stack>
            <AuthenticationForm />
          </Stack>
        )}
    </Layout>
    </>
  )
}

export default Home
