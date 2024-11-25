const mongo = require("mongodb");


// Database client connection
const dbClient = new mongo.MongoClient((process.env.MONGO_CONNECTION || ""));
console.log("Attempting to connect to database");
dbClient.connect().then(() => console.log("Connected to Mongo database")).catch(error => console.log("Could not connect", error));




const applicationService = {

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
  }

}

module.exports = {applicationService};