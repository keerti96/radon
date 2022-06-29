const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;



let validateNumber = function(mobile) {
    var res = /^(\+\d{1,3}[- ]?)?\d{10}$/ ;
    return res.test(mobile)
};

let validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const internSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "name is a required field",
      trim: true,
    },
    email: {
      type: String,
      required: "email is a required field",
      unique: true,
      validate: [validateEmail, 'please fill the valid Email address']
    },
    mobile: {
      type: Number,
      required: "mobile is a required field",
      unique: true,
      validate: [validateNumber, 'please fill the valid Mobile Number']
    },
    collegeId: {
      type: ObjectId,
      ref: "College",
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Intern", internSchema);