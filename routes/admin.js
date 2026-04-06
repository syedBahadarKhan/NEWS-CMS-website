import express from "express"
const router = express.Router();
import articlecontroller from "../Controllers/articlecontroller.js";
import categorycontroller from "../controllers/categorycontroller.js";
import commentcontroller from "../controllers/commentcontroller.js";
import usercontroller from "../controllers/usercontroller.js";
import isLoggedIn from "../middlewares/isLoggedin.js";
import isAdmin from "../middlewares/isAdmin.js";
import upload from "../middlewares/multer.js";
// import { loginValidation,  } from "../middlewares/validator.js";
import isValid from "../middlewares/validator.js";


//Admin Login Route
router.get("/", usercontroller.loginPage);
router.post('/index', isValid.loginValidation, usercontroller.adminLogin);
router.get("/logout", usercontroller.logout)
router.get("/dashboard", isLoggedIn, usercontroller.dashboard)
router.get("/settings", isLoggedIn, isAdmin, usercontroller.settings)
router.post("/save-setting",  isLoggedIn, isAdmin, upload.single("website_logo"),  usercontroller.saveSettings)


// user crud routes
router.get("/users", isLoggedIn, isAdmin, usercontroller.allusers);
router.get("/add-user", isLoggedIn, isAdmin, usercontroller.addUserPage);
router.post("/add-user", isLoggedIn, isAdmin, isValid.userValidation, usercontroller.addUser);
router.get("/update-user/:id", isLoggedIn, isAdmin, usercontroller.editUserPage);
router.post("/update-user/:id", isLoggedIn, isAdmin, isValid.userupdateValidation, usercontroller.updateUser);
router.delete("/delete-user/:id", isLoggedIn, isAdmin, usercontroller.deleteUser);


//Category CRUD routes
router.get("/category", isLoggedIn, isAdmin, categorycontroller.allcategory);
router.get("/add-category", isLoggedIn, isAdmin, categorycontroller.addCategoryPage);
router.post("/add-category", isLoggedIn, isAdmin, isValid.categoryValidation, categorycontroller.addCategory);
// router.get("/edit-category/:id", categorycontroller.editCategoryPage);
router.get('/update-category/:id', isLoggedIn, isAdmin, categorycontroller.updateCategoryPage);
router.post("/update-category/:id", isLoggedIn, isAdmin, isValid.categoryValidation, categorycontroller.updateCategory);
router.delete("/delete-category/:id", isLoggedIn, isAdmin, categorycontroller.deleteCategory);

// Article CRUD routes
router.get("/article", isLoggedIn,  articlecontroller.allarticle);
router.get("/add-article", isLoggedIn, articlecontroller.addArticlePage);
router.post("/add-article", isLoggedIn, upload.single("image"), isValid.articleValidation, articlecontroller.addArticle);
router.get("/update-article/:id", isLoggedIn,  articlecontroller.editArticlePage);
router.post("/update-article/:id", isLoggedIn, upload.single("image"), isValid.articleValidation, articlecontroller.updateArticle);
router.delete("/delete-article/:id", isLoggedIn,  articlecontroller.deleteArticle);


//Comments Rute
router.get("/comments", isLoggedIn, commentcontroller.allComments);
// router.put("/update-comment-status/:id", isLoggedIn, commentcontroller.updateCommentStatus);
// router.delete("/delete-comment/:id", isLoggedIn, commentcontroller.deleteComment);


// 404 Middleware
router.use(isLoggedIn, (req, res, next) =>{
    res.status(404).render('admin/404', {
        message:"Page not Found", 
        role: req.role
    })
})


//500 error handler middleware
router.use(isLoggedIn, (err, req, res, next) =>{
    console.error(err.stack);
    const status = err.status || 500;
    let view;
   switch (status) {
    case 401:
        view = "admin/401";
        break;
    case 404:
        view = "admin/404";
        break;
    case 500:
        view = "admin/500";
        break;
    default:
        view = "admin/500";        
   }
    res.status(500).render(view, {
        message: err.message || "Internal Server Error",
        role: req.role
    })
})


// router.use(isLoggedIn, (err, req, res, next) =>{
//     console.error(err.stack);
//     res.status(500).render("admin/505", {
//         message: err.message || "Internal Server Error",
//         role: req.role
//     })
// })


export default router;
