const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
const inscriptionRoutes = require("./routes/inscriptionRoutes");
const connexionRoutes = require("./routes/connexionRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const voteRoutes = require("./routes/voteRoutes");

router.use("/inscription", inscriptionRoutes);
router.use("/connexion", connexionRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/vote", voteRoutes);

// Gestionnaire d'erreurs
const { errorHandler } = require("./middlewares/errorHandler");

router.use(errorHandler);

// 404 not found
router.use("*", (req, res) => res.sendStatus(404));
/* ************************************************************************* */

module.exports = router;
