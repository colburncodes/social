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
      <Modal opened={opened} onClose={close} title="Edit Profile">
        <form onSubmit={form.onSubmit(async (values) => {
          const { username } = values;
          if (username !== user.username) {
            if (username) {
              await router.push(Routes.ProfilePage({ username }))
            }
          } else {
            await router.push(Routes.ProfilePage({ username }))
          }
          await $updateProfile(values)
          showNotification({
            color: 'green',
            title: "Success!",
            message: 'Profile updated'
          })
          close()
        })}>
          <TextInput
            required
            label="Name"
            placeholder="Name"
            {...form.getInputProps("name")}
          />
          <TextInput
            required
            label="Username"
            placeholder="Username"
            {...form.getInputProps("username")}
          />
          <Textarea
            required
            data-autofocus
            label="Bio"
            placeholder="User bio"
            {...form.getInputProps("bio")}
            mt="md"
          />
          <Button disabled={!form.isValid()} type="submit" mt={10}>
            Save
          </Button>
        </form>
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