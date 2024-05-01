// @ts-ignore
import { Box, BoxProps, CSSObject } from "@mantine/core"
import { forwardRef, ReactNode } from "react"

type Props = { width?: number; gap?: number; children?: ReactNode } & Partial<BoxProps>

export const autoGrid = (
  minColumnWidth = 250,
    gridGap = 0,
    mode = 'fill',
    maxColumnWidth = '1fr'
): CSSObject => ({
  gridTemplateColumns: `repeat(auto-${mode}, minmax(${minColumnWidth}px, ${maxColumnWidth}))`,
  display: 'grid',
  gridGap: gridGap,
  padding: '26px',
  marginRight: '26px',
})

export const MagicGrid = forwardRef<HTMLDivElement, Props>((props, ref) => {
  // @ts-ignore
  const { children, width = 250, gap = 15, ...rest } = props;
  return (
    <>
        <Box ref={ref} style={{ ...autoGrid(width, gap)}} {...rest}>
          {children}
        </Box>
    </>
  )
})