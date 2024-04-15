import Catalog from "../models/catalog.js";
import Products from "../models/products.js";
import { categoryValidate } from "../validations/Category.js";
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

export const getAllCatePOSTMAN = async (req, res) => {
  try{
    const Category = await Catalog.find();
    console.log(Category)
    // res.render('list-Category', { Category: Category });
    if(!Category){
      return res.status(404).json({
        message: "Khong lay duoc du lieu"
      })
    }else{
      return res.status(200).json({
        message: "Lay du lieu thanh cong",
        data: Category
      });
    }
  }catch(error){
    console.log(error);
  }
};


export const getCateDetailPOSTMAN = async (req, res) => {
  try {
      const Category = await Catalog.findById(req.params.id).populate('products');
      // res.render('Category-detail', { Category: Category });
      if(!Category){
        return res.status(404).json({
          message: "Khong lay duoc san pham"
        })
      }else{
        return res.status(200).json({
          message: "Lay san pham thanh cong",
          data: Category
        });
      }
  } catch (error) {
      console.error("Error fetching Category details:", error);
      res.status(500).send("Internal Server Error");
  }
};

export const deleteCatePOSTMAN = async (req, res) => {
  try {
      const Category = await Catalog.findByIdAndDelete(req.params.id);
      // res.render('Category-detail', { Category: Category });
      if(!Category){
        return res.status(404).json({
          message: "Khong lay duoc san pham"
        })
      }else{
        return res.status(200).json({
          message: "Xoa san pham thanh cong",
          data: Category
        });
      }
  } catch (error) {
      console.error("Error fetching Category details:", error);
      res.status(500).send("Internal Server Error");
  }
};

export const updateCatePOSTMAN = async (req, res) => {
  try {
    const { error } = categoryValidate.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(400).json({
            message: errors
        });
    }

      const Category = await Catalog.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if(!Category){
        return res.status(404).json({
          message: "Khong lay duoc san pham"
        })
      }else{
        return res.status(200).json({
          message: "Lay san pham thanh cong",
          data: Category
        });
      }
  } catch (error) {
      console.error("Error fetching Category details:", error);
      res.status(500).send("Internal Server Error");
  }
};

export const addCatePOSTMAN = async (req, res) => {
  try {
    const { error } = categoryValidate.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(err => err.message);
        return res.status(400).json({
            message: errors
        });
    }    
    
    const Category = await Catalog.create(req.body);
    if (!Category) {
      return res.status(404).json({
        message: "Khong lay duoc san pham"
      });
    }
    return res.status(200).json({
      message: "Lay san pham thanh cong",
      data: Category 
    });
  } catch (error) {
    return res.status(500).json({
      message: error
  });
  }
};















