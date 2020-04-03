const ProductM = require("../model/product");
const cart = require("../model/dashboard");
const bill = require("../model/bills");

module.exports = {
  cartDetails: (req, res, next) => {
    cart
      .find()
      .exec()
      .then(data => {
        res
          .status(400)
          .json({ message: "Here is your cart details", data: data });
      });
  },
  checkOut: (req, res, next) => {
    var arr = [];
    var paymentmethod = req.query.paymentmethod;
    var customer = req.query.customer;
    var i = 0;
    cart
      .find()
      .exec()
      .then(data => {
        data.forEach(element => {
          arr.push(data[i].Product);
          i++;
        });
        console.log(arr);
        var billgen = new bill({
          Product: arr,
          Customer: "me",
          Offer: "you",
          SubTotal: 1234
        });
        billgen.save().then(result => {
          res.json({ "Invoice data": result });
          cart
            .remove()
            .exec()
            .then(result => {
              console.log("cart cleared");
            });
        });
      });
    if (paymentmethod == "Cash") {
      var a = 1;
      //Take cash from user. Succesfull
      //Add customer to cusvartomer database
      //Decrease Quantity from product stocks
      //Bill Database = Contains history of all bills with customer name
      //Generate a bill
    }
    if (paymentmethod === "online") {
      var b = 1;
      //Integrate razor pay and send link to user on email or mobile . complete payment.Successfull
      //Add customer to customer database
      //Decrease Quantity from product stocks
      //Bill Database = Contains history of all bills with customer name
      //Generate a bill
    }
  },
  postProductCart: (req, res, next) => {
    var final = req.query.final;

    if (!final) {
      var start = 0;

      //  var noofproducts = req.body.products.length;
      var current = req.body.products;
      console.log(current);
      var offers = req.body.offers;
      var customer = req.body.Customer;
      var cart_Product_arr = [];
      var promises = [];
      var final_price = 0;
      //  while (start < noofproducts) {
      //var current = products[start];
      //console.log(current);

      //, { _id: current }
      // Middleware
      // Token, verify it, payload, check the user schema for the user object
      // req.user = user
      //next()
      // const user = req.user
      /// user_id
      // user.name
      //user.email

      var promise = ProductM.find({ $or: [{ name: current }] })
        .exec()
        .then(result => {
          console.log("Found Product", result[0].name);
          var cart_Product = {};
          cart_Product.name = result[0].name;
          cart_Product.quantity = 1;
          cart_Product.category = result[0].category;
          cart_Product.price = result[0].price;
          cart_Product.pid = result[0]._id;
          cart_Product.discount = result[0].discount;
          cart_Product.tax = result[0].tax;
          cart_Product.discounted_price = cart_Product.price;

          if (cart_Product.discount) {
            cart_Product.discounted_price =
              ((100 - cart_Product.discount) / 100) * cart_Product.price;
            cart_Product.taxed_price =
              (1 + cart_Product.tax / 100) * cart_Product.discounted_price;
          } else {
            cart_Product.taxed_price =
              (1 + cart_Product.tax / 100) * cart_Product.price;
          }
          final_price = cart_Product.taxed_price;
          //var cart = [];
          //cart.product = cart_Product;
          //cart.totat = total_value;
          return cart_Product;
        })
        .then(function(data) {
          var newcart = new cart({
            Product: data,
            Customer: customer,
            SubTotal: final_price
          });

          newcart.save().then(result => {
            console.log("customer", customer, "subt", final_price);
            res.json({ cart: result });

            console.log(result);
          });
        });
      //promises.push(promise);

      //start++;
      //}
      // Promise.all(promises).then(function() {
      //   console.log(cart_Product_arr);
      //
      // });
    }
    //res.status(400).json({ message: req.query.final });
  },
  currentTotal: (req, res, next) => {
    var total = 0;
    var tnumber = 0;
    cart
      .find()
      .exec()
      .then(result => {
        result.forEach(function(value) {
          //apply discount and calculate total
          var quantity = value.Product[0].quantity;
          total = total + quantity * value.SubTotal;
          tnumber = tnumber + quantity;
        });
        console.log(total);
        res.json({
          total: total,
          Number_of_Products: tnumber
        });
      });
  },
  changeProductQuantity: (req, res, next) => {
    var id = req.params.id;
    var increase = req.query.increase;
    var decrease = req.query.decrease;
    console.log(id);
    if (increase) {
      const update = [];
      cart
        .find({ Product: { $elemMatch: { name: id } } })
        .exec()
        .then(data => {
          return (quantity = data[0].Product[0].quantity);
        })
        .then(quantity => {
          quantity++;

          cart.findOneAndUpdate(
            { Product: { $elemMatch: { name: id } } },
            { $set: { "Product.$.quantity": quantity } },
            {
              new: true
            },
            function(err, doc) {
              if (err) {
                console.log("err");
              } else {
                //console.log(id);
                //console.log(quantity);
                res.status(402).json({
                  message: "Quantity Increased by 1",
                  cartp: doc
                });
              }
            }
          );
        });
    } else if (decrease) {
      {
        const update = [];
        cart
          .find({ Product: { $elemMatch: { name: id } } })
          .exec()
          .then(data => {
            return (quantity = data[0].Product[0].quantity);
          })
          .then(quantity => {
            quantity--;

            cart.findOneAndUpdate(
              { Product: { $elemMatch: { name: id } } },
              { $set: { "Product.$.quantity": quantity } },
              {
                new: true
              },
              function(err, doc) {
                if (err) {
                  console.log("err");
                } else {
                  //console.log(id);
                  //console.log(quantity);
                  res.status(402).json({
                    message: " quantity decreased by 1",
                    cartp: doc
                  });
                }
              }
            );
          });
      }
    }
    //res.status(400).json({ message: "Welcome to Dashoard:PATCH" });
  },
  deleteProductCart: (req, res, next) => {
    var id = req.params.id;
    console.log(id);
    if (1) {
      cart
        .deleteOne({ Product: { $elemMatch: { name: id } } })
        .exec()
        .then(data => {
          res.status(400).json({ message: "Deleted Succesffully" });
        });
    }
  }
};
