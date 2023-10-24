const express = require("express");

const router = express.Router();

const commentControllers = require("../controllers/commentControllers");
const validate = require("../middlewares/validate");

router.get("/:postId", commentControllers.read);
router.post("/", validate.newComment, commentControllers.add);
router.put("/:id", validate.updateComment, commentControllers.edit);
router.delete("/:id", commentControllers.destroy);

module.exports = router;

// , validate(commentSchema)
// , validate(commentUpdateSchema)
