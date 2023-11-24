import { useMutation, useQuery } from "@blitzjs/rpc"
import getEvents from "../features/events/queries/getEvents"
import { Button, Group, Loader, List, Text, Stack, Input } from "@mantine/core"
import { BlitzPage } from "@blitzjs/next"
import Layout from "../core/layouts/Layout"
import React, { Suspense, useEffect, useState } from "react"
import createEvent from "../features/events/mutations/createEvent"
import { notifications } from "@mantine/notifications"
import EventCard from "~/src/core/components/EventCard/EventCard"
import { useCurrentUser } from "~/src/features/users/hooks/useCurrentUser"

const Events = () => {
  const user = useCurrentUser()
  const [events] = useQuery(getEvents, {})
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [$createEvent] = useMutation(createEvent)

  useEffect(() => {
  }, [title, description])

  return (
    <Stack>
      {user && <Text>Hello {user.name} here are your events</Text>}
      <Input
        type={"text"}
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
            const response = await $createEvent({
              title: title,
              description: description,
            })

            if(response) {
              notifications.show({
                color: 'black',
                title: "Create Event",
                message: `${response.title} was successful!`
              })
            }

            setTitle("")
            setDescription("")
          }}
        >
          Create Event
        </Button>
      </Group>

      <List>
        {events.map((event, idx) => (
          <List.Item key={idx}>
            <EventCard key={event.id} event={event} />
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
