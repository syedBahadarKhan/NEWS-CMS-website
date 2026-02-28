import userModel from '../Models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {validationResult} from "express-validator"
import dotenv from 'dotenv';
import Post from '../Models/News.js';
import articleModel from "../Models/article.js"
import CategoryModel from '../Models/category.js';
import Comment from '../Models/comment.js';
import settingModel from "../Models/setting.js"
import createError from '../utilities/error-message.js';

dotenv.config();

//functions for allt the user routes

// Login function
const loginPage = async (req, res) => {
    res.render('admin/login',{
        layout:false,
        errors: 0
    });
}
const adminLogin = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // return res.status(400).json({errors: errors.array() })
       return  res.render('admin/login',{
        layout:false,
        errors: errors.array()
    });
    }


  const {username, password} = req.body;
  try{
    const user = await userModel.findOne({ username });
    if(!user){
       return next(createError("invalid username or password", 401))
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return next(createError("invalid username or password", 401));
    }
    const jwtData = {id:user._id, fullname:user.fullname, role:user.role};
    const token = jwt.sign(jwtData, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.cookie("token", token, {httpOnly:true, maxAge: 60 * 60 * 1000 })
    res.redirect('/admin/dashboard')
  }
  catch(error){
    console.error(error);
    res.status(500).send("Internal Server Error")
  }
}

//Admin Logout function
const logout = async (req, res) => {
       res.clearCookie("token");
         res.redirect('/admin');
}


// import { use } from 'react';

const dashboard = async (req, res, next) => {
    try{
        let articleCount;
        if(req.role==="author"){
             articleCount = await articleModel.countDocuments({author: req.id});
        }else{
             articleCount = await articleModel.countDocuments();
        }

        const categoryCount = await CategoryModel.countDocuments()
        const userCount = await userModel.countDocuments()
        res.render('admin/Dashboard',
             {role: req.role,
              fullname : req.fullname,
              articleCount,
              categoryCount,
              userCount
             });
    }catch(error){
        // console.log(error)
        // res.status(500).send("Internal server Error")
        next(error)
    }

};




const allusers = async (req, res) => {
     const users = await userModel.find();
    res.render('admin/users', {users, role: req.role});
}

const addUserPage = async (req, res) => {
    res.render('admin/users/create', {role: req.role});
}
const addUser = async (req, res) => {
    await userModel.create(req.body)
    res.redirect('/admin/users');
}
const settings = async (req, res, next) =>{
    try{
     const settings = await settingModel.findOne()
     res.render('admin/setting', {role: req.role, settings});
    }catch(error){
    //    console.error(error)
    //    res.status(500).send("internal server error")
    next(error)
    }
    
}


const saveSettings = async(req, res, next) =>{
    const {website_title, footer_description} = req.body;
    const website_logo = req.file ? req.file.filename : null;

    try{
        const settings = await settingModel.findOneAndUpdate(
            {},
            {website_title, website_logo, footer_description},
            {new: true, upsert : true }
        );
        res.redirect('/admin/settings')
    } catch(error){
        // console.error(error)
        // res.status(500).send("internal Server Error")
        next(error)
    }
}

const editUserPage = async (req, res, next) => {
    const id = req.params.id;
    try{
     const user = await userModel.findById(id);
     if(!user){
        // return res.status(404).send("User not Found")
         return next(createError("User Not Found", 404))
     }
     res.render('admin/users/update', {user, role: req.role});
    }catch(error){
        // console.log(err);
        // res.status(500).send("internal server error");
        next(error)
    }
}


// this is the post Route for updating the user
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const {fullname, password, role} = req.body;
    try{
        const user = await userModel.findById(id)
        if(!user){
            // return res.status(404).send("User not Found")
                    return next(createError("User Not Found", 404))
        }
        user.fullname = fullname || user.fullname;
        if(password){
            user.password = password;
        }
        user.role = role || user.role;
        await user.save()
        res.redirect("/admin/users", {role: req.role});
    }catch(error){
        // console.error(error);
        // res.status(500).send("Internal Server Error");
        next(error)
    }
}




const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try{
        const user = await userModel.findByIdAndDelete(id);
        if(!user){
            // return res.status(404).send("user not found")
                    return next(createError("User Not Found", 404))
        }
        res.json({success:true});
    }catch(error){
    next(error)
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
    settings,
    saveSettings
}