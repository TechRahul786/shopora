import Cart from "../models/cart.js";
import Product from "../models/product.js"

export const getCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming auth middleware attaches user to req

    let cart = await Cart.findOne({ userId }).populate({
      path: "items.product",
      select: "name price image stock", // Select the fields you need
    });


    if (!cart) {
      // Return an empty cart structure if none exists yet
      return res.status(200).json({ success: true, items: [] });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add item to cart or update quantity
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;
    if (!productId || quantity < 1) {
      return res.status(400).json({ success: false, message: "Invalid product ID or quantity" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist for user, create a new one
      cart = await Cart.create({
        userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        // Product exists, update quantity
        cart.items[itemIndex].quantity += Number(quantity);
      } else {
        // Product does not exist, push new item
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    // Populate before sending response back
    // const updatedCart = await Cart.findOne({ userId }).populate({
    //   path: "items.product",
    //   select: "name price image stock",
    // });
    res.status(200).json({ success: true, message: "Cart updated", cart });
    res.status(200).json({ success: true, message: "Cart updated successfully", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update specific item quantity
// @route   PUT /api/cart
// @access  Private
export const updateCartItemQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ success: false, message: "Product ID and quantity are required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item entirely
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }

      await cart.save();
      
      const updatedCart = await Cart.findOne({ userId }).populate({
        path: "items.product",
        select: "name price image stock",
      });

      return res.status(200).json({ success: true, message: "Cart updated", cart: updatedCart });
    } else {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Filter out the item to remove
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate({
      path: "items.product",
      select: "name price image stock",
    });

    res.status(200).json({ success: true, message: "Item removed from cart", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Empty the items array
    cart.items = [];
    await cart.save();

    res.status(200).json({ 
      success: true, 
      message: "Cart cleared successfully", 
      cart 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};