const express = require("express");
const router = express.Router();
const billingcontroller = require("../../controller/billingcontroller");
router.get("", billingcontroller.AllBills);

router.get("/:id", billingcontroller.BillByCustomer);

router.delete("/:id", billingcontroller.DeleteBillByCustomer);

module.exports = router;
