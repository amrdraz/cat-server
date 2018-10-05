import { findCatsByTag, findCatByTagAndId } from "../../service/cats"
import { sendBase64Image } from "../../utils"

/**
 * return an object with a cey cats which is an array of urls to cat images or a base64 data url with the image embedded
 * use query base64 to toggle embeding the images default to false
 * user query size to load a different amount of images, default to 5
 * @param req params { tag: string } query { base64: boolean - false, size: number = 5 }
 * @param res respond with { cats: string[] } where the string is either an api url or a base64 image data
 */
export async function findCatByTagRoute(req, res) {
  const cats = await findCatsByTag({...req.params, ...req.query})
  res.status(200).send({ cats })
}

/**
 * get image by tag and id from cache or service
 * @param req params { tag: string, id: string }
 * @param res file with content-type image/*
 */
export async function findCatByTagAndIdRoute(req, res) {
  const cat = await findCatByTagAndId({...req.params})
  sendBase64Image(cat, res)
}

