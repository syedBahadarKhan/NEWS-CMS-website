import express from "express"
const router = express.Router();
import articlecontroller from "../controllers/articlecontroller.js";
import categorycontroller from "../controllers/categorycontroller.js";
import commentcontroller from "../controllers/commentcontroller.js";
import usercontroller from "../controllers/usercontroller.js";
import isLoggedIn from "../middlewares/isLoggedin.js";
import isAdmin from "../middlewares/isAdmin.js";
import upload from "../middlewares/multer.js";


//Admin Login Route
router.get("/", usercontroller.loginPage);
router.post('/index', usercontroller.adminLogin);
router.get("/logout", usercontroller.logout)
router.get("/dashboard", isLoggedIn, usercontroller.dashboard)
router.get("/settings", isLoggedIn, isAdmin, usercontroller.settings)


// user crud routes
router.get("/users", isLoggedIn, isAdmin, usercontroller.allusers);
router.get("/add-user", isLoggedIn, isAdmin, usercontroller.addUserPage);
router.post("/add-user", isLoggedIn, isAdmin, usercontroller.addUser);
router.get("/update-user/:id", isLoggedIn, isAdmin, usercontroller.editUserPage);
router.post("/update-user/:id", isLoggedIn, isAdmin, usercontroller.updateUser);
router.delete("/delete-user/:id", isLoggedIn, isAdmin, usercontroller.deleteUser);


//Category CRUD routes
router.get("/category", isLoggedIn, isAdmin, categorycontroller.allcategory);
router.get("/add-category", isLoggedIn, isAdmin, categorycontroller.addCategoryPage);
router.post("/add-category", isLoggedIn, isAdmin, categorycontroller.addCategory);
// router.get("/edit-category/:id", categorycontroller.editCategoryPage);
router.get('/update-category/:id', isLoggedIn, isAdmin, categorycontroller.updateCategoryPage);
router.post("/update-category/:id", isLoggedIn, isAdmin, categorycontroller.updateCategory);
router.delete("/delete-category/:id", isLoggedIn, isAdmin, categorycontroller.deleteCategory);

// Article CRUD routes
router.get("/article", isLoggedIn,  articlecontroller.allarticle);
router.get("/add-article", isLoggedIn, articlecontroller.addArticlePage);
router.post("/add-article", isLoggedIn, upload.single("image"), articlecontroller.addArticle);
router.get("/update-article/:id", isLoggedIn,  articlecontroller.editArticlePage);
router.post("/update-article/:id", isLoggedIn, upload.single("image"), articlecontroller.updateArticle);
router.delete("/delete-article/:id", isLoggedIn,  articlecontroller.deleteArticle);


//Comments Rute
router.get("/comments", isLoggedIn, commentcontroller.allComments);


export default router;
