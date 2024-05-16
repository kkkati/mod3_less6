const mongoose = require("mongoose");

const RequestShema = mongoose.Schema({
  date: {
    type: String,
    require: true,
  },
  FIO: {
    type: String,
    require: true,
  },
  telephone: {
    type: String,
    require: true,
  },
  descriptions: {
    type: String,
    require: true,
  },
});

const Request = mongoose.model("Request", RequestShema);

module.exports = Request;
