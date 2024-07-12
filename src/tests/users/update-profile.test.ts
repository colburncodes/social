import { describe, test, expect, vi } from 'vitest';
import db from "~/db"

// Mock Blitz.js authorize function
vi.mock('@blitzjs/auth', () => {
    return {
        resolver: {
            authorize: vi.fn(() => true) // Mock the authorize function to always return true
        },
        AuthServerPlugin: vi.fn(), // Mock AuthServerPlugin if necessary
    };
});

vi.mock('~/src/features/users/queries/updateProfile', () => {
    return {
        updateProfile: vi.fn((input, Ctx) => ({
            id: 'mocked_id',
            name: input.name,
            username: input.username || '',
            bio: input.bio || '',
            avatarImageKey: input.avatarImageKey || '',
        }))
    }
});

describe('updateProfile', () => {
    test('should update profile',
        async () => {
        // Arrange: Find existing user in the database
            const firstUser = await db.user.findFirst({
                where: { username: "yam_sushi" },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    bio: true,
                    avatarImageKey: true
                }
            })

            if (!firstUser) throw new Error('User not found!');

            const input = {
                name: firstUser.name || "",
                username: firstUser.username || "",
                bio: "Updated bio",
                avatarImageKey: "updated_avatar_key",
            };


            // Act: Update user's profile
            await db.user.update({
                where: { id: firstUser.id },
                data: input
            })

            // Assert: Fetch the update user and verify the changes.
            const updatedUser = await db.user.findUnique({
                where: { id: firstUser.id },
                select: {
                    id: true,
                    bio: true,
                    avatarImageKey: true,
                }
            });

            if (!updatedUser) throw new Error('Updated user not found!');

            expect(updatedUser).toMatchObject({
                id: firstUser.id,
                bio: "Updated bio",
                avatarImageKey: "updated_avatar_key"})
        })
})