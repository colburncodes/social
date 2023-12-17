import React from "react"
import { Alert, Button, Group, Modal, Stack, Text, Textarea, TextInput } from "@mantine/core"
import Layout from "~/src/core/layouts/Layout"
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
import requestEmailVerification  from "~/src/features/auth/mutations/requestEmailVerification"


export const ProfilePage: BlitzPage = () => {
  const router = useRouter()
  const [opened, {close, open}] = useDisclosure(false);
  const username = useStringParam("username")
  const [user] = useQuery(getUserProfile, { username: username || '' })
  const [$updateProfile] = useMutation(updateProfile)
  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || ""
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  const [$requestEmailVerification, {isLoading: isSending}] = useMutation(requestEmailVerification)

  const icon = <IconInfoCircle/>

  if(!user) return <Text>User not found.</Text>

  const currentUser = useCurrentUser()
  const isOwner = currentUser?.id === user?.id

  const onSubmit = async (values: UpdateProfileInputType) => {
    const { username } = values;
    if (username !== user.username) {
      if (username) {
        await router.push(Routes.ProfilePage({ username }))
      }
    }
    await $updateProfile(values)
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
            <Alert variant={"outline"} color={"red"} title={"Warning"} icon={icon}>
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
            </Alert>)}
        </Group>
        {isOwner &&
          <Group>
            <Button onClick={open}>
              Edit Profile
            </Button>
          </Group>
        }
        <Text>
          Hello from {user.name}
        </Text>
        <Text>
          {user.bio}
        </Text>
      </Layout>
    </>
  )
}

export default ProfilePage