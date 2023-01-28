module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  proxy:true,
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('', 'https://emart-ecommerce-9m65.onrender.com')
});

