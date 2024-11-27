const mongo = require("mongodb");


// Database client connection
const dbClient = new mongo.MongoClient((process.env.MONGO_CONNECTION || ""));
console.log("Attempting to connect to database");
dbClient.connect().then(() => console.log("Connected to Mongo database")).catch(error => console.log("Could not connect", error));




const applicationService = {

  getAllApplications: async function(userId) {
    try {
      const applicationList = await dbClient.db(process.env.DATABASE_NAME).collection("application").find({userId}).toArray();
      return applicationList;
    }
    catch (ex) {
      const errorMessage = `Error querying for application list: ${ex.message}`;
      console.error(errorMessage);
      return null;
    }
  },

  getApplicationById: async function(id, userId) {
    try {
      const applicationById = await dbClient.db(process.env.DATABASE_NAME).collection("application").findOne({"_id": new mongo.ObjectId(id), userId});
      return applicationById;
    }
    catch (ex) {
      const errorMessage = `Error querying for application by id: ${ex.message}`;
      console.error(errorMessage);
      return null;
    }
  },

  createApplication: async function(application, userId) {
    if(!application) {
      const errorMessage = `Application cannot be null`;
      console.error(errorMessage);
      return null;
    }
    application.userId = userId;
    application.dateUpdated = new Date().toISOString();
    try {
      const result = await dbClient.db(process.env.DATABASE_NAME).collection("application").insertOne(application);
      console.log(result);
      return result.insertedId;
    }
    catch (ex) {
      const errorMessage = `Error creating application: ${ex.message}`;
      console.error(errorMessage);
      return null;
    }
  },

  updateApplication: async function(applicationId, application, userId) {
    if(!application || !applicationId) {
      const errorMessage = `Application cannot be null`;
      console.error(errorMessage);
      return null;
    }
    try {
      delete application._id;
      delete application.userId;
      application.dateUpdated = new Date().toISOString();
      const result = await dbClient.db(process.env.DATABASE_NAME).collection("application").updateOne({"_id": new mongo.ObjectId(applicationId)}, {$set: application});
      return true;
    }
    catch (ex) {
      const errorMessage = `Error creating application: ${ex.message}`;
      console.error(errorMessage);
      return null;
    }
  },

  getAllTechnologies: async function() {
    try {
      const technologies = await dbClient.db(process.env.DATABASE_NAME).collection("technology").find().toArray();
      return technologies;
    }
    catch (ex) {
      const errorMessage = `Error querying for technology list: ${ex.message}`;
      console.error(errorMessage);
      return null;
    }
  },

}

module.exports = {applicationService};