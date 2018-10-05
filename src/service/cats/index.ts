import { fetchBase64Data } from "./catass.adapter"
import Cache from "../cache"
import { CAT_API_PATH, HOST, CASH_BASE_DIR, CASH_DURATION } from "../../config"

export type Base64DataString = string
export type CatImageUrl = string

export interface findCatsByTagArgs {
  tag: string
  size?: number
  base64?: boolean
}
export interface findCatByTagAndIdArgs {
  tag: string
  id: number
  base64?: boolean
}

export const catCache = new Cache<Base64DataString>({ base: CASH_BASE_DIR, name: 'cats', duration: CASH_DURATION })

/**
 * return an array of either API urls to cat images or an embeded base64 encoding of the images, caches images loaded for given tag and size
 * @param { tag: string, size?: 5, base64?: false }
 */
export async function findCatsByTag({ tag, size = 5, base64 = false } : findCatsByTagArgs) : Promise<CatImageUrl[] | Base64DataString[]>  {
  return Promise.all(
    Array.from(new Array(size)).map(
      (_, id) => base64
        ? findCatByTagAndId({ tag, id })
        : getCatUrl({ tag, id }))
      )
}

/**
 * return a url that uses this API to response with an image
 * preemtivly try to load the image (but don't wait) in order to pre cache it
 * @param { tag: string, id: string, preload: true }
 */
export function getCatUrl({ tag, id, preload = true }) : CatImageUrl {
  preload && findCatByTagAndId({ tag, id })
  return `${HOST}${CAT_API_PATH}/${tag}/${id}`
}

/**
 * using tag and id as key chek cache and if miss load an image from the imported adapter and cache it
 * @param { tag: string, id: string }
 * @returns a bit64 data string representing the image
 */
export async function findCatByTagAndId({ tag, id }: findCatByTagAndIdArgs) : Promise<Base64DataString> {
  let key = `${tag}-${id}`
  let cat = await catCache.get(key)
  if (!cat) {
    cat = await fetchBase64Data(tag)
    await catCache.set(key, cat)
  }
  return cat
}