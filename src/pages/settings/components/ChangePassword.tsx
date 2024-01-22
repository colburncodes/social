import { Button, Card, Group, PasswordInput, Title, Text } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { ChangePasswordInput, ChangePasswordInputType } from "~/src/features/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import changePasswordLoggedInUser from "~/src/features/auth/mutations/changePasswordLoggedInUser"


export const ChangePassword = () => {

  const [$changePasswordLoggedInUser, {isLoading, isSuccess}] = useMutation(changePasswordLoggedInUser)

  const form = useForm<ChangePasswordInputType>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(ChangePasswordInput)
  })

  const onSubmit = async (values: any) => {
    await $changePasswordLoggedInUser({ ...values })
  }

  return(
    <Card withBorder w={"100%"} maw={300} ml={"20"}>
      {isSuccess && <Text>Password successfully updated!</Text>}
      {!isSuccess && <Group>
        <Title order={4}>
          Change Password
        </Title>
        <Group w={"100%"}>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <PasswordInput
              w={"100%"}
              size={"sm"}
              withAsterisk
              label="Current Password"
              placeholder={"current password"}
              {...form.getInputProps("currentPassword")} />

            <PasswordInput
              mt={5}
              w={"100%"}
              size={"sm"}
              withAsterisk
              label="New Password"
              placeholder={"new password"}
              {...form.getInputProps("newPassword")} />

            <PasswordInput
              mt={5}
              withAsterisk
              size={"sm"}
              label="Confirm Password"
              placeholder={"confirm password"}
              {...form.getInputProps("newPasswordConfirmation")}
            />

            <Group justify="flex-start" mt="md">
              <Button loading={isLoading} disabled={!form.isValid()} type="submit">Update password</Button>
            </Group>
          </form>
        </Group>
      </Group>}
    </Card>
  )
}
