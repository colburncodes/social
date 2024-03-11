import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"
import { Prisma } from "@prisma/client"
import { isMacOS } from "std-env"
import { isSafari } from "@floating-ui/utils/react"


export const useStringParam = (name: string) => useParam(name, "string")

export const useStringQueryParam = (name: string) => {
  let { query } = useRouter();
  return query[name];
}

export const thisYear = new Date().getFullYear()

export const getUploadThingUrl = (fileKey?: string | null) => {
  return fileKey ? `https://uploadthing.com/f/${fileKey}` : ""
}

export const getAvatarFallbackName = (name?: string | null) => {
  if (!name) return '';
  const [first, second] = name.split(" ");
  return `${first ? first[0] : ""}${second ? second[0] : ""}`;
}

export const storePrismaJson = (json) => {
  return JSON.parse(JSON.stringify(json)) as Prisma.JsonObject;
};

// @ts-ignore
export const openUrlInNewTab = async (url: any) => {
  if (url) {
    if (isMacOS || isSafari()) {
      window.location.assign(url)
    } else {
      window.open(url, "_blank")
    }
  }
}


