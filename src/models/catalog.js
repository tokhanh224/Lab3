import mongoose from "mongoose";

const CatalogSchema = new mongoose.Schema({
  nameCategory: {
    type: String,
    required: true,
    unique: true,
},
dateCategory: {
    type: Number,
    required: true,
    unique: true,
},
products: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
    }
]
}, {
collection: 'catalog',
versionKey: false,
timestamps: true
});


const Catalog = mongoose.model('Catalog', CatalogSchema);

export default Catalog;
