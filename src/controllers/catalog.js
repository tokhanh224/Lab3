import Products from "../models/products.js";

export const getCatalog = async (req, res) => {
  const category = req.params.category;
  try {
    // Lấy các sản phẩm thuộc danh mục được chỉ định từ cơ sở dữ liệu
    const products = await Products.find({ category: category }).exec();
    // Trả về trang hiển thị sản phẩm của danh mục đã chọn
    res.render('catalog', { products: products });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};




