import { regenerateToken } from "~/src/utils/blitz-utils"
import { TokenType } from "@prisma/client"
import { URL_ORIGIN } from "~/src/config"

export const generateUnsubscribeLink = async ({ userId, userEmail }) => {
  const token = await regenerateToken({
    tokenType: TokenType.UNSUBSCRIBE_EMAIL,
    userId: userId,
    userEmail: userEmail,
    expiryHours: 24,
    deleteExisting: false
  })

  let unsubscribeLink = `${URL_ORIGIN}/unsubscribe?token=${token}`;

  return unsubscribeLink;
}