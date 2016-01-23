'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));


exports.read = function (req, res) {
  res.json(req.product);
};

/**
 * Create a article
 */
exports.create = function (req, res) {
  var product = new Product(req.body);
  //product.user = req.user;
  console.log(req.body);

  // make product code uppercase
  if(product.hasOwnProperty('productCode')) {
    product.productCode = product.productCode.toUpperCase();
  }

  product.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};


exports.update = function (req, res) {

  var product = req.product;

  console.log(req.body);
  for (var key in req.body) {
    if (req.body.hasOwnProperty(key)) {

      // make product code uppercase
      if(key === 'productCode') {
        req.body.productCode = req.body.productCode.toUpperCase();
      }

      product[key] = req.body[key];
    }
  }

  //console.log(product);

  //product.productName = req.body.productName;
  //product.productCode = req.body.productCode;
  //

  //console.log(product.productCode);
  //console.log(req.body);

  product.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

exports.list = function (req, res) {
  Product.find().exec(function (err, products) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(products);
    }
  });
};


/**
 * Product middleware
 */
exports.productByID = function (req, res, next, id) {
  //console.log(id);
  if (id === 'new') {
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Product is invalid'
    });
  }

  Product.findOne({_productId: id}).exec(function (err, product) {
    if (err) {
      return next(err);
    } else if (!product) {
      return res.status(404).send({
        message: 'No product with that identifier has been found'
      });
    }

    req.product = product;
    //req.product = {
    //  cheese: 'toaste'
    //};
    next();
  });

  //Article.findById(id).populate('user', 'displayName').exec(function (err, article) {
  //  if (err) {
  //    return next(err);
  //  } else if (!article) {
  //    return res.status(404).send({
  //      message: 'No article with that identifier has been found'
  //    });
  //  }
  //  req.article = article;
  //  next();
  //});
};
