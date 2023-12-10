import React from "react"
import { Text } from "@mantine/core"
import Layout from "~/src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import { ContactCard } from "~/src/core/components/Contact/ContactCard"
import { useMutation } from "@blitzjs/rpc"
import { useForm, zodResolver } from "@mantine/form"
import { ContactFormInput, ContactFormInputType } from "~/src/features/contact/forms/schema"
import sendContactForm from "~/src/features/contact/mutations/sendContactForm"
import { useRouter } from "next/router"
import { showNotification } from "@mantine/notifications"

export const ContactPage: BlitzPage = () => {
  const router = useRouter()
  const [$sendContactForm] = useMutation(sendContactForm)
  const form = useForm<ContactFormInputType>({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    },
    validate: zodResolver(ContactFormInput),
    validateInputOnBlur: true,
  })

  const onSubmit = async (values: ContactFormInputType) => {
    try {
      await $sendContactForm(values)
      showNotification({
        color: "green",
        title: "Success",
        message: "Message Sent"
      })
      await router.push(Routes.Home())
    } catch(ex) {
      showNotification({
        color: "red",
        title: "Error",
        message: ex.message
      })
    }
  }
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Text>
          <ContactCard form={form} onSubmit={onSubmit}/>
        </Text>
      </Layout>
    </>
  )
}

export default ContactPage