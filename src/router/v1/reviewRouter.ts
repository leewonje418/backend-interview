import { Router } from 'express';
import ReviewController from '../../controller/review.controller';
import { authUser } from '../../lib/middleware/auth.middleware';

const router: Router = Router();

const reviewController: ReviewController = new ReviewController();

router.get('/getReviews', reviewController.getReviews);
router.get('/getReviews/:productIdx', reviewController.getReviewsByProductIdx);
router.get('/:idx', reviewController.getReview);
router.post('/', authUser, reviewController.create);
router.put('/update/:idx', authUser, reviewController.update);
router.delete('/delete', authUser, reviewController.delete);

export default router;