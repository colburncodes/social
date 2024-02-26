import { Button, Group, Select, Stack } from "@mantine/core"
import { EmailList, EmailTemplate } from "~/src/features/email/types"
import { useMutation } from "@blitzjs/rpc"
import sendBulkEmail from "~/src/features/email/mutations/sendBulkEmail"
import { useState } from "react"
import { emailTemplates } from "~/src/features/email/template"

const options = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" }
]
export const BulkEmails = () => {
  const [list, setList] = useState<EmailList>(EmailList.All)
  const [template, setTemplate] = useState<EmailTemplate>(emailTemplates[0]!.value)
  const [$sendBulkEmail] = useMutation(sendBulkEmail)

  const isTemplateFound = emailTemplates.find((t) => t.value === template)
  return (
    <>
      <Group>
      <Stack w={200}>
        <Select
          label={"Choose email list"}
          placeholder="Pick value"
          data={options}
          defaultValue={EmailList.All}
          value={list}
          onChange={(value) => setList(value as EmailList)}
        />

        <Select
          label={"Choose email template"}
          placeholder="Pick value"
          data={emailTemplates.map(e => ({
            value: e.value,
            label: e.name
          }))}
          defaultValue={EmailList.All}
          value={template}
          onChange={(value) => setTemplate(value as EmailTemplate)}
        />

        <Button mt={20} onClick={async() => {
          await $sendBulkEmail({ list, template })
        }}>
          Send Bulk Email
        </Button>
      </Stack>

        {/* @ts-expect-error Server Component */}
        {isTemplateFound && <isTemplateFound.component/>}
      </Group>
    </>
  )
}