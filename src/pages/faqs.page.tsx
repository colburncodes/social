import { BlitzPage } from "@blitzjs/next"
import Layout from "~/src/core/layouts/layout"
import { Accordion, Container, Group, Title } from "@mantine/core"
import classes from "~/src/styles/Faqs.module.css"


const faqs = [
  { id: "social", label: "How do I use Social?", info: 'Just sign up to create your account — and then start creating your events.' +
      ' Trusted by millions of attendees and creators around the world, Social makes it easy to create, manage, and promote your events on the world’s largest social marketplace.' },
  { id: 'password-reset', label: 'How do I reset my password?', info: 'When you request a new password, you should receive an email confirming the request within five to ten minutes of the request. If you haven’t received your password reset email, the email may be in a folder other than your inbox or you may not be receiving emails from Social.' },
  { id: 'inactive accounts', label: 'Are accounts deactivated by Social?', info: 'Social may deactivate an account that has been inactive for 6 months with an email address that is no longer receiving Social emails. Both of these qualifications must be met in order for an account to be deactivated.' },
  { id: 'support', label: 'Contacting Social Support?',  info: 'If you need customer service, you can contact Social support anytime by submitting a request through our Help Center form. Before you submit a request, we will suggest articles that may answer your question.' }
]

export const FAQs = () => {

  const items = faqs.map((item) => (
    <Accordion.Item key={item.id} className={classes.item} value={item.id}>
      <Accordion.Control>{item.label}</Accordion.Control>
      <Accordion.Panel>{item.info}</Accordion.Panel>
    </Accordion.Item>
  ))
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Social FAQs help you plan your next event.
      </Title>
      <Accordion variant="separated">
        {items}
      </Accordion>
    </Container>
  );
}


const FaqPage: BlitzPage = () => {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Group mr={200}>
          <FAQs/>
        </Group>
      </Layout>
    </>
  )
}

export default FaqPage