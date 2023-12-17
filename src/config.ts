export const isDev = process.env.NODE_ENV === "development"
const PROD_URL = "https://social.com"
const DEV_URL = "http://localhost:3000"
export const URL_ORIGIN = isDev ? DEV_URL : PROD_URL