import { EmailTemplate } from "~/src/features/email/types"
import EmailTemplateBlackFriday from "~/email/react-email/emails/black-friday-sale"
import DummyEmail from "~/email/react-email/emails/dummy-email"

export const emailTemplates = [
  {
    name: "Black Friday",
    value: EmailTemplate.BlackFriday,
    component: EmailTemplateBlackFriday
  },
  {
    name: "Dummy Email",
    value: EmailTemplate.Dummy,
    component: DummyEmail
  }
]