import { Request, Response } from 'express';

import { successHandler } from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import ProductDTO from '../dto/product.dto';
import ProductService from '../service/product.service';
import Product from '../entity/product';
import Gender from 'src/enum/Gender';

export default class ProductController {

    private readonly productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    getProducts = async(req: Request, res: Response) => {
        try {
            const products: Product[] = await this.productService.getProducts();
            successHandler(res, 200, '상품 전채 불러오기 성공', products);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getProductsByGenderFiltering = async(req: Request, res: Response) => {
        try {
            const gender: Gender = Number(req.query.query);
            const products: Product[] = await this.productService.getProductsByGenderFiltering(gender);
            successHandler(res, 200, '성별 별 상품 불러오기 성공', products);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getProductsBySizeFiltering = async(req: Request, res: Response) => {
        try {
            const size: number = Number(req.query.query);
            const products: Product[] = await this.productService.getProductsBySizeFiltering(size);
            successHandler(res, 200, '사이즈 별 상품 불러오기 성공', products);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getProductsByBrandFiltering = async(req: Request, res: Response) => {
        try {
            const brand: string = String(req.query.query);
            const products: Product[] = await this.productService.getProductsByBrandFiltering(brand);
            successHandler(res, 200, '브랜드 별 상품 불러오기 성공', products);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getProductsByPriceAscendingOrder = async(req: Request, res: Response) => {
        try {
            const products: Product[] = await this.productService.getProductsByPriceAscendingOrder();
            successHandler(res, 200, '가격 오름차순 정렬 상품목록 불러오기 성공', products);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getProductsByPriceDescendingOrder = async(req: Request, res: Response) => {
        try {
            const products: Product[] = await this.productService.getProductsByPriceDescendingOrder();
            successHandler(res, 200, '가격 내림차순 정렬 상품목록 불러오기 성공', products);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getProductsByLatestOrder = async(req: Request, res: Response) => {
        try {
            const products: Product[] = await this.productService.getProductsByLatestOrder();
            successHandler(res, 200, '최신손 정렬 상품목록 불러오기 성공', products);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getProduct = async(req: Request, res: Response) => {
        try {
            // products_id
            const idx: number = Number(req.params.idx);
            const product: Product | undefined = await this.productService.getProduct(idx);
            successHandler(res, 200, '상품 불러오기 성공', product);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    create = async(req: Request, res: Response) => {
        try {
            const { body } = req;
            const productRequest: ProductDTO = new ProductDTO(body);

            await productRequest.validate();
            await this.productService.create(productRequest);
            
            successHandler(res, 200, '상품 등록 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    update = async(req: Request, res: Response) => {
        try {
            // review_id
            const idx: number = Number(req.params.idx);
            const { body } = req;

            const productRequest: ProductDTO = new ProductDTO(body);

            await productRequest.validate();
            await this.productService.update(idx, productRequest);

            successHandler(res, 200, '상품 수정 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            // post_id
            const idx: number = Number(req.query.idx);
           
            await this.productService.delete(idx);

            successHandler(res, 200, '상품 삭제 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}