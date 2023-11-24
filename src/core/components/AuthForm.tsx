import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import {
  Box,
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core"
import { GoogleButton } from "./SocialButtons/SocialButtons"
import { TwitterButton } from "./SocialButtons/SocialButtons"
import { useMutation } from "@blitzjs/rpc"
import signup from "../../features/auth/mutations/signup"
import login from "../../features/auth/mutations/login"
import { useRouter } from "next/navigation"

export function AuthenticationForm(props: PaperProps) {
  const router = useRouter()
  const [$login] = useMutation(login)
  const [$signup] = useMutation(signup)
  const [type, toggle] = useToggle(["login", "register"])
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) => (val.length <= 8 ? "Password should include at least 6 characters" : null),
    },
  })

  const onSubmit = async (values: any) => {
    if (type === "login") {
      await $login(values)
      router.push('/events')
    } else {
      await $signup(values)
    }
  }

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        top: 50,
        right: 130,
      }}
    >
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" fw={"bold"} ta={"center"}>
          Welcome to Social, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            {type === "register" && (
              <TextInput
                required
                label="Name"
                placeholder="Your name"
                {...form.getInputProps("name")}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@social.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              {...form.getInputProps("password")}
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                color={"black"}
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button bg={"black"} type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  )
}

export default AuthenticationForm
