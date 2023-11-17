import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "../core/components/AuthForm"
import { useCurrentUser } from "../features/users/hooks/useCurrentUser"
import { Stack } from "@mantine/core"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()
  return (
    <Layout title="Home">
      {!currentUser && (
        <Stack>
          <AuthenticationForm />
        </Stack>
      )}
    </Layout>
  )
}

export default Home
