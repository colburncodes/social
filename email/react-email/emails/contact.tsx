import * as React from "react"
import {
  Html,
  Head,
  Body,
  Container,
  Text, Section, Img
} from "@react-email/components"


const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const defaultProps = {
  name: "Test User",
  message: ""
}

const backgroundStyle = {
  WebkitBoxShadow: "6px 6px 40px 3px rgba(140, 152, 164, 0.2)",
  backgroundColor: "#FFF",
  borderRadius: 7,
  boxShadow: "6px 6px 40px 3px rgba(140, 152, 164, 0.2)",
  margin: "0 auto",
  width: "100%",
  padding: "0 32px",
};

const containerStyle = {
  backgroundColor: "#F5F8FA",
  width: "100%",
};
export const ContactEmail: React.FC<{
  props: {
    name?: string | null;
    message?: string | null;
  }
}> = ({ props = defaultProps }) => {
  const { name, message } = props;
  return (
    <Html>
      <Head/>
      <Body style={containerStyle}>
        <Section>
          <Text style={{ height: 45 }} />
          <Text>
            <Container style={backgroundStyle}>
              <Text style={{ height: 40 }} />
              <Img src={`${baseUrl}/images/logo.png`} width={49} height={21} alt={"logo"}/>
              <Text>
                Hello {name}, thank you for contacting us!
                A member from our team will be in contact with your shortly.
              </Text>
              <Text style={{ height: 25 }} />
              <Text>
                {message}
              </Text>
              <Text style={{ height: 50 }} />
            </Container>
          </Text>
        </Section>
      </Body>
    </Html>
  );
}