const express = require("express");
const router = express.Router();

const authRoutes = require("./controllers/auth.controller");
const usersRoutes = require("./controllers/users.controller");
const postsRoutes = require("./controllers/posts.controller");
const commentRoutes = require("./controllers/comment.controller");

router.use("/auth", authRoutes)
router.use("/users", usersRoutes);
router.use("/posts", postsRoutes);
router.use(commentRoutes);

module.exports = router;