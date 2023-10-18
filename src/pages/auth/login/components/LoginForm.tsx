import login from "../../../../features/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { useForm } from "@mantine/form"
import Link from "next/link"
import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { Routes } from "@blitzjs/next"
import { useDisclosure } from "@mantine/hooks"
import { AuthenticationError, PromiseReturnType } from "blitz"
import { FORM_ERROR } from "../../../../core/components/Form"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)
  const [visible, { toggle }] = useDisclosure(false)
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const onSubmit = async (values) => {
    try {
      const user = await loginMutation(values)
      props.onSuccess?.(user)
    } catch (error: any) {
      if (error instanceof AuthenticationError) {
        return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
      } else {
        return {
          [FORM_ERROR]:
            "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
        }
      }
    }
  }

  return (
    <Box maw={500} mx="auto">
      <h1>Login</h1>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="password"
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps("password")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>

      <div>
        <Link href={Routes.ForgotPasswordPage()}>Forgot your password?</Link>
      </div>

      <div>
        <Link href={Routes.SignupPage()}>Sign Up</Link>
      </div>
    </Box>
  )
}

export default LoginForm
