import Products from "../models/products.js";
import Catalog from "../models/catalog.js";

export const Home = async (req, res) => {
  try {
      let products = await Products.find();
      let catalog = await Catalog.find();
      res.render('index', {  products: products , catalog:catalog});
  } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi khi lấy danh sách sản phẩm");
  }
};
export const ADMIN = async (req, res) => {
  let products = await Products.find();
  let catalog = await Catalog.find();
  console.log(products);
  res.render('admin', {  products: products , catalog:catalog});
};