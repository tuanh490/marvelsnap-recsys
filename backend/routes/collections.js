import express from 'express'

import { isAuthenticated, isCollectionUser, doesObjectExist } from '../middlewares/middleware.js'
import { getCollection, toggleCardInCollection } from '../controllers/collections.js'
import catchAsync from '../utils/CatchAsync.js';

const router = express.Router();

router.route('/')
    .get(isAuthenticated, catchAsync(getCollection))

router.route('/:id')
    .post(isAuthenticated, doesObjectExist('collection'), isCollectionUser, catchAsync(toggleCardInCollection))


export default router