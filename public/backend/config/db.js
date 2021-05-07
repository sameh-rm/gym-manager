const mongoose = require("mongoose");
require("colors");
const connectDB = async () => {
  try {
    const con = await mongoose.connect("mongodb://localhost:27017/gym", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${con.connection.host}`.cyan.underline);
    return true;
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
