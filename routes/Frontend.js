import express from "express"
const router = express.Router();
import frontendController from "../Controllers/frontendController.js";


router.get("/", frontendController.index);
router.get("/category/:name", frontendController.articlesByCategory);
router.get("/single/:id", frontendController.singleArticle);
router.get("/search", frontendController.search);
router.get("/author/:name", frontendController.author);
router.post("/single/:id", frontendController.addComment);

export default router;
