import commentModel from '../Models/comment.js';
import createError from '../utilities/error-message.js';
import articleModel from '../Models/article.js'
//function for all the comment routes
const allComments = async (req, res, next) => {
    try{
     let comments;
     if(req.role === "admin"){
      comments = await commentModel.find()
                                        .populate('article', 'title')
                                        .sort({createdAt : -1})
     }else{
        const news = await articleModel.find({ author: req.id });
        const articlesId = news.map(news => news._id )
        comments = await commentModel.find({ article: { $in: articlesId} })
                                        .populate('article', 'title')
                                         .sort({createdAt : -1})
     }
    // res.json(comments)
    res.render("admin/comments", {comments, role:req.role})
    }catch (error){
     console.log("REAL ERROR 👉", error)
     next(createError("Error while fetching comments", 500))
    }
}


const updateCommentStatus = async (req, res, next) =>{
    try{
       const comment = await commentModel.findByIdAndUpdate(req.params.id, {status: req.body.status}, {new: true})
        if(!comment){
            return next(createError("comment not found", 404));
        }
        // res.redirect('/admin/comments')
        res.json({success: true});
    } catch (error) {
         next(createError("Error updating comment status", 500)); 
    }  
}


const deleteComment = async (req, res, next) =>{
try{
  const comment = await commentModel.findByIdAndDelete(req.params.id)
  if(!comment){
    return next(createError("comment not found", 404))
  }
  res.json({success: true})
}catch(error){
   next(createError("Error deleting comment", 500));
} 
} 


export default {
    allComments,
    updateCommentStatus,
    deleteComment
}