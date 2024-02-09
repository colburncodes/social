import { Stack, Switch, Text } from "@mantine/core"
import React from "react"
export const ToggleUserSettings = ({disabled = false, onToggle = () => {}, checked, label, description}) => {

  return(
    <Stack mt={10}>
      <Switch
        disabled={disabled}
        onClick={onToggle}
        checked={checked}
        label={label}
        color="gray"
      />
      <Text size={"xs"}>{description}</Text>
    </Stack>
  )
}