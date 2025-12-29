import mongoose from "mongoose"
import slugify from "slugify"

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
         unique:true
    },

    description:{
        type:String
    },

    slug:{
        type:String,
        required:true,
        unique:true
    },

    timestamps:{
        type:Date,
        default:Date.now,
        required:true
    },
})

categorySchema.pre('save', function(next){
    this.slug = slugify(this.name, {lower:true});
    next();
})


module.exports = mongoose.model("category", categorySchema)