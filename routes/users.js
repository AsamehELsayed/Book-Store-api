const express = require("express");
const router = express.Router();
const { verifyTokenAuth, verifyAdmin } = require("../middlewares/verifyToken");
const {
  updateUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/userController");
router.route("/").get(verifyAdmin, getUsers);
router
  .route("/:id")
  .put(verifyTokenAuth, updateUser)
  .get(verifyTokenAuth, getUser)
  .delete(verifyTokenAuth, deleteUser);

module.exports = router;
