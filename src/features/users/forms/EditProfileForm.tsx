import { Button, Textarea, TextInput } from "@mantine/core"
import React from "react"
import { UpdateProfileInputType } from "~/src/features/users/schemas"
import { UseFormReturnType } from "@mantine/form"

export const EditProfileForm:React.FC<{
  form: UseFormReturnType<UpdateProfileInputType>;
  onSubmit: (values: UpdateProfileInputType) => Promise<void>;
}> = ({ onSubmit, form }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
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
    </>
  )
}
