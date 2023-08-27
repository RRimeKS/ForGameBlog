const router = require("express").Router();
const authController = require("../controllers/authController");
const csrf = require("../middlewares/csrf");

router.get("/logout", authController.get_logout);

router.get("/login", csrf, authController.get_login);
router.post("/login", authController.post_login);

router.get("/register", csrf, authController.get_register);
router.post("/register", authController.post_register);

router.get("/reset-password", csrf,authController.get_resetPassword);
router.post("/reset-password", authController.post_resetPassword);

router.get("/new-password/:token", csrf,authController.get_newPassword);
router.post("/new-password/:token", authController.post_newPassword);

module.exports = router