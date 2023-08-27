const router = require('express').Router();
const mainController = require("../controllers/mainController");
const isAuth = require("../middlewares/local");

router.get("/blog/:id", isAuth, mainController.get_blog_details);
router.get("/blogs/category/:id", isAuth, mainController.get_category_blogs);
//Homepage
router.get("/", isAuth, mainController.index);

module.exports = router;