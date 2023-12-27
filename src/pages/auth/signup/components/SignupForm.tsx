import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import { useForm } from "@mantine/form"
import signup from "~/src/features/auth/mutations/signup"
import { notifications } from "@mantine/notifications"

export const SignupForm = () => {
  const [signupMutation] = useMutation(signup)

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  let onSubmit = async (values: any) => {
      await signupMutation(values)
      notifications.show({
        color: "green",
        title: "Success",
        message: "Registration Successful!"
      })
  }

  return (
    <Box maw={340} mx="auto">
      <h1>Create Account</h1>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="your name"
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          withAsterisk
          label="Password"
          placeholder="your password"
          {...form.getInputProps("password")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  )
}

export default SignupForm
