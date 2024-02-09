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
import { Header } from "~/email/react-email/components/header"
import { Footer } from "~/email/react-email/components/footer"
import { emailStyles } from "~/email/react-email/styles"
import { APP_NAME } from "~/src/config"
import { MainButton } from "~/email/react-email/components/button"

const defaultProps = {
  name: "Test User",
  emailVerifyUrl: ""
}
// @ts-ignore
export const WelcomeEmailTemplate: React.FC<{
  props: {
    name?: string | null;
    emailVerifyUrl?: string;
  }
}> = ({ props = defaultProps }) => {
  const { name, emailVerifyUrl } = props;
  const welcomeMessage = name ? `Hello there ${name}, ` : "Hello, ";
  return <Html>
    <Head />
    <Preview>Welcome to {APP_NAME}</Preview>
    <Body style={emailStyles.main}>
      <Container style={emailStyles.container}>
        <Section style={emailStyles.box}>
          <Header/>
          <Text style={emailStyles.paragraph}>
            {welcomeMessage} welcome to our platform!
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

export default WelcomeEmailTemplate;









const anchor = {
  color: "#556cd6",
};




