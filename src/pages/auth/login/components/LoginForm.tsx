import { useMutation } from "@blitzjs/rpc"
import { useForm } from "@mantine/form"
import Link from "next/link"
import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { Routes } from "@blitzjs/next"
import { useDisclosure } from "@mantine/hooks"
import { PromiseReturnType } from "blitz"
import login from "~/src/features/auth/mutations/login"

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

  const onSubmit = async (values: any) => {
    const user = await loginMutation(values)
    props.onSuccess?.(user)
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
