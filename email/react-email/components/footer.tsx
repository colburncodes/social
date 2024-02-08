import { Hr, Text, Link } from "@react-email/components"
import * as React from "react"
import { emailStyles } from "~/email/react-email/styles"

export const Footer = ({unsubscribeLink}: {unsubscribeLink?: string}) => {
  return(
    <>
      <Text style={emailStyles.paragraph}>— The Social team</Text>
      {unsubscribeLink && (
        <>
          <Hr style={emailStyles.hr} />
          <Text style={emailStyles.footer}>
            <Link href={unsubscribeLink} style={emailStyles.footer}>
              Unsubscribe
            </Link>
          </Text>
        </>
      )}
    </>
  )
}