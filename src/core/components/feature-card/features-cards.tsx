import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconLocation, IconChartBar, IconBrush } from '@tabler/icons-react';
import classes from '~/src/styles/FeaturesCards.module.css';

const mockdata = [
  {
    title: "Explore your city",
    description:
      "Visit a museum, try new food, go hiking, hit up a brewery tour, or just meet new people.",
    icon: <i className="devicon-nextjs-original"></i>

  },
  {
    title: "Build your career",
    description:
      "Test a prototype, network, take a class, learn a language, pitch to investors, or learn a new skill.",
    icon: IconChartBar,
  },
  {
    title: 'Get creative',
    description:
      'Create a podcast, write a screenplay, discuss art, design something, or get feedback on your work.',
    icon: IconBrush,
  },
  {
    title: 'Explore your city',
    description:
      'Visit a museum, try new food, go hiking, hit up a brewery tour, or just meet new people.',
    icon: IconLocation,
  },
  {
    title: 'Build your career',
    description:
      'Test a prototype, network, take a class, learn a language, pitch to investors, or learn a new skill.',
    icon: IconChartBar,
  },
  {
    title: 'Get creative',
    description:
      'Create a podcast, write a screenplay, discuss art, design something, or get feedback on your work.',
    icon: IconBrush,
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container color="black" size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Want to do more of what you love?
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Social was built on the idea that anyone, anywhere in the world can share
        their passion(s) for bringing people together to create memories and enrich lives.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}