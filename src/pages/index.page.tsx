import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { UserInfo } from "../core/components/UserInfo"
import { AuthenticationForm } from "../core/components/AuthForm"
import { useCurrentUser } from "../features/users/hooks/useCurrentUser"
import { Stack } from "@mantine/core"

const Home: BlitzPage = () => {
  const currentUser = useCurrentUser()
  return (
    <Layout title="Home">
      {currentUser && <UserInfo />}
      {!currentUser && (
        <div
          style={{
            display: "flex",
            position: "relative",
            marginLeft: 70,
            marginTop: 50,
          }}
        >
          <Stack>
            <AuthenticationForm />
          </Stack>
        </div>
      )}
    </Layout>
  )
}

export default Home
