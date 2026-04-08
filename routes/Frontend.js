import express from "express"
const router = express.Router();
import frontendController from "../Controllers/frontendController.js";
import LoadComonData from "../middlewares/loadCommonData.js";

// Apply the middleware to all routes in this router
router.use(LoadComonData);
router.get("/", frontendController.index);
router.get("/category/:name", frontendController.articlesByCategory);
router.get("/single/:id", frontendController.singleArticle);
router.get("/search", frontendController.search);
router.get("/author/:id", frontendController.author);
router.post("/single/:id/comment", frontendController.addComment);



router.use((req, res, next) =>{
    res.status(404).render("404",{
        message:"Pagr Not Found"
    })
})

export default router;
