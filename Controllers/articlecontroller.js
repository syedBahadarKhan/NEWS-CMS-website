import articleModel from '../Models/article.js';


//function for all the article routes
const allarticle = async (req, res) => {}
const addArticlePage = async (req, res) => {}
const addArticle = async (req, res) => {}
const editArticlePage = async (req, res) => {}
const updateArticle = async (req, res) => {}
const deleteArticle = async (req, res) => {}












router.get("/article", allarticle);
router.get("/add-article", addArticlePage);
router.post("/add-article", addArticle);
router.get("/update-article/:id", editArticlePage);
router.post("/update-article/:id", updateArticle);
router.get("/delete-article/:id", deleteArticle);