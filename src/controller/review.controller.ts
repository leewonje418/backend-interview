import { Request, Response } from 'express';

import { successHandler } from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import ReviewDTO from '../dto/review.dto';
import ReviewService from '../service/review.service';
import Review from '../entity/review';
import { autDeletePermission, authUpdatePermission } from 'src/lib/checkPermission/checkReviewPermission';

export default class ReviewController {
    private readonly reviewService: ReviewService;

    constructor() {
        this.reviewService = new ReviewService();
    }

    getReviews = async(req: Request, res: Response) => {
        try {
            const reviews: Review[] = await this.reviewService.getReviews();
            successHandler(res, 200, '리뷰 전채 불러오기 성공', reviews);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getReviewsByProductIdx = async(req: Request, res: Response) => {
        try {
            // product_id
            const productIdx: number = Number(req.params.productIdx);
            const reviews: Review[] = await this.reviewService.getReviewsByProductIdx(productIdx);
            successHandler(res, 200, '상품 별 리뷰 불러오기 성공', reviews);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getReview = async(req: Request, res: Response) => {
        try {
            // review_id
            const idx: number = Number(req.params.idx);
            const review: Review | undefined = await this.reviewService.getReview(idx);
            successHandler(res, 200, '리뷰 불러오기 성공', review);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    create = async(req: Request, res: Response) => {
        try {
            const { body } = req;
            const { userId } = req;
            const reviewRequest: ReviewDTO = new ReviewDTO(body);

            await reviewRequest.validate();
            await this.reviewService.create(reviewRequest, userId);
            
            successHandler(res, 200, '리뷰 게시 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    update = async(req: Request, res: Response) => {
        try {
            // review_id
            const idx: number = Number(req.params.idx);

            const { userId } = req;
            const { body } = req;

            await authUpdatePermission(userId, body.userId);

            const reviewRequest: ReviewDTO = new ReviewDTO(body);

            await reviewRequest.validate();
            await this.reviewService.update(idx, reviewRequest, userId);

            successHandler(res, 200, '리뷰 수정 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            // post_id
            const idx: number = Number(req.query.idx);
            const { userId } = req;

            await autDeletePermission(userId, idx);            
            await this.reviewService.delete(idx);

            successHandler(res, 200, '리뷰 삭제 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}