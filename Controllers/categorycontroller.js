import categoryModel from '../Models/category.js';

// functions for all the category routes
const allcategory = async (req, res) => {
    res.render('admin/categories')
}
const addCategoryPage = async (req, res) => {
    res.render('admin/catgories/create')
}
const addCategory = async (req, res) => {}

const updateCategoryPage = async (req, res) => {
    res.render('admin/catgories/update')
}
const updateCategory = async (req, res) => {}
const deleteCategory = async (req, res) => {}



export default {
    allcategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
}