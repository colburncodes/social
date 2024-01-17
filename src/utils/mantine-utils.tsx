import { modals } from "@mantine/modals"
import React from "react"
import { Text } from "@mantine/core"

type Options = {
  onCancel?: () => void;
  text?: string;
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const confirmDelete = (cb, options: Options = {}) => {
  const {
    onCancel,
    text = "Are you sure you want to delete this? This action might be irreversible.",
    title = "Confirm deletion",
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
  } = options;
  return modals.openConfirmModal({
    title,
    centered: true,
    children: <Text size="sm">{text}</Text>,
    labels: { confirm: confirmLabel, cancel: cancelLabel },
    confirmProps: { color: "red" },
    onCancel,
    onConfirm: () => {
      cb?.();
    },
  });
};