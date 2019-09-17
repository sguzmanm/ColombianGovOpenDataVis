const path = require("path"),
  rootDir = path.dirname(process.mainModule.filename),
  db = require(path.join(rootDir, "util", "db", "mongo")).db(),
  res1 = db.collection("res1");

let ObjectId = require("mongodb").ObjectID;

exports.findAll = async () => {
  
  let answer = await res1.find({}).toArray();
  return answer
}

exports.newElement = async (newRes1) => {

  return res1.insertOne(newRes1,
    { returnOriginal:false, timestamps: true }
  );
};

exports.findOne = async(collectionId)=>{
  let answer = await res1.find({ _id: ObjectId(collectionId) }).toArray();
  return answer
}

exports.updateElement = async (collectionId, newRes1) => {
  return res1.findOneAndUpdate(
    { _id: ObjectId(collectionId) },
    { $set: newRes1 },
    { returnOriginal:false, timestamps: true }
  );
};

exports.deleteElement = async (collectionId) => {
  return res1.deleteOne(
    { _id: ObjectId(collectionId) }
  );
};
