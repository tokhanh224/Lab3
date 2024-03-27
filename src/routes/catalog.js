import express from "express";
import { getCatalog } from "../controllers/catalog.js";
const router_cata = express.Router();

router_cata.use(('catalog', getCatalog)); 
export  default router_cata;