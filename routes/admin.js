const router = require("express").Router();
const adminController = require("../controllers/adminController");
const imgUpload = require("../helpers/img-upload");
const csrf = require("../middlewares/csrf");
const isAdmin = require("../middlewares/isAdmin");
const isModerator = require("../middlewares/isModerator");

//delete
router.get("/blog/delete/:id", csrf, isModerator, adminController.get_blog_delete);
router.post("/blog/delete/:id", adminController.post_blog_delete);
router.get("/category/delete/:id", csrf, isAdmin, adminController.get_category_delete);
router.post("/category/delete/:id", adminController.post_category_delete);
//create
router.get("/blog/create", csrf, isModerator, adminController.get_blog_create);
router.post("/blog/create", imgUpload.upload.single("image"), adminController.post_blog_create);
router.get("/category/create", csrf, isAdmin, adminController.get_category_create);
router.post("/category/create", adminController.post_category_create);
//update
router.get("/blog/edit/:id", isModerator, csrf, adminController.get_blog_edit);
router.post("/blog/edit/:id", imgUpload.upload.single("image"), adminController.post_blog_edit);
router.get("/category/edit/:id", isAdmin, csrf, adminController.get_category_edit);
router.post("/category/edit/:id", adminController.post_category_edit);
//read
router.get("/categories", isAdmin, adminController.get_categories);
router.get("/blogs", isModerator, adminController.get_blogs);


// --===== USERS =====--

//delete
router.get("/user/delete/:id", csrf, isAdmin, adminController.get_user_delete);
router.post("/user/delete/:id", csrf, adminController.post_user_delete);
//update
router.get("/user/edit/:id", csrf, isAdmin, adminController.get_user_edit);
router.post("/user/edit/:id", adminController.post_user_edit);
//read
router.get("/users", isAdmin, adminController.get_users);

// --===== ROLE =====--
//edit
router.get("/role/edit/:id", isAdmin, csrf, adminController.get_role_edit);
router.post("/role/edit/:id", adminController.post_role_edit);
//read
router.get("/roles", isAdmin, adminController.get_role);

module.exports = router;