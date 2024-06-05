export const PROD_URL = "https://socialio.site";
export const STAGING_URL = "https://staging.socialio.site";
export const DEV_URL = "http://localhost:3000";

export const railwayEnvironment = process.env.RAILWAY_ENVIRONMENT;

export const isDev = process.env.NODE_ENV === "development";
export const isStaging = railwayEnvironment?.toLowerCase() === "staging";
export const isProduction = railwayEnvironment?.toLowerCase() === "production";


export const URL_ORIGIN = isStaging ? STAGING_URL : isProduction ? PROD_URL : DEV_URL;

export const APP_NAME = "social";
