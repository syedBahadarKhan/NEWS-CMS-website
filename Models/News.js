import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const newsSchema = new mongoose.Schema({
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
        ref:"category",
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
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

newsSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("News", newsSchema)