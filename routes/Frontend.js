import express from "express"
const router = express.Router();

router.get("/", index);
router.get("/category/:name", articlesByCategory);
router.get("/single/:id", singleArticle);
router.get("/search", search);
router.get("/author/:name", author);
router.post("/single/:id", postComment);

module.exports = router;
