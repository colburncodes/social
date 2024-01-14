import { Button, Group, Stack } from "@mantine/core"
import { ContextModalProps } from "@mantine/modals"

type InnerProps = {
  price: number;
};

export const BecomeProModal: React.FC<ContextModalProps<InnerProps>> = ({ context, id, innerProps }) => {
  const { price } = innerProps

  const handleCloseModal = () => context.closeModal(id)

  return (
    <Group gap={"xs"}>
      <Group>You can purchase pro plan for ${price}</Group>
      <Group justify="space-between">
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