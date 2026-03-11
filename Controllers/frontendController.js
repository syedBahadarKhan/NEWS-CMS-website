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
        res.render('index', {paginatedArticles});
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
                          
    res.render('single' , {SingleArticles});
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