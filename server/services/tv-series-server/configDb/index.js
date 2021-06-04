const { MongoClient } = require("mongodb");

let db;
async function connectDb() {
  try {
    const uri =
      "mongodb+srv://dbEntertainMe:dbEntertainMe@entertainme.xumph.mongodb.net/entertainMe?retryWrites=true&w=majority";
    const dbName = "entertainMe";
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    db = client.db(dbName);
  } catch (error) {
    console.log(error);
  }
}

function getDb() {
  return db;
}

module.exports = { connectDb, getDb };
