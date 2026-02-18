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

categorySchema.pre('validate',  async function(){
    this.slug = slugify(this.name, {lower:true});
})


// module.exports = mongoose.model("category", categorySchema)
const Category = mongoose.model("Category", categorySchema);
export default Category;