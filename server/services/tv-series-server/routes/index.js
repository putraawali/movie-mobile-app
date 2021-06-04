const router = require("express").Router();
const seriesRouter = require("./tvSeriesRouter.js");
router.get("/", (req, res, next) => {
  res.json("Hai");
});
router.use("/series", seriesRouter);
module.exports = router;
