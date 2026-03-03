import mongoose from 'mongoose';

//Im importing the models here which is inside the Models folder

import categoryModel from '../Models/category.js';
import articleModel from '../Models/article.js';
import commentModel from '../Models/comment.js';
import userModel from '../Models/user.js';



//Functions for all the routes
const index = async (req, res) => {
    const  articles = await articleModel.find()
                                     .populate('category', {'name':1, 'slug':1})
                                     .populate('author', {'fullname':1})
                                    .sort({createdAt:-1})
  
    res.render('index', {articles});
}

const articlesByCategory = async (req, res) => {
    res.render('category');
}
const singleArticle = async (req, res) => {
    res.render('single');
}
const search = async (req, res) => {
    res.render('search');
}
const author = async (req, res) => {
    res.render('author');
}
const addComment = async (req, res) => {

}


export default  {
    index,
    articlesByCategory,
    singleArticle,
    search,
    author,
    addComment
}