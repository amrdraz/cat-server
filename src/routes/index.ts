import { Router } from 'express'
import cats from "./cats"
import {RoutRoute} from "./routes"
import { CAT_API_PATH } from "../config"

const router = Router()

router.get('/', RoutRoute)
router.use(CAT_API_PATH, cats)

export default router