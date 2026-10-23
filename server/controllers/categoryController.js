import Category from "../models/category.js"

export const getCategory = async (req,res,next) =>{
    const categories = await Category.find()
    if(!categories){
        return res.status(401).json({
            success:false,
            message:'Category not found'
        })
    }

    return res.status(200).json({
        success:true,
        message:categories
    })
}

export const addCategory = async (req,res,next) =>{
    const {name,description,image} = req.body
    const category = await Category.insertOne({name,description,image})
    if(!category){
        return res.status(401).json({
            success:false,
            message:'Category not Added'
        })

    }

    return res.status(200).json({
        success:true,
        message:'Category added Succesfuly.'
    })
}