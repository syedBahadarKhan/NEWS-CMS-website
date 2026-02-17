import userModel from '../Models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Post from '../Models/News.js';
import Category from '../Models/category.js';
import Comment from '../Models/comment.js';

dotenv.config();

//functions for allt the user routes

// Login function
const loginPage = async (req, res) => {
    res.render('admin/login',{
        layout:false
    });
}
const adminLogin = async (req, res) => {
  const {username, password} = req.body;
  try{
    const user = await userModel.findOne({ username });
    if(!user){
        return res.status(401).send("invalid username or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).send("invalid username or password");
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