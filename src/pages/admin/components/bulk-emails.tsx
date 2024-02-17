import { Button, Group, Select } from "@mantine/core"
import { EmailList } from "~/src/features/email/types"
import { useMutation } from "@blitzjs/rpc"
import sendBulkEmail from "~/src/features/email/mutations/sendBulkEmail"
import { useState } from "react"

const options = [
  { value: EmailList.Marketing, label: "Marketing" },
  { value: EmailList.Product, label: "Product" },
  { value: EmailList.All, label: "All" }
]
export const BulkEmails = () => {
  const [list, setList] = useState<EmailList>(EmailList.All)
  const [$sendBulkEmail] = useMutation(sendBulkEmail)
  return (
    <>
      <Group>
        <Select
          placeholder="Pick value"
          data={options}
          defaultValue={EmailList.All}
          value={list}
          onChange={(value) => setList(value as EmailList)}
        />
      </Group>
      <Button mt={20} onClick={async() => {
        await $sendBulkEmail({ list })
      }}>
        Send Bulk Email
      </Button>
    </>
  )
}