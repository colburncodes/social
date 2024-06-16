// src/pages/api/auth/[...auth].page.ts
import { passportAuth } from "@blitzjs/auth"
import { api } from "src/blitz-server"
import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import {env} from "~/env.mjs";
import {URL_ORIGIN} from "~/src/config";


export default api(
    passportAuth({
        successRedirectUrl: "/",
        errorRedirectUrl: "/",
        strategies: [
            {
                strategy: new GitHubStrategy({
                    clientID: env.NEXT_PUBLIC_GITHUB_AUTH_CLIENT_ID,
                    clientSecret: env.NEXT_PUBLIC_GITHUB_AUTH_SECRET_KEY,
                    callbackURL: `${URL_ORIGIN}/api/auth/github/callback`,
                    scope: ["user:email"]
                },
                async (accessToken, refreshToken, profile: Profile, done: any) => {
                    const email = profile.emails && profile.emails?.[0].value;
                    if (!email) return done(new Error("Email not found in Github Account."));
                    console.log(email);
                }), // Provide initialized passport strategy here
            },
        ],
    })
)