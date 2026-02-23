import mongoose from "mongoose"
const settingSchema = new mongoose.Schema({
    website_title: {
        type:String,
        required:true
    },
    website_logo: {
        type:String,
       
    },
    footer_description: {
        type:String,
        required:true
    }
})

const setting = mongoose.model("Setting", settingSchema)
export default setting