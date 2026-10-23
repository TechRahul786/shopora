import Product from "../models/product.js";
import Category from "../models/category.js"
export const addProduct = async(req,res,next) =>{
    const {name,price,description,category,stock,image,ratings,numReviews} = req.body
    const product = await Product.insertOne({name,price,description,category,stock,image,ratings,numReviews})
    if(!product){
        return res.this.status(401).json({
            success:false,
            message:'Product not save'
        })
    }

    return res.status(200).json({
        success:true,
        message:product
    })
}

export const getProduct = async (req,res,next) =>{
    const products = await Product.find()
    if(!products){
        return res.status(400).json({
            success:false,
            message:"Error in fetching products.."
        })
    }

    return res.status(200).json({
        success:true,
        message:products
    })
}

export const getProductById = async (req,res,next) =>{
    const productId = req.params.id

    const product = await Product.findById(productId)
      if(!product){
        return res.status(400).json({
            success:false,
            message:"Product not found"
        })
    }

    return res.status(200).json({
        success:true,
        message:product
    })

}

export const getProductByCategory = async (req,res,next) =>{
    const {id} = req.params
    
    const category = await Category.findById(id)
    const products = await Product.find({category:category.name})

    if(!products){
        return res.status(400).json({
            success:false,
            message:"Product not found"
        })
    }

     return res.status(200).json({
        success:true,
        message:products
    })
}