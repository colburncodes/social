import { beforeEach, describe, vi, it, expect
} from "vitest"
import authenticateUser from "~/src/utils/auth-utils"
import login from "~/src/features/auth/mutations/login"
import * as authUtils from "~/src/utils/auth-utils"
import { ZodError } from "zod"

// MOCKING DEPENDENCIES TO AVOID ACTUAL TO DB OR AUTH SERVICE.
vi.mock("~/src/utils/auth-utils", () => ({
  default: vi.fn()
}))

beforeEach(async () => {
  vi.clearAllMocks() // cleanup fresh state
})

// MOCK SESSION
const mockCtx: any = {
  session: {
    $create: vi.fn(),
  },
}

// MOCK USER
const mockUser = {
  id: "12",
  email: 'user@email.com',
  password: "validPassword",
  name: null,
  role: "USER",
  bio: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  onBoarded: false,
  emailVerifiedAt: null,
  avatarImageKey: null,
  coverImageKey: null,
  username: null,
  hasLifeTimeAccess: true
}

describe("login mutation", () => {
  it("should successfully login and create user session with valid credentials.",
    async () => {
    expect(true).toBe(true)

    vi.mocked(authenticateUser).mockResolvedValue(mockUser)

    const result = await login({ email: mockUser.email, password: mockUser.password }, mockCtx)

    expect(result).toEqual(mockUser)
    expect(mockCtx.session.$create).toHaveBeenCalledWith({ userId: mockUser.id, role: mockUser.role })
  })

  it("should throw an error for invalid credentials",
    async () => {
    expect(true).toBe(true)

    vi.mocked(authUtils.default).mockRejectedValue(new Error("Invalid credentials"))

    await expect(login({ email: mockUser.email, password: "invalidPassword"}, mockCtx))
      .rejects
      .toThrow("Invalid credentials")

      expect(mockCtx.session.$create).not.toHaveBeenCalled()
  })

  it("should throw an error if required fields are missing",
    async () => {
      try {
        const result = await login({ email: "", password: "validPassword"}, mockCtx)
        expect.fail("Expected to throw validation error")
      } catch (err) {
        expect(err).toBeInstanceOf(ZodError)

        const validationErrors = err.errors
        const emailValidationError = validationErrors.find(e => e.path.includes('email'))

        expect(emailValidationError).toBeDefined()
        expect(emailValidationError?.message).toEqual("Invalid email")
      }
  })

})