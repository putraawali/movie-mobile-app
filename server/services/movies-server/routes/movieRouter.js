const movieRouter = require("express").Router();
const MovieCtrl = require("../controllers/movieCtrl.js");
movieRouter.get("/", MovieCtrl.getAllMovie);
movieRouter.post("/", MovieCtrl.addMovie);
movieRouter.get("/:id", MovieCtrl.getMovieById);
movieRouter.put("/:id", MovieCtrl.updateMovie);
movieRouter.delete("/:id", MovieCtrl.deleteMovie);
module.exports = movieRouter;
