import mongoose from 'mongoose';

//Im importing the models here which is inside the Models folder

import categoryModel from '../Models/category.js';
import articleModel from '../Models/article.js';
import commentModel from '../Models/comment.js';
import userModel from '../Models/user.js';
import settingModel from '../Models/setting.js';
import paginate from "../utilities/paginate.js";
import createError from '../utilities/error-message.js';



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

const articlesByCategory = async (req, res, next) => {
    const category = await categoryModel.findOne({slug: req.params.name});
    if (!category){
     return next(createError("Category Not Found", 404)) 

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


const singleArticle = async (req, res, next) => {
       const  SingleArticles = await articleModel.findById(req.params.id)
                                     .populate('category', {'name':1, 'slug':1})
                                     .populate('author', {'fullname':1})
                                    .sort({createdAt:-1})
       if(!SingleArticles)return next(createError("Article Not Found", 404))                             

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



// const search = async (req, res, next) => {
//     try {
//         const searchQuery = req.query.search?.trim() || "";
//         const category = req.query.category || "";
//         const page = parseInt(req.query.page) || 1;
//         const limit = 5;

//         // 🔍 Build query dynamically
//         let query = {};

//         if (searchQuery) {
//             query.$or = [
//                 { title: { $regex: searchQuery, $options: 'i' } },
//                 { content: { $regex: searchQuery, $options: 'i' } }
//             ];
//         }

//         if (category) {
//             query.category = category;
//         }

//         const total = await articleModel.countDocuments(query);

//         const articles = await articleModel.find(query)
//             .populate('category', 'name slug')
//             .populate('author', 'fullname')
//             .sort({ createdAt: -1 })
//             .skip((page - 1) * limit)
//             .limit(limit);

//         res.render("search", {
//             articles,
//             searchQuery,
//             category,
//             currentPage: page,
//             totalPages: Math.ceil(total / limit)
//         });

//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };
const author = async (req, res, next) => {
    const author = await userModel.findById(req.params.id);
    if(!author){
       return next(createError("Author Not Found", 404)) 

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

const addComment = async (req, res, next) => {
    try{
    const {name, email, content} = req.body;
    const comment =  new commentModel({name, email, content, article:req.params.id})
    await comment.save();
    res.redirect(`/single/${req.params.id}`);
    }catch(error){
        return next(createError("An error occurred while adding the comment", 500)) 
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