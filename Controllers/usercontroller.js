import userModel from '../Models/user.js';


//functions for allt the user routes
const loginPage = async (req, res) => {
    res.render('admin/login',{
        layout:false
    });
}
const adminLogin = async (req, res) => {}
const logout = async (req, res) => {}

import Post from '../Models/News.js';
import Category from '../Models/category.js';
import User from '../Models/user.js';
import Comment from '../Models/comment.js';
// import { use } from 'react';

const dashboard = async (req, res) => {
    res.render('admin/Dashboard');
};




const allusers = async (req, res) => {
     const users = await userModel.find();
    res.render('admin/users', {users});
}

const addUserPage = async (req, res) => {
    res.render('admin/users/create');
}
const addUser = async (req, res) => {
    await userModel.create(req.body)
    res.redirect('/admin/users');
}
const settings = async (req, res) =>{
    res.render('admin/setting');
}

const editUserPage = async (req, res) => {
    res.render('admin/users/update');
}
const updateUser = async (req, res) => {}
const deleteUser = async (req, res) => {}


export default {
    loginPage,
    adminLogin,
    logout,
    dashboard,
    allusers,
    addUserPage,
    addUser,
    editUserPage,
    updateUser,
    deleteUser,
    settings
}