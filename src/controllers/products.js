import Products from "../models/products.js";


export const getAllProduct = async (req, res) => {

  try{
    const products = await Products.find();
    res.render('list-products', { products: products });
    // console.log(products);
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
export const deleteProduct = async (req, res) => {
  try {
      const productId = req.params.id;
      const product = await Products.findOneAndDelete({ _id: productId });
      res.redirect('/list-products');
  } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Internal Server Error");
  }
};

export const updateProductPost =  async (req, res) => {
  try {
      const productId = req.params.id;
      let updatedProduct = {
          name: req.body.pro_name,
          price: Number(req.body.pro_price)
      };
      if (req.file) {
          updatedProduct.image = req.file.filename;
      }
      await Products.findByIdAndUpdate(productId, updatedProduct);
      res.redirect('/list-products');
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
export const listProduct =  async(req, res)=>{
  user = await  Users.find();
  console.log(user);
  res.render('list-products', {user: user});
};
export const addProduct = async (req, res) => {
  // console.log(req.body);
  let file = req.file;
  let img = file.filename;
  const new_pro = {
      // id: products.length + 1,
      category: req.body.pro_category,
      name: req.body.pro_name,
      price: Number(req.body.pro_price),
      image: img
  }
  // products.push(new_pro);
  await Products.create(new_pro);
  res.redirect('/admin');
};








