import express from "express"
const router = express.Router();
import frontendContrller from "../Controllers/frontendContrller.js";


router.get("/", frontendContrller.index);
router.get("/category/:name", frontendContrller.articlesByCategory);
router.get("/single/:id", frontendContrller.singleArticle);
router.get("/search", frontendContrller.search);
router.get("/author/:name", frontendContrller.author);
router.post("/single/:id", frontendContrller.addComment);

module.exports = router;
