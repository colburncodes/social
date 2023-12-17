import {
  Body,
  Button,
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

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const defaultProps = {
  emailVerifyUrl: "Test User"
}
export const VerifyEmailTemplate: React.FC<{
  props: {
    emailVerifyUrl?: string;
  }
}> = ({ props = defaultProps }) => {
  const { emailVerifyUrl } = props;
  return <Html>
    <Head />
    <Preview>You're now ready to make live transactions with Stripe!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img src={`${baseUrl}/images/logo.png`} width={49} height={21} alt={"logo"}/>
          <Text style={paragraph}>
            Hello, you requested this email for verifying your account. If you didn't request it, please ignore.
          </Text>
          <Button style={button} href={emailVerifyUrl}>
            Click here to verify your account
          </Button>
          <Text style={paragraph}>— The Social team</Text>
          <Hr style={hr} />
          <Text style={footer}>
            Social, Magical Road, Somewhere in US
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
};

export default VerifyEmailTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "black",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
