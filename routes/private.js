import express from 'express';
import protectRoute from '../middleware/auth.js'

const router = express.Router();

import { getPrivateData } from '../controllers/private.js'

router.get('/',protectRoute,getPrivateData);



export default router;