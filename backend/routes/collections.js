import express from 'express'

import { isAuthenticated, isCollectionUser } from '../middlewares/middleware.js'
import { getCollection, toggleCardInCollection } from '../controllers/collections.js'
import catchAsync from '../utils/CatchAsync.js';

const router = express.Router();

router.route('/:id')
    .get(isAuthenticated, isCollectionUser, catchAsync(getCollection))
    .post(isAuthenticated, isCollectionUser, catchAsync(toggleCardInCollection))


export default router