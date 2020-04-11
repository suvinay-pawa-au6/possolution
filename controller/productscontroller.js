const ProductM = require("../model/product");
module.exports = {
  //GET ALL PRODUCT
  totalproducts: (req, res, next) => {
    const pId = req.params.pId;
    if (pId === "all") {
      ProductM.find().exec(function (err, data) {
        res.status(200).json({ data: data });
      });
    } else {
      ProductM.findById(pId)
        .exec()
        .then((result) => {
          res.json({
            message: "Found Product with ID",
            id: pId,
            product: result,
          });
        });
    }
  },

  //This Method is used to get the name ,category, price,tax,Discountof a certain or all Products
  addproducts: (req, res, next) => {
    const product = new ProductM({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      discount: req.body.discount,
      tax: req.body.tax,
      stock: req.body.stock,
    });
    product.save().then((result) => {
      console.log(result);
    });
    res.status(201).json({
      message: " Product Added ",
      object: product,
    });
  },

  //Update Product By Id
  updatepraducts: (req, res, next) => {
    const pId = req.params.pId;
    const Update = {};

    if (req.body.name) Update.name = req.body.name;
    if (req.body.category) Update.category = req.body.category;
    if (req.body.price) Update.price = req.body.price;
    if (req.body.discount) Update.discount = req.body.discount;
    if (req.body.tax) Update.tax = req.body.tax;
    if (req.body.stock) Update.stock = req.body.stock;
    var doc = ProductM.findOneAndUpdate(
      { _id: pId },
      { $set: Update },
      {
        new: true,
      },
      function (err, doc) {
        if (err) {
          console.log("err");
        } else {
          res.status(202).json({
            message: "Updated Product",
            data: doc,
          });
        }
      }
    );
  },

  //Delete a product
  deleteproducts: (req, res, next) => {
    const pId = req.params.pId;
    console.log(pId);
    if (pId === "all") {
      ProductM.remove({})
        .exec()
        .then((result) => {
          console.log("Everything deleted");
          res.json({
            message: "Deleted all the products listed below",
            result: result,
          });
        });
    } else {
      ProductM.findByIdAndRemove(pId)
        .exec()
        .then((result) => {
          res.json({
            message: "Found Product with Id And Removed",
            id: pId,
            product: result,
          });
        });
    }
  },
};
