import categoryModel from '../Models/category.js';
import createError from '../utilities/error-message.js';
import {validationResult} from "express-validator"
// functions for all the category routes
const allcategory = async (req, res) => {
    const categories = await categoryModel.find();
    res.render('admin/categories', {categories, role: req.role});
}


const addCategoryPage = async (req, res) => {
    res.render('admin/categories/create', {role: req.role, errors:0})
}


const addCategory = async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
           return  res.render('admin/categories/create',{
            role: req.role,
            errors: errors.array()
        });
    }
    try{
        await categoryModel.create(req.body)
        res.redirect('/admin/category')
    } catch(error){
       next(error)
    }
}





const updateCategoryPage = async (req, res, next) => {
    const id =  req.params.id;
 try{
   const category  = await categoryModel.findById(id);
   if(!category){
    return next(createError("category Not Found", 404))
   }
   res.render('admin/categories/update', {category, role: req.role, errors: 0})
    }catch(error){
        //  res.status(400).send(error)
        next(error)
    }
   
}

const updateCategory = async (req, res, next) => {
   const id = req.params.id;
   
   const errors = validationResult(req);
        if(!errors.isEmpty()){
           const category  = await categoryModel.findById(id);
           return  res.render('admin/categories/update',{
            category,
            role: req.role,
            errors: errors.array()
        });
    }
   try{
       const category = await categoryModel.findByIdAndUpdate(id, req.body)
       if(!category){
                return next(createError("category Not Found", 404))
       }
       res.redirect('/admin/category')
   }catch(error){
    //  res.status(400).send(error)
    next(error)
   }
} 


const deleteCategory = async (req, res, next) => {
    const id = req.params.id;
    try{
        const category = await categoryModel.findByIdAndDelete(id)
        if(!category){
            return next(createError("category Not Found", 404))
        }        
        res.json({success:true})
    }catch(error){
        // res.status(400).send(error)
        next(error)
    }
}



export default {
    allcategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
}