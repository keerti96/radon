const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: true,
    },

    lname: {
        type: String,
        trim: true,
        required: true,   
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      profileImage: { 
        type:string,
        required: true, 
        trim: true
     },

    phone: {
        type: String,
        required: true,
        unique: true,
        trim:true,
      },
      password: {
        type: String,
        required: true,
        trim:true
      }, // encrypted password
      address: {
        shipping: {
          street: { type: String, required: true ,trim :true },
          city: { type: String, required: true,trim :true  },
          pincode: { type: Number, required: true,trim :true  }
        },
        billing: {
          street: { type: String, required: true ,trim :true },
          city: { type: String, required: true,trim :true  },
          pincode: { type: Number, required: true,trim :true  }
        }
      },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);