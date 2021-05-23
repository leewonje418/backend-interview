import { Router } from 'express';

import reviewRouter from './reviewRouter';
import productRouter from './productRouter';
import userRouter from './userRouter';

const router: Router = Router();

router.use('/review', reviewRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);

export default router;