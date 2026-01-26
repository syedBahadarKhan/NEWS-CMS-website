import mongoose from 'mongoose';

//Im importing the models here which is inside the Models folder

import categoryModel from '../Models/category.js';
import newsModel from '../Models/News.js';
import commentModel from '../Models/comment.js';
import userModel from '../Models/user.js';



//Functions for all the routes
const index = async (req, res) => {
    res.render('index');
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


module.exports = {
    index,
    articlesByCategory,
    singleArticle,
    search,
    author,
    addComment
}