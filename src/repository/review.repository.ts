import { EntityRepository, Repository } from 'typeorm';
import Review from '../entity/review';

@EntityRepository(Review)
export default class ReviewRepository extends Repository<Review> {
    findByProductIdx = async (productIdx: number): Promise<Review[]> => {
        return this.createQueryBuilder('review')
            .where('product_id = :productIdx', { productIdx })
            .getMany();
    }
}