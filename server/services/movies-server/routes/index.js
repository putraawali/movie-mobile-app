const router = require("express").Router();
const movieRouter = require("./movieRouter.js");
router.get("/", (req, res, next) => {
  res.json("Hai");
});
router.use("/movies", movieRouter);
module.exports = router;
