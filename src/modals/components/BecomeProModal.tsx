import { Button, Group, Text } from "@mantine/core"
import { ContextModalProps } from "@mantine/modals"
import { useMutation } from "@blitzjs/rpc"
import generateCheckoutLink from "~/src/features/payments/mutations/generateCheckoutLink"
import { openUrlInNewTab } from "~/src/utils/utils"
import { useCurrentUser } from "~/src/features/users/hooks/useCurrentUser"

type InnerProps = {
  price: number;
};

export const BecomeProModal: React.FC<ContextModalProps<InnerProps>> = ({ context, id, innerProps }) => {
  const { price } = innerProps
  const user = useCurrentUser()
  const handleCloseModal = () => context.closeModal(id)
  const [$generateCheckoutLink, { isLoading }] = useMutation(generateCheckoutLink, {})

  const onPurchaseClick = async () => {
    const checkoutUrl = await $generateCheckoutLink({})
    await openUrlInNewTab(checkoutUrl)
  }

  return (
    <Group gap={"xs"}>
      {!user?.hasLifeTimeAccess && <>

        <Group>You can purchase pro plan for ${price}</Group>
        <Group justify="space-between">
          <Button color="gray" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            loading={isLoading}
            onClick={onPurchaseClick}
          >
            Purchase
          </Button>
        </Group>
      </>}
      {user?.hasLifeTimeAccess && <Group>
        <Text>Thank you for being a customer!</Text>
      </Group>}
    </Group>
  )
}