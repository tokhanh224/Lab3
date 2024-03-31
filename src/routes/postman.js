import express from "express";
import { uploadFile } from '../models/products.js';
import { addProductPOSTMAN, deleteProductPOSTMAN, getAllProductPOSTMAN, getProductDetailPOSTMAN, updateProductPOSTMAN } from "../controllers/products.js";

const router_POSTMAN = express.Router();
router_POSTMAN.get('/product', getAllProductPOSTMAN);
router_POSTMAN.post('/product', uploadFile.single('pro_file'),  addProductPOSTMAN);
router_POSTMAN.put('/productUpdate/:id', updateProductPOSTMAN);

router_POSTMAN.delete('/product/:id', deleteProductPOSTMAN);
router_POSTMAN.get("/productdetail/:id", getProductDetailPOSTMAN);
export default router_POSTMAN