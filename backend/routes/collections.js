import express from 'express'

import { isAuthenticated, isUser } from '../middlewares/middleware.js'
import { getCollection, toggleCardInCollection } from '../controllers/collections.js'
import catchAsync from '../utils/CatchAsync.js';

const router = express.Router();

router.route('/:id')
    .get(isAuthenticated, isUser, catchAsync(getCollection))
    .post(isAuthenticated, isUser, catchAsync(toggleCardInCollection))


export default router