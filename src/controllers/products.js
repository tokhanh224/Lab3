import Catalog from "../models/catalog.js";
import Products from "../models/products.js";
import { ProductValidate } from "../validations/product.js";

export const getAllProduct = async (req, res) => {
  try{
    const products = await Products.find();
    res.render('list-products', { products: products });
  }catch(error){
    console.log(error);
  }
};
export const getAllProductPOSTMAN = async (req, res) => {
  try{
    const products = await Products.find();
    console.log(products)
    if(!products){
      return res.status(404).json({
        message: "Khong lay duoc du lieu"
      })
    }else{
      return res.status(200).json({
        message: "Lay du lieu thanh cong",
        data: products
      });
    }
  }catch(error){
    console.log(error);
  }
};

export const getProductDetail = async (req, res) => {
  try {
      const productId = req.params.id;
      const product = await Products.findById(productId);
      if (!product) {
          return res.status(404).send("Product not found");
      }
      res.render('product-detail', { product: product });
  } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).send("Internal Server Error");
  }
};
export const getProductDetailPOSTMAN = async (req, res) => {
  try {
      const product = await Products.findById(req.params.id);
      if(!product){
        return res.status(404).json({
          message: "Khong lay duoc san pham"
        })
      }else{
        return res.status(200).json({
          message: "Lay san pham thanh cong",
          data: product
        });
      }
  } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).send("Internal Server Error");
  }
};
export const deleteProduct = async (req, res) => {
  try {
      const productId = req.params.id;
      const product = await Products.findOneAndDelete({ _id: productId });
      res.redirect('/admin');
  } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Internal Server Error");
  }
};
export const deleteProductPOSTMAN = async (req, res) => {
  try {
      const product = await Products.findByIdAndDelete(req.params.id);
      if(!product){
        return res.status(404).json({
          message: "Khong lay duoc san pham"
        })
      }else{
        return res.status(200).json({
          message: "Xoa san pham thanh cong",
          data: product
        });
      }
  } catch (error) {
      console.error("Error fetching product details:", error);
      res.status(500).send("Internal Server Error");
  }
};


export const updateProductPost =  async (req, res) => {
  try {
      const productId = req.params.id;
      let updatedProduct = {
          name: req.body.pro_name,
          price: Number(req.body.pro_price),
          category: req.body.pro_category
      };
      if (req.file) {
          updatedProduct.image = req.file.filename;
      }
      await Products.findByIdAndUpdate(productId, updatedProduct);
      res.redirect('/admin');
  } catch (error) {
      console.error("Error editing product:", error);
      res.status(500).send("Internal Server Error");
  }
};
export const updateProductGet = async (req, res) => {
  try {
      const productId = req.params.id;
      const product = await Products.findById(productId);
      if (!product) {
          return res.status(404).send("Product not found");
      }
      res.render('update-product', { product: product });
  } catch (error) {
      console.error("Error fetching product for update:", error);
      res.status(500).send("Internal Server Error");
  }
};
export const updateProductPOSTMAN = async (req, res) => {
  try {
    const { error } = ProductValidate.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(400).json({
        message: errors
      });
    }

    const product = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({
        message: "Không lấy được sản phẩm"
      });
    } else {
      return res.status(200).json({
        message: "Lấy sản phẩm thành công",
        data: product
      });
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).send("Internal Server Error");
  }
};


export const listProduct =  async(req, res)=>{
  user = await  Users.find();
  console.log(user);
  res.render('list-products', {user: user});
};
export const addProduct = async (req, res) => {
  let file = req.file;
  let img = file.filename;
  const new_pro = {
      category: req.body.category,
      name: req.body.pro_name,
      price: Number(req.body.pro_price),
      image: img
  }
  await Products.create(new_pro);
  res.redirect('/admin');
};
export const addProductPOSTMAN = async (req, res) => {
  try {
    const { error } = ProductValidate.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(400).json({
        message: errors
      });
    }

    const product = await Products.create(req.body);

    if (!product) {
      return res.status(404).json({
        message: "Thêm sản phẩm thất bại",
      });
    } else {
      const updateCate = await Catalog.findByIdAndUpdate(product.categoryID, {
        $addToSet: {
          products: product._id,
        }
      });

      if (!updateCate) {
        return res.status(404).json({
          message: "Update danh mục thất bại",
        });
      }

      return res.status(200).json({
        message: "Thêm sản phẩm thành công",
        data: product
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error
    });
  }
}
