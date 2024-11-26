const express = require("express");
const cors = require('cors');
require('dotenv').config();


const clerk = require('@clerk/express');
const routes = require("./routes/routes");


const app = express();

app.use(cors());
// app.use(cors({
//   'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization', 'authorization'],
//   'exposedHeaders': ['sessionId'],
//   'origin': process.env.CORS_ORIGINS,
//   'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   'credentials': false,
//   'preflightContinue': false
// }));

app.use(clerk.clerkMiddleware());






routes.configure(app);





app.listen(process.env.PORT, () => {
  console.log(`Application tracker backend listening at http://localhost:${process.env.PORT}`);
})