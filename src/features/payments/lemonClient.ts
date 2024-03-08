import { env } from "~/src/env.mjs"
import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

export const lemonClient = lemonSqueezySetup({
  apiKey: env.LEMONSQUEEZY_API_KEY,
  onError(error) {
    console.log(error);
  },
});


