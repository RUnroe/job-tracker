const { application } = require("express");
const mongo = require("mongodb");


// Database client connection
const dbClient = new mongo.MongoClient((process.env.MONGO_CONNECTION || ""));
console.log("Attempting to connect to database");
dbClient.connect().then(() => console.log("Connected to Mongo database")).catch(error => console.log("Could not connect", error));




const applicationService = {

  getAllApplications: async function() {
    try {
      const applicationList = await dbClient.db(process.env.DATABASE_NAME).collection("application").find().toArray();
      console.log(applicationList);
      return applicationList;
    }
    catch (ex) {
      const errorMessage = `Error querying for application list: ${ex.message}`;
      console.error(errorMessage);
      return null;
    }
  },

  getApplicationById: async function(id) {
    try {
      const applicationById = await dbClient.db(process.env.DATABASE_NAME).collection("application").findOne({"_id": mongo.ObjectId(id)});
      console.log(applicationById);
      return applicationById;
    }
    catch (ex) {
      const errorMessage = `Error querying for application by id: ${ex.message}`;
      console.error(errorMessage);
      return null;
    }
  },

  createApplication: async function(application, userId) {
    application.userId = userId;
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

  getAllTechnologies: async function() {
    try {
      const technologies = await dbClient.db(process.env.DATABASE_NAME).collection("technology").find().toArray();
      console.log(technologies);
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