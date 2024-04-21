import React from 'react';
import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core"
import classes from "~/src/styles/FeaturesCards.module.css"

export function FeaturesCard({ features }) {
  const theme = useMantineTheme()
  const results =  features.map((feature: any) => (
    <Card
      key={feature.title}
      w={250}
      h={180}
      className={classes.card}
      style={{ border: "1px solid #ddd"}}
    >
      <Text size="lg" fw={500}  mt="md" style={{ textAlign: "left", fontWeight: theme.headings.sizes.h1.fontWeight, fontSize: theme.headings.sizes.h4.fontSize, fontFamily: theme.fontFamily }}>
        {feature.title}
      </Text>
      <Text
        style={{ textAlign: "left", fontWeight: "300", fontSize: theme.headings.sizes.h5.fontSize, color: "#000", fontFamily: theme.fontFamily }}
        size="sm"
        variant="light"
        mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));


  return (
    <Container size="lg" py="xl" className={classes.container}>
      <Group justify="center">
        <Badge
          bg={"#ddd"}
          c={"black"}
          component={"a"}
          variant="light"
          size="lg"
          fw={400}
          href={"https://twitter.com/whocolburn"}
          target={"_blank"}>
          Follow along on Twitter
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        social. An example app built using Blitz.js 2.0 using Typesafe API Layer.
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        I'm building a web app with Blitz.js 2.0 with a goal to open source everything.
        Follow along as we figure this out together.
      </Text>

      <Group mt={30} justify={"center"} mb={80}>
        <Box>
          <Button
            bg={"black"} c={"white"}
            style={{ marginRight: '20px', cursor: theme.cursorType }}>
            Get Started
          </Button>
          <Button
            style={{ border: "1px solid black", cursor: theme.cursorType}}
            component={"a"}
            href="https://github.com/colburncodes/social"
            target={"_blank"}
            variant={"outline"}
            c={"black"}>
            GitHub
          </Button>
        </Box>
      </Group>


      <Title order={2} className={classes.title} ta="center" mt="sm">
        Features
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        This project is an experiment to see how a modern app, with features like auth, typesafe API layer, subscriptions, third party integrations work with Blitz.js 2.0 pages dir.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {results}
      </SimpleGrid>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        social will also include a full-featured documentation site built using Contentlayer and MDX.
      </Text>

        <Title order={2} className={classes.title} ta="center" mt={"xl"}>

          Proudly Open Source
        </Title>

        <Text c="dimmed" className={classes.description}  ta="center" mt="sm">
          social is open source and powered by open source software.
          The code is available on <Anchor
          underline={"hover"}
          c={"black"}
          href={"https://github.com/colburncodes/social"}
          target={"_blank"}>
          GitHub.
        </Anchor>
        </Text>

    </Container>
  );
}
