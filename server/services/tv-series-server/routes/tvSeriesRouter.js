const seriesRouter = require("express").Router();
const TVSeries = require("../controllers/tvSeriesCtrl.js");

seriesRouter.get("/", TVSeries.getAllSeries);
seriesRouter.post("/", TVSeries.addSeries);
seriesRouter.get("/:id", TVSeries.getSeriesById);
seriesRouter.put("/:id", TVSeries.updateSeries);
seriesRouter.delete("/:id", TVSeries.deleteSeries);
module.exports = seriesRouter;
