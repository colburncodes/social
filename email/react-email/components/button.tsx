import { Button } from "@react-email/components"
import { emailStyles } from "~/email/react-email/styles"
import * as React from "react"


export const MainButton = (props: any) => {
  return(
    <>
      <Button style={emailStyles.button} {...props} />
    </>
  )
}