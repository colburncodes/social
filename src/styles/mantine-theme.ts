import { ButtonProps, createTheme, rem } from "@mantine/core"

export interface CustomHeadingStyle {
  fontSize: string;
  lineHeight: string;
  fontWeight?: string
}
// subject to change
const h1: CustomHeadingStyle = { fontSize: rem(48), lineHeight: '52px', fontWeight: "bolder"}
const h2: CustomHeadingStyle = { fontSize: rem(36), lineHeight: '40px'}
const h3: CustomHeadingStyle = { fontSize: rem(24), lineHeight: '30px'}
const h4: CustomHeadingStyle = { fontSize: rem(18), lineHeight: '20px', fontWeight: "bold"}
const h5: CustomHeadingStyle = { fontSize: rem(14), lineHeight: '18px'}
const h6: CustomHeadingStyle = { fontSize: rem(12), lineHeight: '16px'}

const ButtonDefaultProps: Partial<ButtonProps> = {
  size: "md",
  variant: "light"
}
export const theme = createTheme ({
  fontFamily: "Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif",
  cursorType: "pointer",
  primaryColor: "violet",
  headings: {
    fontFamily: "Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif",
    fontWeight: "500",
    sizes: {
      h1: { fontSize: h1.fontSize, lineHeight: h1.lineHeight, fontWeight: h1.fontWeight },
      h2: h2,
      h3: h3,
      h4: h4,
      h5: h5,
      h6: h6
    }
  },
  components: {
    Button: {
      defaultProps: ButtonDefaultProps
    }
  },
  other: {
    loader: "bars",
    fontWeights: {
      bold: 700,
      extraBold: 900,
      light: 300,
    }
  }
})