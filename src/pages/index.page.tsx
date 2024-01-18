import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "../core/components/AuthForm"
import { useCurrentUser } from "../features/users/hooks/useCurrentUser"
import { Button, Group, Stack } from "@mantine/core"
import { confirmDelete } from "~/src/utils/mantine-utils"
const Home: BlitzPage = () => {
  const user = useCurrentUser()

  const deleteAccountMutation = () => {
    // wire up mutation later
    console.log("deleting account!")
  }

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Home">
        {!user && (
          <Stack>
            <AuthenticationForm />
          </Stack>
        )}
        {user && (
          <Group>
            <Button onClick={() => {
              confirmDelete(() => {
                deleteAccountMutation()
              }, {
                // override
                confirmLabel: "Delete my account"
              })
            }} color={"red"}>Delete account</Button>
          </Group>
        )}

      </Layout>
    </>
  )
}

export default Home
