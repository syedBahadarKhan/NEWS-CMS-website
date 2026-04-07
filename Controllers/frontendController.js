import mongoose from 'mongoose';

//Im importing the models here which is inside the Models folder

import categoryModel from '../Models/category.js';
import articleModel from '../Models/article.js';
import commentModel from '../Models/comment.js';
import userModel from '../Models/user.js';
import settingModel from '../Models/setting.js';
import paginate from "../utilities/paginate.js";



//Functions for all the routes
const index = async (req, res) => {
    const paginatedArticles = await paginate(articleModel, {}, 
                                            req.query, {
                                            populate:[
                                               {path: 'category', select: 'name slug'},
                                               {path: 'author', select: 'fullname'}
                                            ],    
                                            sort:"-createdAt"})

                                
    //  res.json({paginatedArticles})
        res.render('index', {paginatedArticles, query:req.query});
}

const articlesByCategory = async (req, res) => {
    const category = await categoryModel.findOne({slug: req.params.name});
    if (!category){
     return res.status(404).send("Category not found");

    }
    const paginatedArticles = await paginate(articleModel, {category: category._id}, 
                                            req.query, {
                                            populate:[
                                               {path: 'category', select: 'name slug'},
                                               {path: 'author', select: 'fullname'}
                                            ],    
                                            sort:"-createdAt"})
                              
    res.render('category' , {paginatedArticles, category, query:req.query});
}


const singleArticle = async (req, res) => {
       const  SingleArticles = await articleModel.findById(req.params.id)
                                     .populate('category', {'name':1, 'slug':1})
                                     .populate('author', {'fullname':1})
                                    .sort({createdAt:-1})

//Get all comments for this article
const comments = await commentModel.find({ article:req.params.id, status:'approved'})
                                          .sort('-createdAt')
    // res.json({SingleArticles, comments})                                                           
    res.render('single' , {SingleArticles, comments});
}

const search = async (req, res) => {
    const serchQuery = req.query.search
    const paginatedArticles = await paginate(articleModel, {
                                    $or:[
                                        { title: { $regex: serchQuery, $options: 'i' }},
                                        { content: { $regex: serchQuery, $options: 'i' }}

                                    ]
                                    }, 
                                        req.query, {
                                        populate:[
                                            {path: 'category', select: 'name slug'},
                                            {path: 'author', select: 'fullname'}
                                        ],    
                                        sort:"-createdAt"})
                       
    res.render('search' , {paginatedArticles,  searchQuery: serchQuery, query:req.query});
} 

const author = async (req, res) => {
    const author = await userModel.findById(req.params.id);
    if(!author){
        return res.status(500).send("author not found")

    }
     const paginatedArticles = await paginate(articleModel, {author: req.params.id}, 
                                            req.query, {
                                            populate:[
                                               {path: 'category', select: 'name slug'},
                                               {path: 'author', select: 'fullname'}
                                            ],    
                                            sort:"-createdAt"})
    
            
    res.render('author', {paginatedArticles, author, query:req.query});
}

const addComment = async (req, res) => {
    try{
    const {name, email, content} = req.body;
    const comment =  new commentModel({name, email, content, article:req.params.id})
    await comment.save();
    res.redirect(`/single/${req.params.id}`);
    }catch(error){
        console.error(error);
        res.status(500).send("An error occurred while adding the comment");
    }

}


export default  {
    index,
    articlesByCategory,
    singleArticle,
    search,
    author,
    addComment
}