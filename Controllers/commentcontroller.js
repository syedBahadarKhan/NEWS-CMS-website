import commentModel from '../Models/comment.js';
//function for all the comment routes
const allComments = async (req, res) => {
    res.render('admin/comments')
}

export default {
    allComments
}