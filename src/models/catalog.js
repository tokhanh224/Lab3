import mongoose from "mongoose";

const CatalogSchema = new mongoose.Schema({
  nameCategory: String,
  dateCategory: Date ,
  dateEditCategory: Date
}, {collection: 'catalog', versionKey: false });

const Catalog = mongoose.model('Catalog', CatalogSchema);

export default Catalog;
