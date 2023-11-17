import { useMutation, useQuery } from "@blitzjs/rpc"
import getEvents from "../features/events/queries/getEvents"
import { Button, Group, Loader, List, Text, Stack, Input } from "@mantine/core"
import { BlitzPage } from "@blitzjs/next"
import Layout from "../core/layouts/Layout"
import React, { Suspense, useState } from "react"
import createEvent from "../features/events/mutations/createEvent"
import { notifications } from "@mantine/notifications"
import EventCard from "~/src/core/components/EventCard/EventCard"

const Events = () => {
  const [events] = useQuery(getEvents, {})
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [createEventMutation] = useMutation(createEvent, {
    onSuccess: (event) => {
      notifications.show({
        title: "Mutation successful",
        message: `Create event: ${event.title}`,
      })

      setTitle("")
      setDescription("")
    },
  })

  return (
    <Stack>
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={"Enter an event"}
      />
      <Input
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder={"Enter an event description"}
      />
      <Group>
        <Button
          size="xs"
          variant="filled"
          onClick={async () => {
            await createEventMutation({
              title: title,
              description: description,
            })
          }}
        >
          Create Event
        </Button>
      </Group>

      <List>
        {events.map((event, idx) => (
          <List.Item key={idx}>
            <EventCard key={event.id} title={event.title} description={event.description} />
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
