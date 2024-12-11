import express from 'express'

import { getCard } from '../controllers/cards.js'
import catchAsync from '../utils/CatchAsync.js'

const router = express.Router()

router.get('/', catchAsync(getCard))

export default router