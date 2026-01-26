import express from "express"
const router = express.Router();
import articlecontroller from "../controllers/articlecontroller.js";
import categorycontroller from "../controllers/categorycontroller.js";
import commentcontroller from "../controllers/commentcontroller.js";
import usercontroller from "../controllers/usercontroller.js";


//Admin Login Route
router.get("/", usercontroller.loginPage);
router.post('index', usercontroller.adminLogin);
router.get("/logout", usercontroller.logout)


// user crud routes
router.get("/users", usercontroller.allusers);
router.get("/add-user", usercontroller.addUserPage);
router.post("/add-user", usercontroller.addUser);
router.get("/update-user/:id", usercontroller.editUserPage);
router.post("/update-user/:id", usercontroller.updateUser);
router.get("/delete-user/:id", usercontroller.deleteUser);


//Category CRUD routes
router.get("/category", categorycontroller.allcategory);
router.get("/add-category", categorycontroller.addCategoryPage);
router.post("/add-category", categorycontroller.addCategory);
router.get("/update-category/:id", categorycontroller.editCategoryPage);
router.post("/update-category/:id", categorycontroller.updateCategory);
router.get("/delete-category/:id", categorycontroller.deleteCategory);

// Article CRUD routes
router.get("/article", articlecontroller.allarticle);
router.get("/add-article", articlecontroller.addArticlePage);
router.post("/add-article", articlecontroller.addArticle);
router.get("/update-article/:id", articlecontroller.editArticlePage);
router.post("/update-article/:id", articlecontroller.updateArticle);
router.get("/delete-article/:id", articlecontroller.deleteArticle);


//Comments Rute
router.get("/comments", commentcontroller.allComments);


module.exports = router;
