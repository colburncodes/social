import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import image from '~/public/about.svg';
import classes from '~/src/styles/About.module.css';
import { useRouter } from "next/router"
import { FeaturesCards } from "~/src/core/components/FeaturesCard/FeaturesCards"


export const About = () => {
  const router = useRouter()
  return (
    <Container size="lg">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Be <span className={classes.highlight}>social</span> creates <br /> possibilities to find and build local communities
          </Title>
          <Text c="dimmed" mt="md">
            People use <span className={classes.highlight}>social</span> to meet new people, learn new things, find support, shake their comfort zones, and pursue their passions, together.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon c={'black'} size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Explore your city</b> – Visit a museum, try new food, go hiking, hit up a brewery tour,
              or just meet new people.
            </List.Item>
            <List.Item>
              <b>Build your career</b> – Test a prototype, network, take a class, learn a language,
              pitch to investors, or learn a new skill.
            </List.Item>
            <List.Item>
              <b>Get creative</b> – Create a podcast, write a screenplay, discuss art, design something,
              or get feedback on your work.
            </List.Item>
          </List>

          <Group mt={30}>
            <Button onClick={() => router.push('/')} fw={"bold"} radius="xl" size="md" className={classes.control}>
              Join Social
            </Button>
          </Group>
        </div>
        <Image src={image.src} className={classes.image} />
      </div>
      <FeaturesCards/>
    </Container>
  )
}
const AboutPage: BlitzPage = () => {

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Layout>
        <Group mr={200}>
          <About/>
        </Group>
      </Layout>
    </>
  )
}

export default AboutPage
