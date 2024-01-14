import { Button, Group, Modal, Stack } from "@mantine/core"
import { ContextModalProps } from "@mantine/modals"
import { useState } from "react"

type InnerProps = {
  price: number;
};

export const BecomeProModal: React.FC<ContextModalProps<InnerProps>> = ({ context, id, innerProps }) => {
  const { price } = innerProps

  const handleCloseModal = () => context.closeModal(id)
  const [open, setOpen] = useState(false)

  return (
    <Group gap={"xs"}>
      <div>{id}</div>
      <Group>You can purchase pro plan for ${price}</Group>
      <Group justify="space-between">
        <Button onClick={() => {
          setOpen(true)
        }}>Tell me more</Button>
        <Modal zIndex={210} opened={open} onClose={() => {
          setOpen(false)
        }}>
          More information about the pro plan
        </Modal>
        <Button color="gray" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log("submit")
          }}
        >
          Submit
        </Button>
      </Group>
    </Group>
  )
}