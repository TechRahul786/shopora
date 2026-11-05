import Orders from "../models/orders"
import Product from "../models/product"

export const getOrders = async (req,res,next) =>{
    const {userId} = req.body

    try {
          const orders = await Orders.findById(userId)
    if(!orders){
        return res.status(400).json({
            success:false,
            message:'User not found'
        })
    }

    return res.status(200).json({
        success:true,
        message:'Order Found',
        data:orders
    })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:`Server Error. Unable to get order..${error.message}`
        })
    }

}

export const addOrders = async (req,res,next) =>{
    try {
        const {orderItems,
      shippingAddress,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,} = req.body

      if(!orderItems || orderItems.length === 0){
        return res.status(400).json({
        success: false,
        message: 'No order items provided',
      });
      }

      const order = await Orders.create( {userId:req.user._id,orderItems,
      shippingAddress,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,})

      for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock -= item.quantity;
        // Ensure stock negative na jaye
        if (product.stock < 0) product.stock = 0;
        await product.save();
      }
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'Server Error. Unable to create order.'
        })
    }
}