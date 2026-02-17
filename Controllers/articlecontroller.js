import articleModel from '../Models/article.js';


//function for all the article routes
const allarticle = async (req, res) => {
    res.render('admin/articles', {role: req.role});
}
const addArticlePage = async (req, res) => {
    res.render('admin/articles/create', {role: req.role});
}
const addArticle = async (req, res) => {}
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







