"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async checkoutAction(ctx) {
    try {
      const cartItems = ctx.request.body.items;
      const items = await strapi.entityService.findMany(
        "api::product.product",
        {
          fields: ["title", "price", "id"],
          filters: {
            id: {
              $in: cartItems.map((item) => item.id),
            },
          },
          populate: {
            image: {
              fields: ["url"],
            },
          },
        }
      );

      const lineItems = items.map((item, i) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.title,
              images: [item.image.url],
            },
            unit_amount: Number(item.price) * 100,
          },
          quantity: Number(cartItems[i].qty),
        };
      });

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["IN", "US"],
        },
        metadata: {
          info: JSON.stringify({ userId: ctx.state.user.id, items: cartItems }),
        },
        success_url: `http://localhost:5173/order/status?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:5173/order/status?session_id={CHECKOUT_SESSION_ID}`,
      });

      ctx.body = { url: session.url };
    } catch (err) {
      console.log(err);
      ctx.body = err;
    }
  },

  async stripeWebhook(ctx) {
    if (ctx.request.body.type === "checkout.session.completed") {
      const {
        metadata: { info },
        shipping_details: { address },
        payment_intent,
      } = ctx.request.body.data.object;

      const products = await strapi.entityService.findMany(
        "api::product.product",
        {
          fields: ["title", "price", "id"],
          filters: {
            id: {
              $in: JSON.parse(info).items.map((item) => item.id),
            },
          },
          populate: {
            image: {
              fields: ["url"],
            },
          },
        }
      );

      const orders = products.map((item, i) => {
        return {
          paymentId: payment_intent,
          totalAmount: item.price,
          status: "processing",
          product: item,
          address,
          userId: JSON.parse(info).userId,
          qty: Number(JSON.parse(info).items[i].qty),
        };
      });

      orders.forEach(async (order) => {
        await strapi.entityService.create("api::order.order", {
          data: order,
          populate: {
            userId: true,
          },
        });
      });
    }

    ctx.body = "Order placed";
  },

  async checkPaymentStatus(ctx) {
    if (!ctx.query.session_id) {
      return (ctx.status = 404);
    }
    const session = await stripe.checkout.sessions.retrieve(
      ctx.query.session_id
    );
    if (session.status === "open") {
      await stripe.checkout.sessions.expire(ctx.query.session_id);
    }

    ctx.body = { status: session.payment_status };
  },

  async getOrders(ctx) {
    const entry = await strapi.entityService.findMany("api::order.order", {
      filters: {
        userId: ctx.state.user.id,
      },
      sort: {
        createdAt: "desc",
      },
    });
    ctx.send(entry);
  },
}));
