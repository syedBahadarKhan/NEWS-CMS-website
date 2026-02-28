import commentModel from '../Models/comment.js';
import createError from '../utilities/error-message.js';
//function for all the comment routes
const allComments = async (req, res) => {
    res.render('admin/comments', {role: req.role});
}

export default {
    allComments
}