var Board = require("../models/gameboard");

const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

//board stuff here
exports.index = function (req, res, next) {
  Board.find({}).exec(function (err, board_info) {
    if (err) {
      return next(err);
    }
    // Successful, so render
    res.render("board", { title: "Tic Tac Toe", board: board_info });
  });
};

// Handle book create on POST.
/*
exports.create = function (req, res, next) {
  sanitizeBody("*").trim().escape();

  // Create a post object
  // Improve: Use promises with .then()
  var post = new Post({ content: req.body.content, author: req.body.author });

  post.save(function (err) {
    if (err) {
      return next(err);
    }
    // Successful - redirect to new book record.
    res.redirect("/posts");
  });
};
*/
