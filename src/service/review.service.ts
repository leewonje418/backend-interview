import Review from '../entity/review';
import ReviewDTO from '../dto/review.dto';
import ReviewRepository from '../repository/review.repository';
import { getCustomRepository } from 'typeorm';

export default class ReviewService {
    getReviews = async (): Promise<Review[]> => {
        const reviewRepository: ReviewRepository = getCustomRepository(ReviewRepository);
        const reviews: Review[] = await reviewRepository.find();
        return reviews;
    }

    getReviewsByProductIdx = async (productIdx: number): Promise<Review[]> => {
        const reviewRepository: ReviewRepository = getCustomRepository(ReviewRepository);
        const reviews: Review[] = await reviewRepository.findByProductIdx(productIdx);
        return reviews;
    }

    getReview = async (idx: number): Promise<Review | undefined> => {
        const reviewRepository: ReviewRepository = getCustomRepository(ReviewRepository);
        const review: Review | undefined = await reviewRepository.findOne(idx);
        
        return review;
    }

    create = async (reviewRequest: ReviewDTO, userId: string): Promise<Review> => {
        const reviewRepository: ReviewRepository = getCustomRepository(ReviewRepository);
        const { content, productIdx  } = reviewRequest;

        const review: Review = new Review();
        review.content = content;
        review.userId = userId;
        review.productIdx = productIdx;

        const newReview: Review = await reviewRepository.save(review);

        
        return newReview;
    }

    update = async (idx: number, reviewRequest: ReviewDTO, userId: string): Promise<Review> => {
        const reviewRepository: ReviewRepository = getCustomRepository(ReviewRepository);
        const { content, productIdx  } = reviewRequest;

        const review: Review = new Review();
        review.idx = idx;
        review.content = content;
        review.userId = userId;
        review.productIdx = productIdx;

        const updateReview: Review = await reviewRepository.save(review);
        
        return updateReview;
    }

    delete = async (idx: number) => {
        const reviewRepository: ReviewRepository = getCustomRepository(ReviewRepository);
        await reviewRepository.delete(idx);
    }
}