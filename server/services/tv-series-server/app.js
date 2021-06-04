const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 4002;
const { connectDb } = require("./configDb");
const router = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.use(function errorHandler(error, req, res, next) {
  if (error.status === 500) {
    res.status(500).json({ message: "Internal server error" });
  } else {
    res.status(error.status).json({ message: error.message });
  }
});

connectDb()
  .then(() => {
    app.listen(PORT, () => console.log("Kopi susu harga " + PORT));
  })
  .catch((err) => console.log(err));
