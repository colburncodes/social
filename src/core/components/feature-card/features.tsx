import React from 'react';
import {
  Anchor,
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
import {PROD_URL} from "~/src/config";

const LOGIN_URL = `${PROD_URL}/auth/login`;

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
        <span>{feature.icon}</span>
      <Text size="lg" fw={500}  mt="md" style={{ textAlign: "left", fontWeight: theme.headings.sizes.h1.fontWeight, fontSize: theme.headings.sizes.h4.fontSize, fontFamily: theme.fontFamily }}>
        {feature.title}
      </Text>
      <Text
        style={{ textAlign: "left", fontWeight: "300", fontSize: theme.headings.sizes.h5.fontSize, color: "#000", fontFamily: theme.fontFamily }}
        size="md"
        variant="light"
        mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));


  return (
    <Container size="lg" py="xl" mr={40}>
      <Title order={2} className={classes.title} ta="center" mt="sm">
          from 0 → 1, faster
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
          production-ready saas starter kits built with
      </Text>

      <Group mt={30} justify={"center"} mb={80}>
        <Box>
          <Button
            component={"a"}
            bg={"black"} c={"white"}
            href={LOGIN_URL}
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

      <Title className={classes.title} ta="center" mt="sm">
        fully featured, end-to-end
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
          every kit comes pre-built with all essential saas features
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
        {results}
      </SimpleGrid>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        social will also include a full-featured documentation site built using Contentlayer and MDX.
      </Text>

        <Title order={2} className={classes.title} ta="center" mt={"xl"}>
            pay once. unlimited use. forever.
        </Title>

        <Text c="dimmed" className={classes.description}  ta="center" mt="sm">
            a license includes all future updates.
        </Text>

    </Container>
  );
}
