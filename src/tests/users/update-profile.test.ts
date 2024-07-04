import { describe, test, expect } from 'vitest';
import db from "~/db"

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
                    email: true,
                    role: true,
                    avatarImageKey: true
                }
            })

            if (!firstUser) throw new Error('User not found!');

            const updateData = {
                bio: "Updated bio",
                avatarImageKey: "updated_avatar_key",
            }

            // Act: Update user's profile
            await db.user.update({
                where: { id: firstUser.id },
                data: updateData
            })

            // Assert: Fetch the update user and verify the changes.
            const updatedUser = await db.user.findUnique({
                where: { id: firstUser.id },
                select: {
                    id: true,
                    name: true,
                    username: true,
                    bio: true,
                    email: true,
                    role: true,
                    avatarImageKey: true,
                }
            });

            if (!updatedUser) throw new Error('Updated user not found!');

            expect(updatedUser).toMatchObject({
                id: firstUser.id,
                name: firstUser.name, // Assuming the name wasn't updated
                username: firstUser.username,
                bio: "Updated bio",
                email: firstUser.email,
                role: firstUser.role,
                avatarImageKey: "updated_avatar_key"})
        })
})