import mongoose from 'mongoose';

//Im importing the models here which is inside the Models folder

import categoryModel from '../Models/category.js';
import articleModel from '../Models/article.js';
import commentModel from '../Models/comment.js';
import userModel from '../Models/user.js';



//Functions for all the routes
const index = async (req, res) => {}
const articlesByCategory = async (req, res) => {}
const singleArticle = async (req, res) => {}
const search = async (req, res) => {}
const author = async (req, res) => {}
const addComment = async (req, res) => {}


module.exports = {
    index,
    articlesByCategory,
    singleArticle,
    search,
    author,
    addComment
}