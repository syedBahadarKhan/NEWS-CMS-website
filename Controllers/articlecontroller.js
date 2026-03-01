import article from '../Models/article.js';
import articleModel from '../Models/article.js';
import categoryModel from '../Models/category.js';
import {validationResult} from "express-validator"
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import createError from '../utilities/error-message.js';

//function for all the article routes
const allarticle = async (req, res, next) => {
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
    //    console.log(error);
    // res.status(500).send(error.message);
    next(error)
    }
}


const addArticlePage = async (req, res) => {
    const categories = await categoryModel.find();
    res.render('admin/articles/create', {role: req.role, categories, errors: 0 });
}


const addArticle = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty() ){
       const categories = await categoryModel.find();
       return  res.render('admin/articles/create',{
        role: req.role,
        categories,
        errors: errors.array()
    });
    }

    const { title, content, category } = req.body;
    try{
    const article = new articleModel({
        title,
        content,
        category,
        author: req.id,
        image:req.file.filename,
        role:req.role
    })
    await article.save();
    res.redirect("/admin/article")
    }catch(error){
        // console.log(error);
        // res.status(500).send("Server Error")
        next(error)
    }
}
const editArticlePage = async (req, res, next) => {
    const id = req.params.id;
    try{
       const article = await articleModel.findById(id)
                                              .populate("category", "name")
                                                .populate("author", "fullname");
       if(!article){
        // return res.status(404).send("Article not found");
        //  const error = new Error("Article Not Found");
        //     error.status = 404;
        //     return next(error)
            return next(createError("Article Not Found", 404))
       }

        if(req.role === "author"){
            if(req.id != article.author._id){
                return next(createError("Unauthorized Access", 403))
            }
        }

       const categories = await categoryModel.find();
       res.render('admin/articles/update', {role: req.role, article, categories, errors:0});
    }catch(error){
        // console.log(error)
        // res.status(500).send("Server Error")
        next(error)

    }
}

const updateArticle = async (req, res, next) => {
    const id = req.params.id;
     
    const errors = validationResult(req);
    if (!errors.isEmpty() ){
       const categories = await categoryModel.find();
       return  res.render('admin/articles/update',{
        article:req.body,
        role: req.role,
        categories,
        errors: errors.array()
    });
    }
    
    try{
        const {title, content, category} = req.body;
        const article = await articleModel.findById(id);
        if(!article){
           return next(createError("Article Not Found", 404))
           
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
                return next(createError("Unauthorized Access", 403))
            }
        }

        await article.save();
        res.redirect("/admin/article", {role:req.role})
    }catch(error){
        // console.log(error);
        // res.status(500).send(error.message)
        next(error)
    }
}



const deleteArticle = async (req, res, next) => {
    const id = req.params.id;
    try{
        const article = await articleModel.findById(id);
        if(!article){
            return next(createError("Article Not Found", 404));
        }
         if(req.role === "author"){
            if(req.id != article.author._id){
                return next(createError("Unauthorized Access", 403))
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
    //    console.log(error)
    //    res.status(500).send("Server Error")
    next(error)
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







