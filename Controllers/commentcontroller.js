import commentModel from '../Models/comment.js';
import createError from '../utilities/error-message.js';
//function for all the comment routes
const allComments = async (req, res) => {
    try{
     const comments = await commentModel.find()
                             .populate('article', 'title')
                             .sort({createdAt : -1})
    res.json(comments)
    // res.render("admin/comments", {comments, role:req.role})
    }catch (error){
     next(createError("Error while fetching comments", 500))
    }
}


const updateCommentStatus = async (req, res) =>{
    res.render('admin/comments', {role: req.role})
}


const deletecomment = async (req, res) =>{
    res.render('admin/comments', {role: req.role})
}

export default {
    allComments
}