import express from 'express'

import { getCard, getAllCards } from '../controllers/cards.js'
import catchAsync from '../utils/CatchAsync.js'

const router = express.Router()

router.get('/', catchAsync(getCard))

router.get('/all', catchAsync(getAllCards))

export default router