const { Router } = require("express");
const {
  getAllUser,
  addUser,
  getUsersById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  refreshUserToken,
  userActivate,
} = require("../controllers/user.controller");

const userPlice = require("../middleware/author_police");

const router = Router();

router.get("/", userPlice, getAllUser);
router.post("/", addUser);
router.get("/:id", getUsersById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshUserToken);
router.get("/activate/:link", userActivate);

module.exports = router;
