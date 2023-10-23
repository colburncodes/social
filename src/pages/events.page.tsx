import { useMutation, useQuery } from "@blitzjs/rpc"
import getEvents from "../features/events/queries/getEvents"
import { Button, Group, Loader, List, Text, Stack } from "@mantine/core"
import { BlitzPage } from "@blitzjs/next"
import Layout from "../core/layouts/Layout"
import React, { Suspense } from "react"
import createEvent from "../features/events/mutations/createEvent"
import { notifications } from "@mantine/notifications"

const Events = () => {
  const [events] = useQuery(getEvents, {})
  const [createEventMutation] = useMutation(createEvent, {
    onSuccess: (result) => {
      notifications.show({
        title: "Mutation successful",
        message: result,
      })
    },
  })

  return (
    <Stack>
      <Group>
        <Button
          size="xs"
          variant="filled"
          onClick={async () => {
            await createEventMutation({
              title: "New Event",
            })
          }}
        >
          Create Event
        </Button>
      </Group>

      <List>
        {events.map((event) => (
          <List.Item key={event.id}>
            <Text>{event.title}</Text>
          </List.Item>
        ))}
      </List>
    </Stack>
  )
}

export const EventsPage: BlitzPage = () => {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Events />
      </Suspense>
    </Layout>
  )
}

export default EventsPage
