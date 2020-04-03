const bill = require("../model/bills");
module.exports = {
  AllBills: (req, res, next) => {
    bill
      .find()
      .exec()
      .then(result => {
        res.status(400).json({ Here_are_your_bills: result });
      });
  },
  BillByCustomer: (req, res, next) => {
    bill
      .find({ Customer: req.params.id })
      .exec()
      .then(result => {
        res.status(400).json({ message: result });
      });
  },
  DeleteBillByCustomer: (req, res, next) => {
    bill
      .remove({ Customer: req.params.id })
      .exec()
      .then(result => {
        res.status(400).json({ message: result });
      });
  }
};
