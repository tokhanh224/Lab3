import express from "express";
import mongoose from "mongoose";
import router from "./routes/products.js";
import router_id from "./routes/index.js";
import router_cata from "./routes/catalog.js";
import dotenv from "dotenv"
import router_POSTMAN from "./routes/postman.js";
import router_auth from "./routes/auth.js";
dotenv.config()
const app = express();
const port = process.env.PORT;
mongoose.connect(process.env.DB)
// Khai báo template engine
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('./src/public'));
// Khai báo middleware
// app.use(express.urlencoded({
//     extended: true,
// }));

app.use(express.json());

// Khai báo route
// Trang Chi Tiết sản phẩm
app.use('/', router_id);
app.use('/', router);
app.use('/', router_POSTMAN);
// app.use('/', router_cata);

// app.use('/api', router_POSTMAN);
app.use('/api/auth', router_auth);


app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})