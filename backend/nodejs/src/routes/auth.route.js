import express from 'express'
import { login, logout, register, me } from '../controllers/auth.controller.js';

const route = express.Router();

route.post('/login', login);
route.post('/register', register)
route.post('/logout', logout)
route.get('/me', me)
export default route