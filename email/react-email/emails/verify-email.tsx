import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { emailStyles } from "~/email/react-email/styles"
import { MainButton } from "~/email/react-email/components/button"

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

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
          <Img src={`${baseUrl}/images/logo.png`} width={49} height={21} alt={"logo"}/>
          <Text style={emailStyles.paragraph}>
            Hello, you requested this email for verifying your account. If you didn't request it, please ignore.
          </Text>
          <MainButton href={emailVerifyUrl}>
            Click here to verify your account
          </MainButton>
          <Text style={emailStyles.paragraph}>— The Social team</Text>
          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.footer}>
            Social, Magical Road, Somewhere in US
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
};

export default VerifyEmailTemplate;

