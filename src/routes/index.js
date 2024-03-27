import express from "express";
import { ADMIN, Home }from "../controllers/index.js"
import { getCatalog } from "../controllers/catalog.js";
const router_id = express.Router();
router_id.get('/', Home, getCatalog);
// app.get('/',  Home);
router_id.get('/admin', ADMIN);
export default router_id;