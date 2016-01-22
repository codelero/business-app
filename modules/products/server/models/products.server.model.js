'use strict';

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
//
/**
 * Product Schema
 */
var ProductSchema = new Schema({
  _productId: Schema.Types.ObjectId,
  productName: {type: String},
  productCode: {type: String, unique: true},
  releaseDate: {type: Date, default: Date.now},
  description: {type: String},
  cost: {type: Number},
  price: {type: Number},
  category: {type: String},
  tags: [String],
  imageUrl: String
});

ProductSchema.pre('save', function(next) {
  //console.log(this._productId);
  if (!this._productId) {
    this._productId = new mongoose.Types.ObjectId();
  }
  next();
});////


var Product = mongoose.model('Product', ProductSchema);

function createDefaultProducts() {
  Product.find().exec(function(err, collection) {
      if (collection.length === 0) {
          Product.create({
                _productId: new mongoose.Types.ObjectId(),
                productName: 'Leaf Rake',
                productCode: 'GDN-0011',
                releaseDate: 'March 19, 2009',
                description: 'Leaf rake with 48-inch handle.',
                cost: 9.00,
                price: 19.95,
                category: 'garden',
                tags: ['leaf', 'tool'],
                imageUrl: 'http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png'
          });
          Product.create({
          _productId: new mongoose.Types.ObjectId(),
          productName: 'Hammer',
          productCode: 'TBX-0048',
          releaseDate: 'May 21, 2013',
          description: 'Curved claw steel hammer',
          cost: 1.00,
          price: 8.99,
          category: 'toolbox',
          tags: ['tool'],
          imageUrl: 'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png'
        });

      }
  });
}
//
createDefaultProducts();
//
//$scope.products = [
//  {
//    'productId': 1,
//    'productName': 'Leaf Rake',
//    'productCode': 'GDN-0011',
//    'releaseDate': 'March 19, 2009',
//    'description': 'Leaf rake with 48-inch handle.',
//    'cost': 9.00,
//    'price': 19.95,
//    'category': 'garden',
//    'tags': ['leaf', 'tool'],
//    'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png'
//  },
//  {
//    'productId': 5,
//    'productName': 'Hammer',
//    'productCode': 'TBX-0048',
//    'releaseDate': 'May 21, 2013',
//    'description': 'Curved claw steel hammer',
//    'cost': 1.00,
//    'price': 8.99,
//    'category': 'toolbox',
//    'tags': ['tool'],
//    'imageUrl': 'http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png'
//  }];
//