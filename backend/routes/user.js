import express from 'express';
const router = express.Router();

import {login, register, logout} from '../controllers/user.js';

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').post(logout);


export default router;