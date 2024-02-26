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
  emailVerifyUrl: "",
  unsubscribeLink: "",
  title: "Black Friday Discount Ends Soon!",
  buttonText: "Shop Now"
}
// @ts-ignore
export const EmailTemplateBlackFriday: React.FC<{
  props: {
    name?: string | null;
    emailVerifyUrl?: string;
    unsubscribeLink: string;
    title?: string;
    buttonText?: string;
  }
}> = ({ props = defaultProps }) => {
  const { name, unsubscribeLink, title, buttonText} = props;

  return <Html>
    <Head />
    <Preview>Welcome to {APP_NAME}</Preview>
    <Body style={emailStyles.main}>
      <Container style={emailStyles.container}>
        <Section style={emailStyles.box}>
          <Header/>
          <Text style={emailStyles.paragraph}>
            {title}
          </Text>
          <MainButton href={"https://dashboard.stripe.com/login"}>
            {buttonText}
          </MainButton>
          <Footer unsubscribeLink={unsubscribeLink}/>
        </Section>
      </Container>
    </Body>
  </Html>
};

export default EmailTemplateBlackFriday;









const anchor = {
  color: "#556cd6",
};




