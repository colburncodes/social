import db from "~/db"
import { storePrismaJson } from "~/src/utils/utils"


/**
 * Function handles the processing of a refunded order.
 * @param {Object} event - event information.
 * @param {Object} event.data - data about the refunded order.
 * @param {Object} event.data.attributes - order details with order number.
 */
export const onOrderRefunded = async ({ event }) => {
  const order = await db.lemonSqueezyOrder.findFirst({
    where: { orderId: event.data.attributes.order_number.toString() }
  })

  if (!order) {
    throw new Error("Order not found!")
  }

  const updateOrder = db.lemonSqueezyOrder.update({
    where: {
      id: order.id
    },
    data: {
      refunded: true,
      attributes: storePrismaJson(event.data.attributes)
    }
  })

  const updateUser = db.user.update({
    where: {
      id: order.userId
    },
    data: {
      hasLifeTimeAccess: false
    }
  })

  return db.$transaction([updateOrder, updateUser])
}