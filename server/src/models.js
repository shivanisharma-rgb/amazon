import mongoose from 'mongoose'

const { Schema, model } = mongoose

const productSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 140 },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, min: 0 },
  rating: { type: Number, default: 5, min: 0, max: 5 },
  reviews: { type: Number, default: 0, min: 0 },
  badge: { type: String, default: '' },
  color: { type: String, default: '#e9ded0' },
  image: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  inventory: { type: Number, default: 0, min: 0 },
}, { timestamps: true })

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true, maxlength: 60 },
}, { timestamps: true })

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
}, { timestamps: true })

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: { type: Number, required: true, min: 1 } }],
  shippingAddress: { name: String, street: String, city: String, postalCode: String, country: String },
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, enum: ['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Confirmed' },
  paymentMethod: { type: String, enum: ['demo'], default: 'demo' },
  paid: { type: Boolean, default: false },
}, { timestamps: true })

const reviewSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true, maxlength: 1000 },
}, { timestamps: true })
reviewSchema.index({ product: 1, user: 1 }, { unique: true })

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: { type: Number, min: 1 } }],
}, { timestamps: true })

export const Product = model('Product', productSchema)
export const Category = model('Category', categorySchema)
export const User = model('User', userSchema)
export const Order = model('Order', orderSchema)
export const Review = model('Review', reviewSchema)
export const Cart = model('Cart', cartSchema)
