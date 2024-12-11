import express from 'express'
import { register, login, getProfile, logout } from '../controllers/users.js'
import { isAuthenticated } from '../middlewares/middleware.js'
import catchAsync from '../utils/CatchAsync.js'

const router = express.Router()

router.post('/register', catchAsync(register))

router.post('/login', login);

router.post('/logout', logout)

router.get('/profile', isAuthenticated, getProfile);

export default router
