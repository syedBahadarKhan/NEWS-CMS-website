import articleModel from '../Models/article.js';
import categoryModel from '../Models/category.js';


//function for all the article routes
const allarticle = async (req, res) => {
    try{
        const articles = await articleModel.find()
                                                .populate("category", "name")
                                                .populate("author", "fullname");
        res.render('admin/articles', {role: req.role, articles});
    }catch(error){
       console.log(error);
    res.status(500).send(error.message);
    }
}
const addArticlePage = async (req, res) => {
    const categories = await categoryModel.find();
    res.render('admin/articles/create', {role: req.role, categories});
}
const addArticle = async (req, res) => {
    const { title, content, category } = req.body;
    try{
    const article = new articleModel({
        title,
        content,
        category,
        author: req.id,
        image:req.file.filename
    })
    await article.save();
    res.redirect("/admin/article")
    }catch(error){
        console.log(error);
        res.status(500).send("Server Error")
    }
}
const editArticlePage = async (req, res) => {
    res.render('admin/articles/update', {role: req.role});
}
const updateArticle = async (req, res) => {}
const deleteArticle = async (req, res) => {}




export default {
    allarticle,
    addArticlePage,
    addArticle,
    editArticlePage,
    updateArticle,
    deleteArticle
}







