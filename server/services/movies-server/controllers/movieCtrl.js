const {
  getAllMovieModel,
  addMovieModel,
  updateMovieModel,
  deleteMovieModel,
  getMovieByIdModel,
} = require("../models/movieModel.js");
class MovieCtrl {
  static async getAllMovie(req, res, next) {
    try {
      const movies = await getAllMovieModel();
      res.status(200).json(movies);
    } catch (error) {
      next({ status: 500 });
    }
  }

  static async addMovie(req, res, next) {
    let dataMovie = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: +req.body.popularity,
      tags: req.body.tags,
    };
    try {
      const added = await addMovieModel(dataMovie);
      res.status(201).json(added.ops[0]);
    } catch (error) {
      next({ status: 500 });
    }
  }

  static async getMovieById(req, res, next) {
    const _id = req.params.id;
    try {
      const movie = await getMovieByIdModel(_id);
      res.status(200).json(movie);
    } catch (error) {
      next({ status: 500 });
    }
  }

  static async updateMovie(req, res, next) {
    const _id = req.params.id;
    const dataToUpdate = {
      title: req.body.title,
      overview: req.body.overview,
      poster_path: req.body.poster_path,
      popularity: req.body.popularity,
      tags: req.body.tags,
    };
    try {
      await updateMovieModel(_id, dataToUpdate);
      res.status(200).json({ message: "Movie updated successfully" });
    } catch (error) {
      next({ status: 500 });
    }
  }

  static async deleteMovie(req, res, next) {
    const _id = req.params.id;
    try {
      await deleteMovieModel(_id);
      res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      next({ status: 500 });
    }
  }
}

module.exports = MovieCtrl;
