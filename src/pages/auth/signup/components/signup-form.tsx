import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core"
import { useMutation } from "@blitzjs/rpc"
import { useForm } from "@mantine/form"
import signup from "~/src/features/auth/mutations/signup"
import { notifications, showNotification } from "@mantine/notifications"
import { SignUpInput, SignUpInputType } from "~/src/features/auth/schemas"


type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  const form = useForm<SignUpInputType>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const onSubmit = async (values: SignUpInputType) => {
    const result = SignUpInput.safeParse(values);

    if (result.success) {
        await signupMutation(result.data)
    } else {
      form.setErrors(result.error.flatten().fieldErrors)
      showNotification({
        color: 'red',
        title: "Error!",
        message: 'Registration failed. Please check the input fields.'
      })
    }

    props.onSuccess?.()
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
