import { Hr, Img } from "@react-email/components"
import * as React from "react"
import { emailStyles } from "~/email/react-email/styles"


const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const Header = () => {

  return(
    <>
      <Img
        src={`${baseUrl}/images/logo.png`}
        width={49}
        height={21}
        alt={"logo"}
      />
      <Hr style={emailStyles.hr} />
    </>
  )
}
