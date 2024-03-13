import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "db"
import { env } from "~/src/env.mjs"
import { type NewCheckout, createCheckout } from "@lemonsqueezy/lemonsqueezy.js"
import { lemonClient } from "~/src/features/payments/lemonClient"

/**
 * Create a checkout and generate a checkout url link.
 *
 * @param storeId (Required) The given store id.
 * @param variantId (Required) The given variant id.
 * @param [checkout] (Optional) A new checkout info.
 * @returns A checkout url link.
 *
 * @see https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout
 */
export const Input = z.object({})

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    if (!user) throw new Error("User not found");
    if (!user.name) throw new Error("User name not found")

    try {
      const storeId = env.LEMONSQUEEZY_STORE_ID;
      const variantId = env.LEMONSQUEEZY_VARIANT_ID;

      const newCheckout: NewCheckout = {
        checkoutOptions: {
          embed: true,
          media: true,
          logo: true,
        },
        checkoutData: {
          email: user.email,
          name: user.name,
          custom: {
            user_id: user.id
          }
        },
        expiresAt: null,
        preview: true,
        testMode: true
      }

      console.log('lemonClient', lemonClient)
      const { error, data, statusCode } = await createCheckout(storeId, variantId, newCheckout)
      const url = data?.data.attributes.url;
      // @ts-ignore
      return url;
    } catch (err) {
      console.error(`Error generating checkout link:`, err)
      throw new Error(`Failed to generate checkout link.`, err)
    }
})