const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) =>  ({
  // Method 1: Creating an entirely custom action
  async exampleAction(ctx) {
    try {
      const cartItems = ctx.request.body.items;
      console.log(cartItems)
      const items = await strapi.entityService.findMany('api::product.product',{
        fields:['title','price'],
        filters: {
          id: {
            $in: cartItems.map(item => item.id)
          }
        },
        populate:['image']
      })

      const lineItems = items.map((item,i) => {
        return {
            price_data: {
              currency: 'inr',
              product_data: {
                name: item.title,
                images: [item.image.url]
              },
              unit_amount: Number(item.price)*100,
            },
            quantity: Number(cartItems[i].qty),
          }
      })

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:5173?success=true`,
        cancel_url: `http://localhost:5173?canceled=true`,
      });

      console.log(session);
      
      ctx.body = {url: session.url}
    } catch (err) {
      console.log(err);
      ctx.body = err;
    }
  },
  
  async stripeWebhook(ctx) {
    console.log(ctx.request.body);
    console.log('yooo');
  }
  
  }))