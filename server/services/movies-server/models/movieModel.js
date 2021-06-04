const { ObjectId } = require("bson");
const { getDb } = require("../configDb");

async function getAllMovieModel() {
  return await getDb().collection("Movies").find().toArray();
}
async function addMovieModel(dataMovie) {
  return await getDb().collection("Movies").insertOne(dataMovie);
}

async function getMovieByIdModel(_id) {
  return await getDb()
    .collection("Movies")
    .findOne({ _id: ObjectId(_id) });
}

async function updateMovieModel(_id, dataToUpdate) {
  return await getDb()
    .collection("Movies")
    .updateOne(
      {
        _id: ObjectId(_id),
      },
      {
        $set: dataToUpdate,
        $currentDate: { lastModified: true },
      }
    );
}

async function deleteMovieModel(_id) {
  return await getDb()
    .collection("Movies")
    .deleteOne({ _id: ObjectId(_id) });
}
module.exports = {
  getAllMovieModel,
  addMovieModel,
  updateMovieModel,
  deleteMovieModel,
  getMovieByIdModel,
};
