import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"


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


