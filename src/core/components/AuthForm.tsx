import { useToggle, upperFirst } from "@mantine/hooks"
import { useForm, zodResolver } from "@mantine/form"
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
import { SignUpInput, LoginInput } from "~/src/features/auth/schemas"
import { z } from "zod"
import classes from '~/src/styles/Home.module.css'


type SignupFormType = z.infer<typeof SignUpInput>
type LoginFormType = z.infer<typeof LoginInput>

export const bindCheckBoxToForm = (form: any, key: string) => {
  const inputProps = form.getInputProps(key)
  return {
    ...inputProps,
    checked: inputProps.value,
  };
}


export function AuthenticationForm(props: PaperProps) {
  const [$login] = useMutation(login)
  const [$signup] = useMutation(signup)
  const [type, toggle] = useToggle(["login", "register"])
  const form = useForm<SignupFormType>({
    validate: type === "register" ? zodResolver(SignUpInput) : zodResolver(LoginInput),
    validateInputOnBlur: true,
    validateInputOnChange: ['terms']
  })

  return (
    <Box
      className={classes.mobileView}
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
          welcome to social, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(async (values) => {
          if (type === "login") {
            await $login(values)
          } else {
            await $signup(values)
          }
        })}>
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
                {...bindCheckBoxToForm(form, "terms")}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button disabled={!form.isValid()} bg={"black"} type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Box>
  )
}

export default AuthenticationForm
