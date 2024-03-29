import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { emailStyles } from "~/email/react-email/styles"
import { MainButton } from "~/email/react-email/components/button"
import { Header } from "../components/header";
import { Footer } from "~/email/react-email/components/footer"

const defaultProps = {
  emailVerifyUrl: "Test User"
}
// @ts-ignore
export const VerifyEmailTemplate: React.FC<{
  props: {
    emailVerifyUrl?: string;
  }
}> = ({ props = defaultProps }) => {
  const { emailVerifyUrl } = props;
  return <Html>
    <Head />
    <Preview>Verify your email for social.</Preview>
    <Body style={emailStyles.main}>
      <Container style={emailStyles.container}>
        <Section style={emailStyles.box}>
          <Header/>
          <Text style={emailStyles.paragraph}>
            Hello, you requested this email for verifying your account. If you didn't request it, please ignore.
          </Text>
          <MainButton href={emailVerifyUrl}>
            Click here to verify your account
          </MainButton>
          <Footer/>
        </Section>
      </Container>
    </Body>
  </Html>
};

export default VerifyEmailTemplate;

