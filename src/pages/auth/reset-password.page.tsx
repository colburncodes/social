import Layout from "src/core/layouts/Layout"
import { FORM_ERROR } from "src/core/components/Form"
import resetPassword from "../../features/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { assert } from "blitz"
import { useForm } from "@mantine/form"
import { Button, Group, PasswordInput } from "@mantine/core/lib"

const ResetPasswordPage: BlitzPage = () => {
  const router = useRouter()
  const token = router.query.token?.toString()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  const form = useForm({
    initialValues: {
      password: "",
      passwordConfirmation: "",
      token,
    },
  })

  const onSubmit = async (values) => {
      assert(token, "token is required.")
      await resetPasswordMutation({ ...values, token })
  }

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Password Reset?">
        <h1>Set a New Password</h1>

        {isSuccess ? (
          <div>
            <h2>Password Reset Successfully</h2>
            <p>
              Go to the <Link href={Routes.Home()}>homepage</Link>
            </p>
          </div>
        ) : (
          <form onSubmit={form.onSubmit(onSubmit)}>
            <PasswordInput withAsterisk label="Password" {...form.getInputProps("password")} />

            <PasswordInput
              withAsterisk
              label="Confirm Password"
              {...form.getInputProps("passwordConfirmation")}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        )}
      </Layout>
    </>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
