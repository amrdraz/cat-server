/**
 * converts image into buffer and send it usign express response object with correct mime type
 * @param image Base64DataString
 */
export function sendBase64Image(image, res) {
  const { mime, data } = getMimeAndDataFrom64BitImageData(image)
  const buffer = Buffer.from(data, 'base64')
  res.set('content-type', mime)
  res.send(buffer);
}

/**
 * get seperate mime type data from an image base64 data uri
 * @param image Base64DataString
 */
export function getMimeAndDataFrom64BitImageData(image) {
  var reg = /^data:(image\/[\w+]+);base64,([\s\S]+)/;
  var [_, mime, data] = image.match(reg);
  return { mime, data }
}