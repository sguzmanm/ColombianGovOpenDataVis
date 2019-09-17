const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const dbName="exampleCollection";

const mongoConnect = async () => {
  return await new Promise((resolve, reject) => {
    MongoClient.connect(
      `mongodb://localhost:27017/${dbName}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
      .then(client => {
        console.log("Connected!");
        _db = client.db();
        resolve(_db);
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  });
};

const db = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.db = db;
