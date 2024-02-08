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
import { APP_NAME } from "src/config"
import { emailStyles } from "~/email/react-email/styles"
import { Footer } from "~/email/react-email/components/footer"
import { Header } from "~/email/react-email/components/header"
import { MainButton } from "~/email/react-email/components/button"

const defaultProps = {
  resetPasswordUrl: "Test User"
}
// @ts-ignore
export const ResetPasswordTemplate: React.FC<{
  props: {
    resetPasswordUrl?: string;
  }
}> = ({ props = defaultProps }) => {
  const { resetPasswordUrl } = props;
  return <Html>
    <Head />
    <Preview>Reset your password for {APP_NAME}.</Preview>
    <Body style={emailStyles.main}>
      <Container style={emailStyles.container}>
        <Section style={emailStyles.box}>
          <Header/>
          <Text style={emailStyles.paragraph}>
            You recently requested to reset your password for your Social account.
            Click the button below to reset it.
          </Text>
          <MainButton href={resetPasswordUrl}>
            Click here to reset your password.
          </MainButton>
          <Footer/>
        </Section>
      </Container>
    </Body>
  </Html>
};

export default ResetPasswordTemplate;

