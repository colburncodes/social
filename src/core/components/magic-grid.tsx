import { Box, BoxProps, CSSObject } from "@mantine/core"
import { forwardRef } from "react"

type Props = { width?: number; gap?: number } & Partial<BoxProps>

export const autoGrid = (
  minColumnWidth = 250,
    gridGap = 0,
    mode = 'fill',
    maxColumnWidth = '1fr'
): CSSObject => ({
  gridTemplateColumns: `repeat(auto-${mode}, minmax(${minColumnWidth}px, ${maxColumnWidth}))`,
  display: 'grid',
  gridGap: gridGap,
})

export const MagicGrid = forwardRef<HTMLDivElement, Props>((props, ref) => {
  // @ts-ignore
  const { children, width = 250, gap = 15, ...rest } = props;
  return (

    <Box ref={ref} style={{ ...autoGrid(width, gap), width: "100%"}} {...rest}>
      {children}
</Box>
  )
})