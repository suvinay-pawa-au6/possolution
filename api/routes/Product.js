const express = require("express");
const router = express.Router();

const productdcontroller = require('../../controller/productscontroller')

//GET ALL PRODUCT
router.get("/:pId",productdcontroller.totalproducts);

//This Method is used to get the name ,category, price,tax,Discountof a certain or all Products
router.post("/", productdcontroller.addproducts);

//Update Product By Id
router.patch("/:pId",productdcontroller.updatepraducts );

//Delete a product

router.delete("/:pId",productdcontroller.deleteproducts );

module.exports = router;
