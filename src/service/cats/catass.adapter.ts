import * as request from "request"
import * as streamToBuffer from "stream-to-buffer"
import { Base64DataString } from "./index"

const API_BASE_URL = `https://cataas.com/cat`

/**
 * load from cataas API a cat by tag returning a bit64 encoding of the image
 * @param tag [string]
 */
export function fetchBase64Data(tag: string) : Promise<Base64DataString>{
  return new Promise<Base64DataString>((resolve, reject) => {
    const stream = request.get(`${API_BASE_URL}/${tag}`).on('response', (res)=> {
      const mime = res.headers["content-type"]
      streamToBuffer(stream, (err, buffer)=> {
        if (err) return reject(err)
        resolve(`data:${mime};base64,${buffer.toString('base64')}`)
      })
    })
  })
}