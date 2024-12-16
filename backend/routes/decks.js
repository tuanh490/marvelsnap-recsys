import express from 'express'

import { isAuthenticated, isDeckUser, doesObjectExist } from '../middlewares/middleware.js'
import { getAllDecks, getDeck, createDeck, updateDeck, deleteDeck } from '../controllers/decks.js'
import catchAsync from '../utils/CatchAsync.js';

const router = express.Router();

router.route('/')
    .get(isAuthenticated, catchAsync(getAllDecks))
    .post(isAuthenticated, catchAsync(createDeck))

router.route('/:id')
    .get(isAuthenticated, doesObjectExist('deck'), isDeckUser, catchAsync(getDeck))
    .put(isAuthenticated, doesObjectExist('deck'), isDeckUser, catchAsync(updateDeck))
    .delete(isAuthenticated, doesObjectExist('deck'), isDeckUser, catchAsync(deleteDeck))


export default router