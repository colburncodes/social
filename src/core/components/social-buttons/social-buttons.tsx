import { Button, ButtonProps, Group } from "@mantine/core"
import { GithubIcon, DiscordIcon, TwitterIcon } from "@mantine/ds"
import { GoogleIcon } from "./google-icon"
import { FacebookIcon } from "./facebook-icon"

export function GoogleButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return <Button leftSection={<GoogleIcon />} variant="default" {...props} />
}

export function FacebookButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return <Button leftSection={<FacebookIcon />} {...props} />
}

export function DiscordButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button leftSection={<DiscordIcon style={{ width: "1rem", height: "1rem" }} />} {...props} />
  )
}

// Twitter button as anchor
export function TwitterButton(props: ButtonProps & React.ComponentPropsWithoutRef<"a">) {
  return (
    <Button
      component="a"
      leftSection={<TwitterIcon style={{ width: "1rem", height: "1rem" }} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  )
}

export function GithubButton(props: ButtonProps & React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button {...props} leftSection={<GithubIcon style={{ width: "1rem", height: "1rem" }} />} />
  )
}

export function SocialButtons() {
  return (
    <Group justify="center" p="md">
      <GoogleButton>Continue with Google</GoogleButton>
      <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
        Follow on Twitter
      </TwitterButton>
      <FacebookButton>Sign in with Facebook</FacebookButton>
      <GithubButton>Login with GitHub</GithubButton>
      <DiscordButton>Join Discord community</DiscordButton>
    </Group>
  )
}
