import {
  Button,
  FileInput,
  Group,
  Loader,
  Text,
  Textarea,
  TextInput,
  Image,
  Indicator,
  ActionIcon, Tooltip
} from "@mantine/core"
import React, { useState } from "react"
import { UpdateProfileInputType } from "~/src/features/users/schemas"
import { UseFormReturnType } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { IconPhoto, IconX } from "@tabler/icons-react"
import { useUploadThing } from "~/src/core/components/UploadThing"
import { getUploadThingUrl } from "~/src/utils/utils"

export const EditProfileForm:React.FC<{
  form: UseFormReturnType<UpdateProfileInputType>;
  onSubmit: (values: UpdateProfileInputType) => Promise<void>;
}> = ({ onSubmit, form }) => {
  const [isLoading, setIsLoading] = useState(false)
  const iconPhoto = <IconPhoto size={16}/>

  const { startUpload, permittedFileInfo } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (res) => {
        setIsLoading(false)
        const fileKey = res?.[0]?.key;
        if (fileKey) {
          form.setFieldValue("avatarImageKey", fileKey)
        }
      },
      onUploadError: () => {
        setIsLoading(false)
        showNotification({
          color: "red",
          icon: iconPhoto,
          message: "Error occurred while uploading"
        })
      }
    },
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values: UpdateProfileInputType = {
      name: form.getInputProps("name").value,
      username: form.getInputProps("username").value,
      bio: form.getInputProps("bio").value,
      avatarImageKey: form.getInputProps("avatarImageKey").value
    }
    await onSubmit(values)
  }

  const existingImageKey = form.values.avatarImageKey;
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
          required
          label="Username"
          placeholder="Username"
          {...form.getInputProps("username")}
        />
        <Text mb={10} size={"xs"}>This is your public display name. It can be your real name or a pseudonym.</Text>
        <Group>
          <Group>
            <Text size={"sm"} w={500}>Profile picture</Text>
            {isLoading && <Loader size={"xs"}/>}
          </Group>
          {existingImageKey &&
            <>
              <Indicator color={"none"} inline label={
                <Tooltip color={"dark"} label={"clear image"}>
                  <ActionIcon onClick={() => {
                    form.setFieldValue("avatarImageKey", "")
                  }} size={"xs"} variant={"subtle"}>

                    <IconX size={13}/>
                  </ActionIcon>
                </Tooltip>} size={16}>
                <Image radius={"lg"} w="50px" src={getUploadThingUrl(existingImageKey)} alt={"profile picture"}/>
              </Indicator>
            </>
          }
          {!existingImageKey &&
            <FileInput
            onChange={async (files) => {
              setIsLoading(true)
              if (files) {
                const fileData = await startUpload([files])
              }
            }}
            clearable={true}
            leftSection={iconPhoto}
            placeholder={"Profile picture"} />}
        </Group>

        <Textarea
          mb={5}
          required
          data-autofocus
          label="Bio"
          size={"md"}
          placeholder="User bio"
          {...form.getInputProps("bio")}
          mt="md"
        />
        <Text mb={10} size={"xs"}>You can @mention other users and organizations to link to them.</Text>
        <Button color={"black"} disabled={!form.isValid()} type="submit" mt={10}>
          Update profile
        </Button>
      </form>
    </>
  )
}
