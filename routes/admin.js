import express from "express"
const router = express.Router();


//Admin Login Route
router.get("/", loginPage);
router.post('index', adminLogin);
router.get("/logout", logout)


// user crud routes
router.get("/users", allusers);
router.get("/add-user", addUserPage);
router.post("/add-user", addUser);
router.get("/update-user/:id", editUserPage);
router.post("/update-user/:id", updateUser);
router.get("/delete-user/:id", deleteUser);


//Category CRUD routes
router.get("/category", allcategory);
router.get("/add-category", addCategoryPage);
router.post("/add-category", addCategory);
router.get("/update-category/:id", editCategoryPage);
router.post("/update-category/:id", updateCategory);
router.get("/delete-category/:id", deleteCategory);

// Article CRUD routes
router.get("/article", allarticle);
router.get("/add-article", addArticlePage);
router.post("/add-article", addArticle);
router.get("/update-article/:id", editArticlePage);
router.post("/update-article/:id", updateArticle);
router.get("/delete-article/:id", deleteArticle);


//Comments Rute
router.get("/comments", allComments);


module.exports = router;
