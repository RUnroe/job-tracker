const express = require("express");
const cors = require('cors');
require('dotenv').config();


const clerk = require('@clerk/express');
const routes = require("./routes/routes");


const app = express();

app.use(cors());

app.use(clerk.clerkMiddleware());






routes.configure(app);





app.listen(process.env.PORT, () => {
  console.log(`Application tracker backend listening at http://localhost:${process.env.PORT}`);
})