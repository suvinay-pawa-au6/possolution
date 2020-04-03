const express = require("express");
const router = express.Router();
const dashboardcontroller = require("../../controller/dashboardcontroller");
router.get("/", (req, res, next) => {
  next();
});
router.get("/cart", dashboardcontroller.cartDetails);
router.get("/checkout", dashboardcontroller.checkOut);
router.post("/cart", dashboardcontroller.postProductCart);
router.get("/total", dashboardcontroller.currentTotal);
router.patch("/:id", dashboardcontroller.changeProductQuantity);
router.delete("/:id", dashboardcontroller.deleteProductCart);

module.exports = router;
