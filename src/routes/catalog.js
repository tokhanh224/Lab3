import express from "express";
import { addCatePOSTMAN, deleteCatePOSTMAN, getAllCatePOSTMAN, getCateDetailPOSTMAN, updateCatePOSTMAN } from "../controllers/catalog.js";
import { checkPermission } from "../controllers/Roleuser.js";
const router_cata = express.Router();

// router_cata.use(('/', getCatalog)); 

router_cata.get('/', getAllCatePOSTMAN);
router_cata.post('/', checkPermission,addCatePOSTMAN);
router_cata.put('/:id',checkPermission, updateCatePOSTMAN);
router_cata.delete('/:id', checkPermission,deleteCatePOSTMAN);
router_cata.get("/:id", getCateDetailPOSTMAN);
export  default router_cata;