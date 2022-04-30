const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  userID: {
    type: "String",
  },
  marketID: {
    type: "String",
  },
  marketName: {
    type: "String",
  },
  cmdtyID: {
    type: "String",
  },
  marketType: {
    type: "String",
  },
  cmdtyName: {
    type: "String",
  },
  priceUnit: {
    type: "String",
  },
  convFctr: {
    type: Number,
  },
  price: {
    type: mongoose.Types.Decimal128,
  },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", ReportSchema);
