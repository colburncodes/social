// src/pages/api/auth/[...auth].page.ts
import { passportAuth } from "@blitzjs/auth"
import { api } from "src/blitz-server"
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import {URL_ORIGIN} from "~/src/config";
import db from "~/db";


const getEnvVariable = (devVar: string, stagingVar: string) => {
    return process.env[devVar] || process.env[stagingVar];
}

export default api(
    passportAuth({
        successRedirectUrl: "/",
        errorRedirectUrl: "/",
        strategies: [
            {
                strategy: new GitHubStrategy({
                    clientID: getEnvVariable('NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID', `NEXT_PUBLIC_GITHUB_STAGING_CLIENT_ID`),
                    clientSecret: getEnvVariable('NEXT_PUBLIC_GITHUB_AUTH_SECRET_KEY', 'NEXT_PUBLIC_GITHUB_STAGING_SECRETY_KEY'),
                    callbackURL: `${URL_ORIGIN}/api/auth/github/callback`,
                    scope: ["user:email"]
                }, // Provide initialized passport strategy here
                async (accessToken, refreshToken, profile: Profile, done: any) => {
                    const email = profile.emails?.[0].value;
                    if (!email) return done(new Error("Email not found in Github Account."));

                    // TODO: create function to find & connect user with GithubID

                    const user = await db.user.upsert({
                        where: { email },
                        create: {
                            email,
                            name: profile.displayName,
                            githubUserProfileId: profile.id
                        },
                        update: { email },
                    })

                    const publicData = {
                        userId: user.id,
                        roles: [user.role],
                        source: "Github",
                    }
                    done(undefined, { publicData, redirectUrl: '/edit-profile'  })
                }),
            },
        ],
    })
)
