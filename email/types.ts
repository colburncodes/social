import { ReactElement } from "react"

export type Email = {
  subject: string;
  to: string;
  react: ReactElement;
  text: string;
}