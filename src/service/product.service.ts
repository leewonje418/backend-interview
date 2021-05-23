import Product from '../entity/product';
import ProductDTO from '../dto/product.dto';
import ProductRepository from '../repository/product.repository';
import { getCustomRepository } from 'typeorm';
import Gender from 'src/enum/Gender';

export default class ProductService {
    getProducts = async (): Promise<Product[]> => {
        const productRepository: ProductRepository = getCustomRepository(ProductRepository);
        const products: Product[] = await productRepository.find();
        return products;
    }

    getProductsByGenderFiltering = async (gender: Gender): Promise<Product[]> => {
        const productRepository: ProductRepository = getCustomRepository(ProductRepository);
        const products: Product[] = await productRepository.findByGender(gender);
        return products;
    }

    getProductsBySizeFiltering = async (size: number): Promise<Product[]> => {
        const productRepository: ProductRepository = getCustomRepository(ProductRepository);
        const products: Product[] = await productRepository.findBySize(size);
        return products;
    }

    getProductsByBrandFiltering = async (brand: string): Promise<Product[]> => {
        const productRepository: ProductRepository = getCustomRepository(ProductRepository);
        const products: Product[] = await productRepository.findByBrand(brand);
        return products;
    }

    getProductsByLatestOrder = async (): Promise<Product[]> => {
        const productRepository: ProductRepository = getCustomRepository(ProductRepository);
        const products: Product[] = await productRepository.findByLatestOrder();
        return products;
    }

    getProductsByPriceDescendingOrder = async (): Promise<Product[]> => {
        const productRepository: ProductRepository = getCustomRepository(ProductRepository);
        const products: Product[] = await productRepository.findByPriceDescendingOrder();
        return products;
    }

    getProductsByPriceAscendingOrder = async (): Promise<Product[]> => {
        const productRepository: ProductRepository = getCustomRepository(ProductRepository);
        const products: Product[] = await productRepository.findByPriceAscendingOrder();
        return products;
    }

    getProduct = async (id: number): Promise<Product | undefined> => {
        const productRepository: ProductRepository = getCustomRepository(ProductRepository);
        const product: Product | undefined = await productRepository.findOne(id);
        
        return product;
    }

    create = async (productRequest: ProductDTO): Promise<Product> => {
        const productRepository: ProductRepository = getCustomRepository(ProductRepository);
        const { brand, color, description, gender, name, price, size  } = productRequest;

        const product: Product = new Product();
        product.brand = brand;
        product.color = color;
        product.description = description;
        product.gender = gender;
        product.name = name;
        product.price = price;
        product.size = size;

        const newProduct: Product = await productRepository.save(product);
        
        return newProduct;
    }

    update = async (id: number, productRequest: ProductDTO): Promise<Product> => {
        const productRepository: ProductRepository = getCustomRepository(ProductRepository);
        const { brand, color, description, gender, name, price, size  } = productRequest;

        const product: Product = new Product();
        product.idx = id;
        product.brand = brand;
        product.color = color;
        product.description = description;
        product.gender = gender;
        product.name = name;
        product.price = price;
        product.size = size;

        const updateproduct: Product = await productRepository.save(product);
        
        return updateproduct;
    }

    delete = async (id: number) => {
        const productRepository: ProductRepository = getCustomRepository(ProductRepository);
        await productRepository.delete(id);
    }
}