const { getDb } = require("../configDb");
const { ObjectId } = require("bson");

async function getAllSeriesModel() {
  return await getDb().collection("TV_Series").find().toArray();
}
async function addSeriesModel(data) {
  return await getDb().collection("TV_Series").insertOne(data);
}
async function getSeriesByIdModel(_id) {
  return await getDb()
    .collection("TV_Series")
    .findOne({ _id: ObjectId(_id) });
}
async function updateSeriesModel(_id, dataToUpdate) {
  return await getDb()
    .collection("TV_Series")
    .updateOne(
      { _id: ObjectId(_id) },
      { $set: dataToUpdate, $currentDate: { lastModified: true } }
    );
}
async function deleteSeriesModel(_id) {
  return await getDb()
    .collection("TV_Series")
    .deleteOne({ _id: ObjectId(_id) });
}
module.exports = {
  getAllSeriesModel,
  addSeriesModel,
  updateSeriesModel,
  deleteSeriesModel,
  getSeriesByIdModel,
};
