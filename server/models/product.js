import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    image: {
        type: String,
        required: [true, 'Product image URL is required']
    },
    ratings: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot exceed 5']
    },
    numReviews: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;