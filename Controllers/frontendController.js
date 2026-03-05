import mongoose from 'mongoose';

//Im importing the models here which is inside the Models folder

import categoryModel from '../Models/category.js';
import articleModel from '../Models/article.js';
import commentModel from '../Models/comment.js';
import userModel from '../Models/user.js';
import settingModel from '../Models/setting.js';



//Functions for all the routes
const index = async (req, res) => {
    const  articles = await articleModel.find()
                                     .populate('category', {'name':1, 'slug':1})
                                     .populate('author', {'fullname':1})
                                    .sort({createdAt:-1})
                                
    //  res.json({articles, categories})
        res.render('index', {articles});
}

const articlesByCategory = async (req, res) => {
    const category = await categoryModel.findOne({slug: req.params.name});
    if (!category){
     return res.status(404).send("Category not found");
    }
                              
    res.render('category' , {articles, category});
}


const singleArticle = async (req, res) => {
       const  SingleArticles = await articleModel.findById(req.params.id)
                                     .populate('category', {'name':1, 'slug':1})
                                     .populate('author', {'fullname':1})
                                    .sort({createdAt:-1})
                          
    res.render('single' , {SingleArticles});
}


const search = async (req, res) => {
    const serchQuery = req.query.search
    const  articles = await articleModel.find({
        $or:[
            { title: { $regex: serchQuery, $options: 'i' }},
            { content: { $regex: serchQuery, $options: 'i' }}

        ]
    })
            .populate('category', {'name':1, 'slug':1})
            .populate('author', {'fullname':1})
             .sort({createdAt:-1})
                       
    res.render('search' , {articles,  searchQuery: serchQuery});
} 


const author = async (req, res) => {
    const author = await userModel.findById(req.params.id);
    if(!author){
        return res.status(500).send("author not found")
            
    res.render('author', {articles, author });
}}




const addComment = async (req, res) => {

    const  articles = await articleModel.find()
                                     .populate('category', {'name':1, 'slug':1})
                                     .populate('author', {'fullname':1})
                                    .sort({createdAt:-1})

    const categoriesInUse = await articleModel.distinct('category');
    const categories = await categoryModel.find({_id: {$in: categoriesInUse}})                                
    res.render('addComment' , {articles, categories});

}


export default  {
    index,
    articlesByCategory,
    singleArticle,
    search,
    author,
    addComment
}