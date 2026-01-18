import express from 'express'
import { login, register } from '../controllers/auth.controller.js';

const route = express.Router();

route.post('/login', login);
route.post('/register', register)

export default route