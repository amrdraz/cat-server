import { CAT_API_PATH } from "../config"
/**
 * 
 * @param res respond with 200 to indicate the serever is working
 */
export function RoutRoute (_, res) {
  res.status(200).send(`visit ${CAT_API_PATH}/cute or ${CAT_API_PATH}/cute/0`)
}