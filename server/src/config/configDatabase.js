const mongoose = require("mongoose");

function connectDatabase() {
  mongoose
    .connect("mongodb://localhost:27017/", {
      dbName: "expenses_tracker",
    })
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      console.log("Connected to your database");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { connectDatabase };
