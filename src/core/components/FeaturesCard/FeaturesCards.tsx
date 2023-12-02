import {
  Badge,
  Group,
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
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
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
        Want do do more of what you love?
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
        hunger drives it to try biting a Steel-type Pokémon.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}