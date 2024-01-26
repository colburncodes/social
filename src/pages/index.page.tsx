import Layout from "~/src/core/layouts/layout"
import { BlitzPage } from "@blitzjs/next"
import { Box, Button, Group, Stack, Text, Title } from "@mantine/core"
import React from "react"

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
const Home: BlitzPage = () => {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout title="Home">
        <Group style={{ position: "relative", top: -50, textAlign: "center" }}>
          <Box w={600}>
            <Title order={1} mx={"auto"} lineClamp={3}><Text style={{ fontFamily: "Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif", fontSize: "2.75rem", fontWeight: "bold", lineHeight: "1.2"}}>social. An example app built using Blitz.js 2.0 using Typesafe API Layer.</Text></Title>
            <Text style={{ marginTop: 5, fontWeight: "lighter", fontSize: "18px"}}>I'm building a web app with Blitz.js 2.0 with a goal to open source everything.</Text>
            <Text style={{ textAlign: "center", fontWeight: "lighter", fontSize: "18px"}}>Follow along as we figure this out together.</Text>
          </Box>
        </Group>

        <Group style={{ margin: "auto", position: "relative", textAlign: "center", top: -30 }}>
          <Box>
            <Button bg={"black"} c={"white"}>Get Started</Button> <Button component={"a"} href="https://github.com/colburncodes/social" target={"_blank"} variant={"outline"}  c={"black"}>GitHub</Button>
          </Box>
        </Group>

        <Group style={{ position: "relative", marginTop: 50, textAlign: "center" }}>
          <Box w={600}>
            <Title order={1} mx={"auto"} lineClamp={3}><Text style={{ fontFamily: "Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif", fontSize: "40px", fontWeight: "bold", lineHeight: "1.4"}}>Features</Text></Title>
            <Text style={{ fontWeight: "lighter", fontSize: "18px"}} variant={"light"}>This project is an experiment to see how a modern app, with features like auth, typesafe API layer, subscriptions, third party integrations work with Blitz.js 2.0 pages dir.</Text>
          </Box>
        </Group>

        {/*<Text size={"md"}></Text>*/}
        {/*<Container display={"flex"}>*/}
        {/*  <Image src={`${baseUrl}/social/logos/png/black_logo_no_background.png`} height={400} width={400} alt={"Social"}/>*/}
        {/*</Container>*/}
      </Layout>
    </>
  )
}

export default Home
