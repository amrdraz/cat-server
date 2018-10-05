import { Router } from 'express'
import {
  findCatByTagRoute,
  findCatByTagAndIdRoute
} from "./cats"

const router = Router()

router.get('/:tag', findCatByTagRoute)

router.get('/:tag/:id', findCatByTagAndIdRoute)

export default router

