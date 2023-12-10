import classes from "~/src/styles/GetInTouch.module.css"
import { Button, Group, SimpleGrid, Text, Textarea, TextInput } from "@mantine/core"
import { UseFormReturnType } from "@mantine/form"
import { ContactFormInputType } from "~/src/features/contact/forms/schema"


export const ContactForm:React.FC<{
  form: UseFormReturnType<ContactFormInputType>,
  onSubmit: (values: ContactFormInputType) => Promise<void>
}> = ({ onSubmit, form}) => {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values: ContactFormInputType = {
      name: form.getInputProps("name").value,
      email: form.getInputProps("email").value,
      subject: form.getInputProps("subject").value,
      message: form.getInputProps("message").value
    }
    await onSubmit(values)
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Text fz="lg" fw={700} className={classes.title}>
          Get in touch
        </Text>

        <div className={classes.fields}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              label="Your name"
              placeholder="Your name"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Your email"
              placeholder="hello@mantine.dev" required
              {...form.getInputProps("email")}
            />
          </SimpleGrid>

          <TextInput
              mt="md"
             label="Subject"
             placeholder="Subject" required
             {...form.getInputProps("subject")}
          />

          <Textarea
            mt="md"
            label="Your message"
            placeholder="Please include all relevant information"
            minRows={3}
            {...form.getInputProps("message")}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit" disabled={!form.isValid()} className={classes.control}>
              Send message
            </Button>
          </Group>
        </div>
      </form>
    </>
  )
}