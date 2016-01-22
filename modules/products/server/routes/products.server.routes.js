'use strict';

var products = require('../controllers/products.server.controller.js');

module.exports = function (app) {
  app.route('/api/products')
    .get(products.list)
    .post(products.create);

  app.route('/api/products/:productId')
    .get(products.read)
    .put(products.update);

  //.put(articles.update)
  //.delete(articles.delete);

  //app.route('/api/products/edit/:productId')

  // Finish by binding the article middleware
  app.param('productId', products.productByID);
  //app.param('articleId', articles.articleByID);
};