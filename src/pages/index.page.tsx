import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { AuthenticationForm } from "../core/components/AuthForm"
import { useCurrentUser } from "../features/users/hooks/useCurrentUser"
import { Button, Group, Stack } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import sendTestEmail from "~/src/features/users/mutations/sendTestEmail"

const Home: BlitzPage = () => {
  const user = useCurrentUser()
  const [$sendTestEmail] = useMutation(sendTestEmail)

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Home">
        {/* TODO: CREATE A LANDING PAGE.*/}
        {user && <Group><Button onClick={async () => {
          await $sendTestEmail({
            html: "<div> Hello Testing </div>",
            subject: "Test email",
            to: "colburnsanders@gmail.com"
          })
        }}>Send Email</Button></Group>  }
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
