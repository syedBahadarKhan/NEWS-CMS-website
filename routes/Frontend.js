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
router.get("/testing", frontendController.testing)


//404 error handling
router.use((req, res, next) =>{
    res.status(404).render("404",{
        message:"Page Not Found"
    })
})


//500 error handling
router.use((err, req, res, next) =>{
    console.error(err.stack);
    const status = err.status || 500;

    res.status(status).render("error", {
        message: err.message || 'Something went wrong',
        status
    })
})



export default router;
