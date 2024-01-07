import React from "react"
import Layout from "~/src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { showNotification } from "@mantine/notifications"
import { EditProfileForm } from "~/src/features/users/forms/EditProfileForm"
import { useRouter } from "next/router"
import { UpdateProfileInput, UpdateProfileInputType } from "~/src/features/users/schemas"
import { useMutation, useQuery } from "@blitzjs/rpc"
import updateProfile from "~/src/features/users/mutations/updateProfile"
import { useForm, zodResolver } from "@mantine/form"
import { Text, Group, Divider } from "@mantine/core"
import getUserEditProfile from "~/src/features/users/queries/getUserEditProfile"

export const EditProfilePage: BlitzPage = () => {
  const router = useRouter()
  const [user] = useQuery(getUserEditProfile, {})
  const [$updateProfile] = useMutation(updateProfile)
  const form = useForm<UpdateProfileInputType>({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
      avatarImageKey: user?.avatarImageKey || "",
      coverImageKey: user?.coverImageKey || ""
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  })

  const onSubmit = async (values: UpdateProfileInputType) => {
    const { username } = values;
    await $updateProfile(values)
    if (username) {
      await router.push(Routes.ProfilePage({ username }))
      showNotification({
        color: 'green',
        title: "Success!",
        message: 'Profile updated'
      })
    }
  }

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Text size={"md"} fw={"bold"}>Profile</Text>
        <Text size={"xs"}>Update your profile settings.</Text>
        <Divider my={"sx"} w={420}/>
        <Group>
          <EditProfileForm form={form} onSubmit={onSubmit} />
        </Group>
      </Layout>
    </>
  )
}

export default EditProfilePage