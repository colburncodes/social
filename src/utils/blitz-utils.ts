import { generateErrorMessage } from "zod-error";
import { generateToken, hash256 } from "@blitzjs/auth";
import db from "~/db";
import { TokenType } from "@prisma/client";
import { addHours } from "date-fns";

export class PrismaError extends Error {
  code = "123";
  meta = {};

  constructor(message, code, meta) {
    super(message);
    this.message = message;
    this.code = code;
    this.meta = meta;
  }
}

export const errorFormatter = (err: any) => {

  const message = err?.message || err?.toString();

  if (err.code === "P2002") {
    const target = err?.meta?.target?.[0];
    return new Error(`The ${target} is already taken`);
  }

  const messageIncludesPrisma = message.match(/prisma/i);

  if (messageIncludesPrisma) {
    return new Error("An error occurred while accessing the database.");
  }

  if (err.issues) {
    //format zod errors
    const errorMessage = formatZodError(err);
    return new Error(errorMessage);
  }

  return new Error(message);
};

export const formatZodError = (err: any) => {
  return generateErrorMessage(err.issues, {
    delimiter: {
      error: " ",
      component: " ",
    },
    path: {
      enabled: true,
      type: "objectNotation",
      transform: ({ value }) => `${value}:`,
    },
    message: {
      enabled: true,
      transform: ({ value }) => `${value}`,
    },
    code: {
      enabled: false,
    },
  });
};

const EMAIL_VERIFY_LINK_IN_HOURS = 4;

const createToken = async ({ userId, userEmail, tokenType }) => {
  const token = generateToken();
  const hashedToken = hash256(token);
  const expiresAt = addHours(new Date(), EMAIL_VERIFY_LINK_IN_HOURS);

  await db.token.create({
    data: {
      user: { connect: { id: userId } },
      type: tokenType,
      expiresAt,
      hashedToken,
      sentTo: userEmail,
    },
  });

  return token;
};
export const regenerateToken = async ({
                                        userId,
                                        userEmail,
                                        tokenType,
                                      }: {
  userId: string;
  userEmail: string;
  tokenType: TokenType;
}): Promise<string> => {
  await db.token.deleteMany({
    where: { type: tokenType, userId },
  });

  const token = await createToken({
    userId,
    userEmail,
    tokenType,
  });

  return token;
};
