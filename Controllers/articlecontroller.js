import article from '../Models/article.js';
import articleModel from '../Models/article.js';
import categoryModel from '../Models/category.js';
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//function for all the article routes
const allarticle = async (req, res) => {
    try{
        let articles;
        if(req.role === "admin"){
         articles = await articleModel.find()
                                                .populate("category", "name")
                                                .populate("author", "fullname");
        }else{
         articles = await articleModel.find({author: req.id})
                                                .populate("category", "name")
                                                .populate("author", "fullname");   
        }                                       
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
    const id = req.params.id;
    try{
       const article = await articleModel.findById(id)
                                              .populate("category", "name")
                                                .populate("author", "fullname");
       if(!article){
        return res.status(404).send("Article not found");
       }

        if(req.role === "author"){
            if(req.id != article.author._id){
                return res.status(403).send("Unauthorized Access")
            }
        }

       const categories = await categoryModel.find();
       res.render('admin/articles/update', {role: req.role, article, categories});
    }catch(error){
        console.log(error)
        res.status(500).send("Server Error")

    }
}

const updateArticle = async (req, res) => {
    const id = req.params.id;
    try{
        const {title, content, category} = req.body;
        const article = await articleModel.findById(id);
        if(!article){
            return res.status(404).send("Article not found")
        }
        article.title = title;
        article.content = content;
        article.category = category;
      if (req.file) {
                    const imagePath = path.join(__dirname, "../public/uploads", article.image);

                    if (fs.existsSync(imagePath)) {
                        await fs.promises.unlink(imagePath);
                    }

                       article.image = req.file.filename;
                }

         if(req.role === "author"){
            if(req.id != article.author._id){
                return res.status(403).send("Unauthorized Access")
            }
        }

        await article.save();
        res.redirect("/admin/article")
    }catch(error){
        console.log(error);
        res.status(500).send(error.message)
    }
}


const deleteArticle = async (req, res) => {
    const id = req.params.id;
    try{
        const article = await articleModel.findById(id);
        if(!article){
            return res.status(404).send("Article not found");
        }
         if(req.role === "author"){
            if(req.id != article.author._id){
                return res.status(403).send("Unauthorized Access")
            }
        }
          try{
            const imagePath = path.join(__dirname, "../public/uploads", article.image);
            if (fs.existsSync(imagePath)) {
                await fs.promises.unlink(imagePath);
                }
            }catch(error){
                console.log("Error deleting message", error)
            }
        
        await article.deleteOne()
        res.json({success: true})
    }catch(error){
       console.log(error)
       res.status(500).send("Server Error")
    }

}




export default {
    allarticle,
    addArticlePage,
    addArticle,
    editArticlePage,
    updateArticle,
    deleteArticle
}







