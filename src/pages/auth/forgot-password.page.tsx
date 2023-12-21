import Layout from "src/core/layouts/Layout"
import { FORM_ERROR } from "src/core/components/Form"
import forgotPassword from "../../features/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { useForm, zodResolver } from "@mantine/form"
import { Button, Group, TextInput, Title } from "@mantine/core"
import { ForgotPasswordInputType, ForgotPasswordInput } from "~/src/features/auth/schemas"
import { notifications } from "@mantine/notifications"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess, isLoading }] = useMutation(forgotPassword)

  const form = useForm<ForgotPasswordInputType>({
    initialValues: {
      email: "",
    },
    validate: zodResolver(ForgotPasswordInput)
  })

  let onSubmit = async (values: any) => {
      await forgotPasswordMutation(values)
    notifications.show({
      color: "green",
      title: "Success",
      message: "If your email is in our system, you will receive instructions to reset your password."
    })
  }

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Forgot Your Password?">
        <Title order={3}>Forgot your password?</Title>

        {isSuccess && (<Group>
          <Title order={3}>Request Submitted</Title>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </Group>)
        }

        {!isSuccess && (
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Group>
              <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                {...form.getInputProps("email")}
              />
            </Group>


            <Group justify="flex-start" mt="md">
              <Button disabled={!form.isValid()} loading={isLoading} type="submit">Submit</Button>
            </Group>
          </form>
        )}

      </Layout>
    </>

  )
}

export default ForgotPasswordPage
