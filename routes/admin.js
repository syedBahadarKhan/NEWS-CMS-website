import express from "express"
const router = express.Router();
import articlecontroller from "../controllers/articlecontroller.js";
import categorycontroller from "../controllers/categorycontroller.js";
import commentcontroller from "../controllers/commentcontroller.js";
import usercontroller from "../controllers/usercontroller.js";
import isLoggedIn from "../middlewares/isLoggedin.js"


//Admin Login Route
router.get("/", usercontroller.loginPage);
router.post('/index', usercontroller.adminLogin);
router.get("/logout", usercontroller.logout)
router.get("/dashboard", isLoggedIn, usercontroller.dashboard)
router.get("/settings", isLoggedIn, usercontroller.settings)


// user crud routes
router.get("/users", isLoggedIn, usercontroller.allusers);
router.get("/add-user", isLoggedIn, usercontroller.addUserPage);
router.post("/add-user", isLoggedIn, usercontroller.addUser);
router.get("/update-user/:id", isLoggedIn, usercontroller.editUserPage);
router.post("/update-user/:id", isLoggedIn, usercontroller.updateUser);
router.delete("/delete-user/:id", isLoggedIn, usercontroller.deleteUser);


//Category CRUD routes
router.get("/category", isLoggedIn, categorycontroller.allcategory);
router.get("/add-category", isLoggedIn, categorycontroller.addCategoryPage);
router.post("/add-category", isLoggedIn, categorycontroller.addCategory);
// router.get("/edit-category/:id", categorycontroller.editCategoryPage);
router.post("/update-category/:id", isLoggedIn, categorycontroller.updateCategory);
router.delete("/delete-category/:id", isLoggedIn, categorycontroller.deleteCategory);

// Article CRUD routes
router.get("/article", isLoggedIn, articlecontroller.allarticle);
router.get("/add-article", isLoggedIn, articlecontroller.addArticlePage);
router.post("/add-article", isLoggedIn, articlecontroller.addArticle);
router.get("/update-article/:id", isLoggedIn, articlecontroller.editArticlePage);
router.post("/update-article/:id", isLoggedIn, articlecontroller.updateArticle);
router.delete("/delete-article/:id", isLoggedIn, articlecontroller.deleteArticle);


//Comments Rute
router.get("/comments", isLoggedIn, commentcontroller.allComments);


export default router;
