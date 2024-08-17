// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',  // This is the API path that needs to be proxied
    createProxyMiddleware({
      target: 'https://www.googleapis.com',
      changeOrigin: true,
      pathRewrite: {'^/api' : ''},
    })
  );
};
