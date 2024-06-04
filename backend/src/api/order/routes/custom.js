module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/checkout',
        handler: 'custom.exampleAction',
      },
      {
        method: 'POST',
        path: '/webhook',
        handler: 'custom.stripeWebhook',
      }
    ]
  }