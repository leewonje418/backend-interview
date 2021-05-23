import HttpError from 'src/error/httpError';
import Review from 'src/entity/review';
import ReviewService from 'src/service/review.service';

export const authUpdatePermission = async (userId: string, reviewerId: string) => {
    if (userId !== reviewerId) {
        throw new HttpError(403, '권한 없음');
    }
}

export const autDeletePermission = async (userId: string, idx: number) => {
    const reviewService: ReviewService = new ReviewService();
    const review: Review = await reviewService.getReview(idx);

    if (userId !== review.userId) {
        throw new HttpError(403, '권한 없음');
    }
}