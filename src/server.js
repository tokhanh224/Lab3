import express from "express";
import mongoose from "mongoose";
import router from "./routes/products.js";
import router_id from "./routes/index.js";
import router_cata from "./routes/catalog.js";
const app = express();
const port = 3000;
mongoose.connect('mongodb://127.0.0.1:27017/wd18327');
// Khai báo template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));
// Khai báo middleware
app.use(express.urlencoded({
    extended: true,
}));


// Khai báo route
// Trang Chi Tiết sản phẩm
app.use('/', router_id);
// Trang chủ, sản phẩm
app.use('/', router);
//Danh mục
app.use('/', router_cata);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})