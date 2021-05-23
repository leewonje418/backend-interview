import { Router } from 'express';
import ProductController from '../../controller/product.controller';
import { authHost } from '../../lib/middleware/auth.middleware';

const router: Router = Router();

const productController: ProductController = new ProductController();

router.get('/getProducts', productController.getProducts);
router.get('/getProducts/latest', productController.getProductsByLatestOrder);
router.get('/getProducts/price/desc', productController.getProductsByPriceDescendingOrder);
router.get('/getProducts/price/asc', productController.getProductsByPriceAscendingOrder);
router.get('/getProducts/brand', productController.getProductsByBrandFiltering);
router.get('/getProducts/size', productController.getProductsBySizeFiltering);
router.get('/getProducts/gender', productController.getProductsByGenderFiltering);
router.get('/:idx', productController.getProduct);
router.post('/', authHost, productController.create);
router.put('/update/:idx', authHost, productController.update);
router.delete('/delete', authHost, productController.delete);

export default router;