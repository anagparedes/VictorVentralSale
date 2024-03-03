const router = require("express").Router();
const {
  getAllSales,
  getSaleById,
  createSale,
  updateSaleById,
  deleteSaleById,
} = require("../controllers/sales.controller.js");

router.get("/getAllSales", getAllSales);
router.get("/GetSaleById/:id", getSaleById);
router.post("/CreateSale", createSale);
router.put("/UpdateSaleById/:id", updateSaleById);
router.delete("/DeleteSaleById/:id", deleteSaleById);

module.exports = router;
