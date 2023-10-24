const express = require("express");

const router = express.Router();

const postControllers = require("../controllers/postControllers");
const validate = require("../middlewares/validate");

router.get("/", postControllers.browse);
router.post("/", validate.newPost, postControllers.add);
router.put("/:id", validate.updatePost, postControllers.edit);
router.delete("/:id", postControllers.destroy);

module.exports = router;
