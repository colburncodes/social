

// ------------------------------------------------------
// This page is rendered if a route match is not found
// ------------------------------------------------------

import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import image from '../../public/image.svg';
import classes from './../styles/NotFoundImage.module.css';
import Link from "next/link"
import { Routes } from "@blitzjs/next"

export function NotFound404() {
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image.src} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Button component={Link} href={Routes.Home()} variant="outline" size="md" mt="xl" className={classes.control}>
            Get back to home page
          </Button>
        </div>
        <Image src={image.src} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}

export default function Page404() {
  return <NotFound404/>
}
