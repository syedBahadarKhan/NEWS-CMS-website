import userModel from '../Models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//functions for allt the user routes
const loginPage = async (req, res) => {
    res.render('admin/login',{
        layout:false
    });
}
const adminLogin = async (req, res) => {

}
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
    const id = req.params.id;
    try{
     const user = await userModel.findById(id);
     if(!user){
        return res.status(404).send("User not Found")
     }
     res.render('admin/users/update', {user});
    }catch(error){
        console.log(err);
        res.status(500).send("internal server error");
    }
}


// this is the post Route for updating the user
const updateUser = async (req, res) => {
    const id = req.params.id;
    const {fullname, password, role} = req.body;
    try{
        const user = await userModel.findById(id)
        if(!user){
            return res.status(404).send("User not Found")
        }
        user.fullname = fullname || user.fullname;
        if(password){
            user.password = password;
        }
        user.role = role || user.role;
        await user.save()
        res.redirect("/admin/users");
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}




const deleteUser = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await userModel.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send("user not found")
        }
        res.json({success:true});
    }catch(erroor){
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
}


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