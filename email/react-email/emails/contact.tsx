import * as React from "react"import {  Html,  Head,  Body,  Container,  Text, Section} from "@react-email/components"import { emailStyles } from "~/email/react-email/styles"import { Footer } from "~/email/react-email/components/footer"import { Header } from "~/email/react-email/components/header"const defaultProps = {  name: "Test User",}// @ts-ignoreexport const ContactEmail: React.FC<{  props: {    name?: string | undefined;    message?: string | undefined;  }}> = ({ props = defaultProps }) => {  const { name } = props;  return (    <Html>      <Head/>      <Body style={emailStyles.main}>        <Section>          <Text>            <Container style={emailStyles.container}>              <Section style={emailStyles.box}>                <Text style={(emailStyles.paragraph)} />                <Header/>                <Text>                  Hello {name}, thank you for contacting us!                  A member from our team will be in contact with your shortly.                </Text>                <Footer/>              </Section>            </Container>          </Text>        </Section>      </Body>    </Html>  );}export default ContactEmail;