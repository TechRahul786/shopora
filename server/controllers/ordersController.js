import Orders from "../models/orders.js"
import Product from "../models/product.js"

export const getOrders = async (req, res) => {
  try {
    const orders = await Orders.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
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