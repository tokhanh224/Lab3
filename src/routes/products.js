import express from "express";
import { uploadFile } from '../models/products.js';
import { addProduct,  deleteProduct, getAllProduct, getProductDetail, listProduct,  updateProductGet , updateProductPost } from '../controllers/products.js';
import { getCatalog } from "../controllers/catalog.js";
// import {Home} from '../controllers/index.js';
const router = express.Router();

// Trang danh sách sản phẩm
router.get('/list-products', getAllProduct);

// Trang thêm sản phẩm - POST
router.get('/add-product', (req, res) => {
    res.render('add-product');
});
// Route Post
router.post('/add-product', uploadFile.single('pro_file'),  addProduct);
// Trang chi tiết sản phẩm
router.get("/product-detail/:id", getProductDetail);
router.post('/delete-product/:id', deleteProduct);
// Trang chỉnh sửa sản phẩm 
router.post('/update-product/:id', uploadFile.single('pro_file'), updateProductPost);

router.get('/update-product/:id', updateProductGet);
router.get('/list-products', listProduct,getCatalog);



export default router;