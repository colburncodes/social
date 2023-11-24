import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "../core/components/AuthForm"
import { useCurrentUser } from "../features/users/hooks/useCurrentUser"
import { Button, Group, Stack } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import adminOnly from "~/src/features/auth/mutations/adminOnly"

const Home: BlitzPage = () => {
  const user = useCurrentUser()
  const [$adminOnlyMutation] = useMutation(adminOnly)

  return (
    <Layout title="Home">
      {user?.isAdmin && <Group>
        <Button onClick={async () => {
          await $adminOnlyMutation()
        }}>Admin Only Button</Button>
      </Group>}
      {!user && (
        <Stack>
          <AuthenticationForm />
        </Stack>
      )}
    </Layout>
  )
}

export default Home
