import { ActionIcon, FileInput, Group, Image, Indicator, Loader, Text, Tooltip } from "@mantine/core"
import { IconPhoto, IconX } from "@tabler/icons-react"
import { getUploadThingUrl } from "~/src/utils/utils"
import React, { useState } from "react"
import { useUploadThing } from "~/src/core/components/upload-thing"
import { showNotification } from "@mantine/notifications"
import { UseFormReturnType } from "@mantine/form"


export const UploadThingFileInput: React.FC<{
  form: UseFormReturnType<any>;
  name: string;
  label: string
}> = ({form, name, label}) => {
  const [isLoading, setIsLoading] = useState(false)
  const iconPhoto = <IconPhoto size={16}/>

  const { startUpload } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: (res) => {
        setIsLoading(false)
        const fileKey = res?.[0]?.key;
        if (fileKey) {
          form.setFieldValue(name, fileKey)
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

  const existingImageKey = form.values[name];

  return (
    <Group>
      <Group>
        <Text size={"sm"} w={500}>{label}</Text>
        {isLoading && <Loader size={"xs"}/>}
      </Group>
      {existingImageKey &&
        <>
          <Indicator color={"none"} inline label={
            <Tooltip color={"dark"} label={"clear image"}>
              <ActionIcon onClick={() => {
                form.setFieldValue(name, "")
              }} size={"xs"} variant={"subtle"}>

                <IconX size={13}/>
              </ActionIcon>
            </Tooltip>} size={16}>
            <Image radius={"lg"} w="50px" src={getUploadThingUrl(existingImageKey)} alt={label}/>
          </Indicator>
        </>
      }
      {!existingImageKey &&
          <FileInput
            onChange={async (files) => {
              setIsLoading(true)
              if (files) {
                await startUpload([files])
              }
            }}
            clearable={true}
            leftSection={iconPhoto}
            placeholder={label}/>
}
    </Group>
  )
}