"use strict";

module.exports = {
  routes: [
    {
      // Path defined with an URL parameter
      method: "GET",
      path: "/orders",
      handler: "order.getOrders",
    },
    {
      method: "POST",
      path: "/order/checkout",
      handler: "order.checkoutAction",
    },
    {
      method: "GET",
      path: "/order/status",
      handler: "order.checkPaymentStatus",
    },
    {
      method: "POST",
      path: "/webhook",
      handler: "order.stripeWebhook",
    },
  ],
};
