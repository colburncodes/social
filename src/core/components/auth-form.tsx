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
import {GithubButton, GoogleButton} from "./social-buttons/social-buttons"
import { TwitterButton } from "./social-buttons/social-buttons"
import { useMutation } from "@blitzjs/rpc"
import signup from "../../features/auth/mutations/signup"
import login from "../../features/auth/mutations/login"
import { SignUpInput, LoginInput } from "~/src/features/auth/schemas"
import { z } from "zod"
import classes from '~/src/styles/Home.module.css'
import React from "react"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

type SignupFormType = z.infer<typeof SignUpInput>

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
      <div className={classes.container}>
        <Box
            className={classes.formContainer}
        >
          <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={"bold"} ta={"center"}>
              welcome to social, {type} with
            </Text>

            <Group grow mb="md" mt="md">
              <GoogleButton radius="xl">Google</GoogleButton>
              <GithubButton radius="xl">Github</GithubButton>
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
                <Group justify="flex-end">
                  <Anchor
                      component={Link}
                      size="xs"
                      c="dimmed"
                      href={Routes.ForgotPasswordPage()}>Forgot password?</Anchor>
                </Group>

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
                <Button size={"sm"} disabled={!form.isValid()} bg={"black"} type="submit">
                  {upperFirst(type)}
                </Button>
              </Group>
            </form>
          </Paper>
        </Box>
      </div>
  )
}

export default AuthenticationForm
