import { ButtonProps, createTheme } from "@mantine/core"

const ButtonDefaultProps: Partial<ButtonProps> = {
  size: "md",
  variant: "light"
}
export const theme = createTheme ({
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