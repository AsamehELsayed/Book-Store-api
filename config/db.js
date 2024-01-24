const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
let mongoUrl=process.env.MONGO_URL
const Port = process.env.PORT;
async function dbconnect() {
    try {
      await mongoose.connect(mongoUrl, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`working on http://localhost:${Port}`);
    } catch (error) {
      console.log(error);
      console.log("sad");
    }
  }


module.exports={dbconnect}