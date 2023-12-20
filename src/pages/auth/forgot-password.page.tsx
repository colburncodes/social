import Layout from "src/core/layouts/Layout"
import { FORM_ERROR } from "src/core/components/Form"
import forgotPassword from "../../features/auth/mutations/forgotPassword"
import { useMutation } from "@blitzjs/rpc"
import { BlitzPage } from "@blitzjs/next"
import { useForm } from "@mantine/form"
import { Button, Group, TextInput } from "@mantine/core"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  let onSubmit = async (values: any) => {
    try {
      await forgotPasswordMutation(values)
    } catch (error: any) {
      return { [FORM_ERROR]: error.toString() }
    }
  }

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Forgot Your Password?">
        <h1>Forgot your password?</h1>

        {isSuccess ? (
          <div>
            <h2>Request Submitted</h2>
            <p>
              If your email is in our system, you will receive instructions to reset your password
              shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
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

export default ForgotPasswordPage
