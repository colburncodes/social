import { Button, Card, Group, PasswordInput, Title, Text } from "@mantine/core"
import { useForm, zodResolver } from "@mantine/form"
import { ChangePasswordInput, ChangePasswordInputType } from "~/src/features/auth/schemas"
import { useMutation } from "@blitzjs/rpc"
import changePasswordLoggedInUser from "~/src/features/auth/mutations/changePasswordLoggedInUser"
import { showNotification } from "@mantine/notifications"


export const ChangePassword = () => {
  const [$changePasswordLoggedInUser, {isLoading, isSuccess}] = useMutation(changePasswordLoggedInUser)

  const form = useForm<ChangePasswordInputType>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
    validate: zodResolver(ChangePasswordInput),
    validateInputOnBlur: true,
  })

  const onSubmit = async (values: ChangePasswordInputType) => {
    const result = ChangePasswordInput.safeParse(values)
    if (result.success) {
      await $changePasswordLoggedInUser({ ...result.data })
      form.reset()
    } else {
      form.setErrors(result.error.flatten().fieldErrors)
      showNotification({
        color: 'red',
        title: "Error!",
        message: 'Failed to update password. Please check the input fields.'
      })
    }
    showNotification({
      color: 'green',
      title: "Success!",
      message: 'Password updated'
    })
  }

  return(
    <>
      <Card withBorder w={"100%"} maw={300} ml={"20"}>
        <Group>
          <Title order={4}>
            Change Password
          </Title>
          <Group w={"100%"}>
            <form onSubmit={form.onSubmit(onSubmit)}>
              <PasswordInput
                w={200}
                size={"sm"}
                withAsterisk
                label="Current Password"
                placeholder={"current password"}
                {...form.getInputProps("currentPassword")} />

              <PasswordInput
                mt={5}
                w={200}
                size={"sm"}
                withAsterisk
                label="New Password"
                placeholder={"new password"}
                {...form.getInputProps("newPassword")} />

              <PasswordInput
                w={200}
                mt={5}
                withAsterisk
                size={"sm"}
                label="Confirm Password"
                placeholder={"confirm password"}
                {...form.getInputProps("newPasswordConfirmation")}
              />
              <Group justify="flex-start" mt="md">
                <Button size={"xs"} loading={isLoading} disabled={!form.isValid()} type="submit">Update password</Button>
              </Group>
            </form>
          </Group>
        </Group>
      </Card>
    </>
  )
}
