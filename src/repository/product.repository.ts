import Gender from 'src/enum/Gender';
import { EntityRepository, Repository } from 'typeorm';
import Product from '../entity/product';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
    findByGender = async (gender: Gender): Promise<Product[]> => {
        return this.createQueryBuilder('product')
            .where('gender = :gender', { gender })
            .getMany();
    }

    findBySize = async (size: number): Promise<Product[]> => {
        return this.createQueryBuilder('product')
            .where('size = :size', { size })
            .getMany();
    }

    findByBrand = async (brand: string): Promise<Product[]> => {
        return this.createQueryBuilder('product')
            .where('brand = :brand', { brand })
            .getMany();
    }

    findByLatestOrder = async (): Promise<Product[]> => {
        return this.createQueryBuilder('product')
            .orderBy('idx', 'DESC')
            .getMany();
    }

    findByPriceDescendingOrder = async (): Promise<Product[]> => {
        return this.createQueryBuilder('product')
            .orderBy('price', 'DESC')
            .getMany();
    }

    findByPriceAscendingOrder = async (): Promise<Product[]> => {
        return this.createQueryBuilder('product')
            .orderBy('price', 'ASC')
            .getMany();
    }
}