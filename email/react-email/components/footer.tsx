import { Hr, Text } from "@react-email/components"
import * as React from "react"
import { emailStyles } from "~/email/react-email/styles"

export const Footer = () => {
  return(
    <>
      <Text style={emailStyles.paragraph}>— The Social team</Text>
      <Hr style={emailStyles.hr} />
      <Text style={emailStyles.footer}>
        Social, Magical Road, Somewhere in US
      </Text>
    </>
  )
}