const { Router } = require("express");
const {
  getAllAdmin,
  addAdmin,
  getAdminsById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAdminToken,
  adminActivate,
} = require("../controllers/admin.controller");

const adminPlice = require("../middleware/admin_police")

const router = Router();

router.get("/",adminPlice, getAllAdmin);
router.post("/", addAdmin);
router.get("/:id", getAdminsById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh", refreshAdminToken);
router.get("/activate/:link", adminActivate);

module.exports = router;
