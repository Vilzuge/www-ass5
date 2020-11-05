const express = require("express");
const router = express().router;

const boardController = require("./routes/gameboard");
const app = express();
app.set("view engine", "pug");

// Set up mongoose connection
var mongoose = require("mongoose");

/* Reading env variables (config example from https://github.com/sclorg/nodejs-ex/blob/master/server.js)
var mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
  mongoURLLabel = "";
*/

// For local dev
var mongoURL =
  "mongodb+srv://<username>:<password>@villen-cluster.pxg9c.mongodb.net/<dbname>?retryWrites=true&w=majority";

if (mongoURL == null) {
  var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
  // If using plane old env vars via service discovery
  if (process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
    mongoHost = process.env[mongoServiceName + "_SERVICE_HOST"];
    mongoPort = process.env[mongoServiceName + "_SERVICE_PORT"];
    mongoDatabase = process.env[mongoServiceName + "_DATABASE"];
    mongoPassword = process.env[mongoServiceName + "_PASSWORD"];
    mongoUser = process.env[mongoServiceName + "_USER"];

    // If using env vars from secret from service binding
  } else if (process.env.database_name) {
    mongoDatabase = process.env.database_name;
    mongoPassword = process.env.password;
    mongoUser = process.env.username;
    var mongoUriParts = process.env.uri && process.env.uri.split("//");
    if (mongoUriParts.length == 2) {
      mongoUriParts = mongoUriParts[1].split(":");
      if (mongoUriParts && mongoUriParts.length == 2) {
        mongoHost = mongoUriParts[0];
        mongoPort = mongoUriParts[1];
      }
    }
  }

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = "mongodb://";
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ":" + mongoPassword + "@";
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ":" + mongoPort + "/" + mongoDatabase;
    mongoURL += mongoHost + ":" + mongoPort + "/" + mongoDatabase;
  }
}

// Connecting to DB
mongoose.connect(mongoURL);
mongoose.Promise = Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//GET otsikko
router.get("/", (req, res) => {
  res.render("index", { title: "Tic Tac Toe", header: "Tic Tac Toe" });
});

//GET pelilauta
router.get("/", boardController.index);

app.listen(8080);
