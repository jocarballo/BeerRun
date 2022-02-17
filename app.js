// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//session info here
require('./config/session.config')(app);

// default value for title local
const projectName = "BeerRun";


app.locals.title = `${projectName} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const { getBars } = require("./scripts/script.js")

const authRouter = require('./routes/auth');
app.use('/', authRouter);

const profileRouter = require('./routes/profile.js');
app.use('/', profileRouter);

const tripsRouter = require('./routes/trip.js');
app.use('/', tripsRouter);

const reviewRouter = require('./routes/review.js');
app.use('/', reviewRouter);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);


module.exports = app;
