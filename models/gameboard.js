var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Game = new Schema({
  gamefield: { type: String },
  boardstatus: { type: String },
  playerinfo: { type: String }
});

// Export model.
module.exports = mongoose.model("Game", Game);
