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

// Format Blog Date in ContentLayer
export function formatDate(dateString) {
  const date = new Date(dateString);

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Function to add suffix to date
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }

  const suffix = getOrdinalSuffix(day);
  return `${month} ${day}${suffix}, ${year}`;
}


