import { Menu } from "@mantine/core"
import NextLink from 'next/link'
import classes from '~/src/styles/MenuItem.module.css';

let ITEM_FONT_SIZE = 14;
let ICON_SIZE = 16;
export const MenuItemLink = ({ Icon, href, ...rest}) => {
  return (

    <Menu.Item
      className={classes.itemFont}
      component={NextLink}
      href={href}
      leftSection={<Icon size={ICON_SIZE} stroke={1.5}/>}
      {...rest}
    />
  )
}