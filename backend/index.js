const express = require("express");
const cors = require('cors');
require('dotenv').config();


const clerk = require('@clerk/express');
const routes = require("./routes/routes");


const app = express();

// app.use(cors());
app.use(cors({
  // 'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization', 'authorization'],
  // 'exposedHeaders': ['sessionId'],
  // 'origin': process.env.CORS_ORIGINS,
  'origin': ["http://localhost:5173"],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'credentials': true,
  // 'preflightContinue': false,
  'optionsSuccessStatus': 200,
}));


app.use((req, res, next) => {
 
  const origin = req.headers.origin;
  if (process.env.CORS_ORIGINS.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.use(clerk.clerkMiddleware());






routes.configure(app);





app.listen(process.env.PORT, () => {
  console.log(`Application tracker backend listening at http://localhost:${process.env.PORT}`);
})