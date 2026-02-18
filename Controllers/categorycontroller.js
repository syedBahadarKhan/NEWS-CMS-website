import categoryModel from '../Models/category.js';

// functions for all the category routes
const allcategory = async (req, res) => {
    const categories = await categoryModel.find();
    res.render('admin/categories', {categories, role: req.role});
}


const addCategoryPage = async (req, res) => {
    res.render('admin/categories/create', {role: req.role})
}


const addCategory = async (req, res) => {
    console.log("BODY:", req.body);
    try{
        await categoryModel.create(req.body)
        res.redirect('/admin/category')
    } catch(error){
        res.status(400).send(error)
    }
}





const updateCategoryPage = async (req, res) => {
    const id =  req.params.id;
 try{
   const category  = await categoryModel.findById(id);
   if(!category){
    return res.status(404).send("category not found")
   }
   res.render('admin/categories/update', {category, role: req.role})
    }catch(error){
         res.status(400).send(error)
    }
   
}

const updateCategory = async (req, res) => {
   const id = req.params.id;
   try{
       const category = await categoryModel.findByIdAndUpdate(id, req.body)
       if(!category){
        return res.status(404).send("category not found")
       }
       res.redirect('/admin/category')
   }catch(error){
     res.status(400).send(error)
   }
} 


const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try{
        const category = await categoryModel.findByIdAndDelete(id)
        if(!category){
            return res.status(404).send("category not found")
        }        
        res.json({success:true})
    }catch(error){
        res.status(400).send(error)
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