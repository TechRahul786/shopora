import { Stripe } from "stripe";

export const stripePayment = async (req, res) => {
  try {
    const { items, shippingPrice = 0 } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "No items provided for payment" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [], 
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: Number(item.quantity),
    }));

    // Optional: include shipping as a line item if shippingPrice > 0
    if (Number(shippingPrice) > 0) {
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: "Shipping Charges",
          },
          unit_amount: Math.round(Number(shippingPrice) * 100),
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${process.env.CLIENT_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/order-cancel`,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
