import React from "react"
import { Button, Group, Modal, Text, Textarea, TextInput } from "@mantine/core"
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
import { showNotification } from "@mantine/notifications"
import { useRouter } from "next/router"
import { EditProfileForm } from "~/src/features/users/forms/EditProfileForm"

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

  if(!user) return <Text>User not found.</Text>

  const currentUser = useCurrentUser()
  const isOwner = currentUser?.id === user?.id

  return (
    <>
      <Modal opened={opened} onClose={() => {
        close()
        form.reset()
      }} title="Edit Profile">
        {/*form*/}
        <EditProfileForm form={form} onSubmit={form.onSubmit(async (values) => {
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
        })} />
      </Modal>
      {/* @ts-expect-error Server Component */}
      <Layout>
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