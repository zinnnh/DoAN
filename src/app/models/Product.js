const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Product = new Schema({
  name: { type: String, required: true},
  description: {type: String},
  image: {  type:String },
  price: { type:Number},
  category: {type: String},
  slug: { type: String, slug: "name" }, 
}, {
  timestamps: true,
});

// Tạo text index cho trường 'name'
Product.index({ name: 'text' });



module.exports = mongoose.model('Product', Product); 