import { useRouter } from "next/router"
import { SignupForm } from "./components/SignupForm"
import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "~/src/core/layouts/Layout"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Sign Up">
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </Layout>
  )
}

export default SignupPage
