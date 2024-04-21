import { Group, RingProgress, Tooltip, Text, List, Box, Title } from "@mantine/core"
import React from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useCurrentUser } from "~/src/features/users/hooks/useCurrentUser"
import Layout from "~/src/core/layouts/layout"


export const UserProfileProgress = () => {
  const user = useCurrentUser()
 if(!user) return null;

  const keys = [
    {
      key: "name",
      label: "Name"
    },
    {
      key: "username",
      label: "Username"
    },
    {
      key: "bio",
      label: "Bio"
    },
    {
      key: "avatarImageKey",
      label: "Profile picture"
    },
    {
      key: "coverImageKey",
      label: "Cover picture"
    }
  ]
  const existingKeys = keys.filter(({ key }) => user[key])
  const missingKeys = keys.filter(({ key }) => !user[key])

  const profilePercentage = Math.round((existingKeys.length / keys.length) * 100)

  if (profilePercentage === 100) return null

  return (
    <Link href={Routes.EditProfilePage()}>
    <Tooltip color={"dark"} label={
      <Group>
        <Text fw={"bold"} size={"sm"}>Profile Progress ({profilePercentage}%)</Text>
        <Box>
          <Text size={"sm"}>Missing:</Text>
          <List>
            {missingKeys.map(({ label }) => (
              <List.Item key={label}>{label}</List.Item>
              ))}
          </List>
        </Box>
      </Group>
    }>
      <RingProgress
        size={25}
        thickness={5}
        roundCaps
        sections={[{ value: profilePercentage, color: 'blue' }]}
      />
    </Tooltip>
    </Link>
  )
}