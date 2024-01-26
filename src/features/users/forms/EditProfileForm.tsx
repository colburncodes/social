import {
  Button,
  Text,
  Textarea,
  TextInput
} from "@mantine/core"
import React from "react"
import { UpdateProfileInputType } from "~/src/features/users/schemas"
import { UseFormReturnType } from "@mantine/form"
import { UploadThingFileInput } from "~/src/core/components/upload-thing-file-input"

export const EditProfileForm:React.FC<{
  form: UseFormReturnType<UpdateProfileInputType>;
  onSubmit: (values: UpdateProfileInputType) => Promise<void>;
}> = ({ onSubmit, form }) => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values: UpdateProfileInputType = {
      name: form.getInputProps("name").value,
      username: form.getInputProps("username").value,
      bio: form.getInputProps("bio").value,
      avatarImageKey: form.getInputProps("avatarImageKey").value,
      coverImageKey: form.getInputProps("coverImageKey").value
    }
    await onSubmit(values)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextInput
          mb={5}
          required
          label="Name"
          placeholder="Name"
          {...form.getInputProps("name")}
        />
        <Text mb={10} size={"xs"}>This is your name. You can only change this once every 30 days.</Text>
        <TextInput
          mb={5}
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
        />
        <Text mb={10} size={"xs"}>This is your public display name. It can be your real name or a pseudonym.</Text>
        <Textarea
          mb={5}
          data-autofocus
          label="Bio"
          size={"md"}
          placeholder="User bio"
          {...form.getInputProps("bio")}
          mt="md"
        />
        <Text mb={10} size={"xs"}>You can @mention other users and organizations to link to them.</Text>
        <UploadThingFileInput form={form} name={"avatarImageKey"} label={"Profile Image"}/>

        <UploadThingFileInput form={form} name={"coverImageKey"} label={"Cover picture"}/>

        <Button color={"black"} disabled={!form.isValid()} type="submit" mt={10}>
          Update profile
        </Button>
      </form>
    </>
  )
}
