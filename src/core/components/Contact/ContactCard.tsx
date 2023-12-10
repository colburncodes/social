import { Paper, Text } from '@mantine/core';
import { ContactIconsList } from './ContactIcons';
import classes from '~/src/styles/GetInTouch.module.css';
import { ContactForm } from "~/src/features/contact/forms/ContactForm"

export function ContactCard({form, onSubmit}) {

  return (
    <Paper className={classes.container} shadow="md" radius="lg">
      <div className={classes.wrapper}>
        <div className={classes.contacts} style={{ backgroundColor: "black" }}>
          <Text fz="lg" fw={700} className={classes.title} c="#fff">
            Contact information
          </Text>

          <ContactIconsList />
        </div>

        <ContactForm form={form} onSubmit={onSubmit}/>
      </div>
    </Paper>
  );
}