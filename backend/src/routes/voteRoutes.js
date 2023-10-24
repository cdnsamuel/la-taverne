const express = require("express");

const router = express.Router();

const voteControllers = require("../controllers/voteControllers");

router.post("/:postId", voteControllers.vote);

module.exports = router;
