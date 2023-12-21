import Layout from "src/core/layouts/Layout"
import resetPassword from "../../features/auth/mutations/resetPassword"
import { BlitzPage, Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import Link from "next/link"
import { useForm, zodResolver } from "@mantine/form"
import { Button, Group, PasswordInput, Title } from "@mantine/core"
import { ResetPasswordInput, ResetPasswordInputType } from "~/src/features/auth/schemas"
import { useStringQueryParam } from "~/src/utils/utils"


const ResetPasswordPage: BlitzPage = () => {
  const token = useStringQueryParam("token")
  const [$resetPassword, { isLoading, isSuccess }] = useMutation(resetPassword)

  const form = useForm<ResetPasswordInputType>({
    initialValues: {
      password: "",
      passwordConfirmation: "",
      token: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(ResetPasswordInput)
  })

  const onSubmit = async (values: any) => {
      await $resetPassword({ ...values, token })
  }

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Password Reset?">
        <Title>Set a New Password</Title>

        {isSuccess && (
          <>
            <Group>
              <Title>Password Reset Successfully</Title>
              <p>
                Go to the <Link href={Routes.Home()}>homepage</Link>
              </p>
            </Group>
          </>
        )}
        {!isSuccess && (
          <form onSubmit={form.onSubmit(onSubmit)}>
            <PasswordInput withAsterisk label="Password" {...form.getInputProps("password")} />

            <PasswordInput
              withAsterisk
              label="Confirm Password"
              {...form.getInputProps("passwordConfirmation")}
            />

            <Group justify="flex-end" mt="md">
              <Button loading={isLoading} disabled={!form.isValid()} type="submit">Submit</Button>
            </Group>
          </form>
        )}
      </Layout>
    </>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = "/"

export default ResetPasswordPage
