import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
   name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true,
        trim: true,
        maxlength: [50, 'Category name cannot exceed 50 characters']
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    image: {
        type: String
    }

},{timestamps:true})

const category = mongoose.model('Category',categorySchema)
export default category