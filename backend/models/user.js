const mongoose = require("mongoose");

const UserShema = mongoose.Schema({
  login: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  // requests: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Request",
  //   },
  // ],
});

const User = mongoose.model("User", UserShema);

module.exports = User;
