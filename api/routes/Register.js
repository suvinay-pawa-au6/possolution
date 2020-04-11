const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../model/user");
const authenticate = require("../../middleware/check-auth");
router.post("/", (req, res) => {
  //const password = req.body.password;

  console.log(req.body);
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email Id exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            
            const user = new User({
              email: req.body.email,
              name: req.body.name,
              password: hash,
            });
            console.log(user);
            user
              .save()
              .then((data) => {
                res.json({ message: "New Company ", data });
              })
              .catch((err) => {
                return res.status(409).json({ err });
              });
          }
        });
      }
    });
});

module.exports = router;
