import React from "react"
import { Alert, Button, Group, Modal, Text, Image } from "@mantine/core"
import Layout from "~/src/core/layouts/layout"
import { useStringParam } from "~/src/utils/utils"
import { BlitzPage, Routes } from "@blitzjs/next"
import getUserProfile from "~/src/features/users/queries/getUserProfile"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useCurrentUser } from "~/src/features/users/hooks/useCurrentUser"
import { useDisclosure } from "@mantine/hooks"
import { useForm, zodResolver } from "@mantine/form"
import updateProfile from "~/src/features/users/mutations/updateProfile"
import { UpdateProfileInput, UpdateProfileInputType } from "~/src/features/users/schemas"
import { notifications, showNotification } from "@mantine/notifications"
import { useRouter } from "next/router"
import { EditProfileForm } from "~/src/features/users/forms/EditProfileForm"
import { IconInfoCircle } from '@tabler/icons-react';
import requestEmailVerification from "~/src/features/auth/mutations/requestEmailVerification"


export const ProfilePage: BlitzPage = () => {
  const router = useRouter()
  const [opened, { close }] = useDisclosure(false);
  const username = useStringParam("username")
  const [user] = useQuery(getUserProfile, { username: username || '' })
  const [$updateProfile] = useMutation(updateProfile)
  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: user?.name || "",
      username: user.username || "",
      bio: user?.bio || "",
      avatarImageKey: user?.avatarImageKey || "",
      coverImageKey: user?.coverImageKey || ""
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  const [$requestEmailVerification, {isLoading: isSending, isSuccess }] = useMutation(requestEmailVerification)
  const icon = <IconInfoCircle/>
  if(!user) return <Text>User not found.</Text>

  const currentUser = useCurrentUser()
  const isOwner = currentUser?.id === user?.id

  const onSubmit = async (values: UpdateProfileInputType) => {
    const result = UpdateProfileInput.safeParse(values)

    if (result.success) {
      await $updateProfile(result.data)
      const { username } = result.data;

      if (username !== user.username) {
        if (username) {
          await router.push(Routes.ProfilePage({ username }))
        }
      }
    } else {
      form.setErrors(result.error.flatten().fieldErrors)
      showNotification({
        color: 'red',
        title: "Error!",
        message: 'Failed to update profile. Please check the input fields.'
      })
    }

    showNotification({
      color: 'green',
      title: "Success!",
      message: 'Profile updated'
    })
    close()
  }

  return (
    <>
      <Modal opened={opened} onClose={() => {
        close()
        form.reset()
      }} title="Edit Profile">
        <EditProfileForm form={form} onSubmit={onSubmit} />
      </Modal>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Group>
          {isOwner && !currentUser?.emailVerifiedAt && (
            <Alert
              variant={"outline"}
              color={"red"}
              title={isSuccess ? "Email sent!" : "Warning"}
              icon={icon}>
            {!isSuccess &&
              <>
                <Text>
                  Your email is not verified.
                Please check the welcome email we have sent you.
              </Text>
                <Button
                  loading={isSending}
                  size={"xs"}
                  color={"red"}
                  variant={"light"}
                  onClick={ async () => {
                    await $requestEmailVerification()
                    notifications.show({
                      color: "green",
                      title: "Success",
                      message: "Email sent!"
                    })
                  }}>
                  Resend verification email
                </Button>
              </>}
              {isSuccess && <Text>The email has been sent and should arrive
                in the next few minutes.
                Please be patient and check your spam folder.
              </Text>}
            </Alert>)}
        </Group>
      </Layout>
    </>
  )
}

export default ProfilePage