import { BecomeProModal } from "~/src/modals/components/BecomeProModal"

export enum GlobalModal {
  becomePro = "becomePro"
}

export const globalModals = {
  [GlobalModal.becomePro]: BecomeProModal
}

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof globalModals
  }
}