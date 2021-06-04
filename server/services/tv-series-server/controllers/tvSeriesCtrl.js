const {
  getAllSeriesModel,
  addSeriesModel,
  updateSeriesModel,
  deleteSeriesModel,
  getSeriesByIdModel,
} = require("../models/tvSeriesModel.js");
class TVSeries {
  static async getAllSeries(req, res, next) {
    try {
      const allSeries = await getAllSeriesModel();
      res.status(200).json(allSeries);
    } catch (error) {
      next({ status: 500 });
    }
  }

  static async addSeries(req, res, next) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const data = { title, overview, poster_path, popularity, tags };
    try {
      const addedSeries = await addSeriesModel(data);
      res.status(201).json(addedSeries.ops[0]);
    } catch (error) {
      next({ status: 500 });
    }
  }
  static async getSeriesById(req, res, next) {
    const _id = req.params.id;
    try {
      const series = await getSeriesByIdModel(_id);
      res.status(200).json(series);
    } catch (error) {
      next({ status: 500 });
    }
  }
  static async updateSeries(req, res, next) {
    const _id = req.params.id;
    const { title, overview, poster_path, popularity, tags } = req.body;
    const dataToupdate = { title, overview, poster_path, popularity, tags };
    try {
      await updateSeriesModel(_id, dataToupdate);
      res.status(200).json({ message: "Series updated successfully" });
    } catch (error) {
      next({ status: 500 });
    }
  }

  static async deleteSeries(req, res, next) {
    const _id = req.params.id;
    try {
      await deleteSeriesModel(_id);
      res.status(200).json({ message: "Series deleted successfully" });
    } catch (error) {
      next({ status: 500 });
    }
  }
}

module.exports = TVSeries;
