import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    image:{
        type:String,
        required:true
    },

    craetedAt:{
        type:Date,
        default:Date.now
    }
})

articleSchema.plugin(mongoosePaginate)

// module.exports = mongoose.model("News", newsSchema)
const article = mongoose.model("article", articleSchema);
export default article