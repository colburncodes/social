import { ButtonProps, createTheme } from "@mantine/core"

const ButtonDefaultProps: Partial<ButtonProps> = {
  size: "md",
  variant: "light"
}
export const theme = createTheme ({
  fontFamily: "Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif",
  cursorType: "pointer",
  primaryColor: "violet",
  components: {
    Button: {
      defaultProps: ButtonDefaultProps
    }
  },
  other: {
    loader: "bars"
  }
})