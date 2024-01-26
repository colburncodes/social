import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react"
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
} from "@mantine/core"
import classes from "./event-card.module.css"
import { useCurrentUser } from "~/src/features/users/hooks/useCurrentUser"
import { useMutation } from "@blitzjs/rpc"
import toggleEvent from "~/src/features/events/mutations/toggleEvent"

export function EventCard({ event }) {
  const linkProps = { href: "https://mantine.dev", target: "_blank", rel: "noopener noreferrer" }
  const theme = useMantineTheme()
  const user = useCurrentUser()
  const [$toggleEvent] = useMutation(toggleEvent)

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <a {...linkProps}>
          <Image src="https://i.imgur.com/Cij5vdL.png" height={180} />
        </a>
      </Card.Section>

      <Badge className={classes.rating} variant="gradient" gradient={{ from: "yellow", to: "red" }}>
        outstanding
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {event.title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {event.description}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar
            src="https://avatars.githubusercontent.com/u/71975541?v=4"
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text fz="sm" inline>
            {user?.name}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          <ActionIcon className={classes.action}>
            <IconHeart style={{ width: rem(16), height: rem(16) }} color={theme.colors.red[6]} />
          </ActionIcon>
          <ActionIcon
            className={classes.action}
            onClick={async () =>
              await $toggleEvent({
                id: event.id,
              })
            }
          >
            {!event.bookMarked ? (
              <IconBookmark
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.gray[6]}
              />
            ) : (
              <IconBookmark
                onClick={() =>
                  $toggleEvent({
                    id: event.id,
                  })
                }
                style={{
                  width: rem(16),
                  height: rem(16),
                  fill: "yellow",
                }}
              />
            )}
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconShare style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  )
}

export default EventCard
