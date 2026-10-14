import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { Cart, Category, Order, Product, Review, User } from './models.js'
import { authenticate, requireAdmin } from './middleware.js'

const router = Router()
const signToken = user => jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
const asyncRoute = handler => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next)

router.get('/health', (_req, res) => res.json({ status: 'ok' }))

router.post('/auth/register', asyncRoute(async (req, res) => {
  const { name, email, password } = req.body
  if (typeof name !== 'string' || name.trim().length < 2 || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ message: 'Provide a name, valid email, and password of at least 8 characters.' })
  }
  const existing = await User.findOne({ email: email.toLowerCase().trim() })
  if (existing) return res.status(409).json({ message: 'An account with this email already exists.' })
  const user = await User.create({ name: name.trim(), email, password: await bcrypt.hash(password, 12) })
  res.status(201).json({ token: signToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } })
}))

router.post('/auth/login', asyncRoute(async (req, res) => {
  const { email, password } = req.body
  if (typeof email !== 'string' || typeof password !== 'string') return res.status(400).json({ message: 'Email and password are required.' })
  const user = await User.findOne({ email: email.toLowerCase().trim() })
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Email or password is incorrect.' })
  res.json({ token: signToken(user), user: { id: user.id, name: user.name, email: user.email, role: user.role } })
}))

router.get('/auth/me', authenticate, (req, res) => res.json(req.user))
router.get('/users/me', authenticate, (req, res) => res.json(req.user))
router.patch('/users/me', authenticate, asyncRoute(async (req, res) => {
  const { name } = req.body
  if (typeof name !== 'string' || name.trim().length < 2) return res.status(400).json({ message: 'Name must be at least 2 characters.' })
  req.user.name = name.trim()
  await req.user.save()
  res.json(req.user)
}))

router.get('/products', asyncRoute(async (req, res) => {
  const filter = {}
  if (req.query.category) filter.category = req.query.category
  if (req.query.maxPrice && Number.isFinite(Number(req.query.maxPrice))) filter.price = { $lte: Number(req.query.maxPrice) }
  if (req.query.minRating && Number.isFinite(Number(req.query.minRating))) filter.rating = { $gte: Number(req.query.minRating) }
  const products = await Product.find(filter).sort(req.query.sort === 'price-low' ? { price: 1 } : req.query.sort === 'price-high' ? { price: -1 } : req.query.sort === 'newest' ? { createdAt: -1 } : req.query.sort === 'popular' ? { reviews: -1 } : { createdAt: -1 })
  res.json(products)
}))

router.get('/products/:id', asyncRoute(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid product id.' })
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found.' })
  res.json(product)
}))

router.post('/products', authenticate, requireAdmin, asyncRoute(async (req, res) => {
  const { name, category, price, image, description } = req.body
  if (typeof name !== 'string' || !name.trim() || typeof category !== 'string' || !category.trim() || !Number.isFinite(Number(price)) || Number(price) < 0 || typeof image !== 'string' || !/^photo-[\w-]+$/.test(image) || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({ message: 'Provide a valid name, department, non-negative price, Unsplash photo ID, and description.' })
  }
  if (!await Category.exists({ name: category })) return res.status(400).json({ message: 'Choose an existing department.' })
  res.status(201).json(await Product.create({ name, category, price, image, description, inventory: 0 }))
}))

router.patch('/products/:id', authenticate, requireAdmin, asyncRoute(async (req, res) => {
  const allowed = ['name', 'category', 'price', 'oldPrice', 'image', 'description', 'inventory', 'badge']
  const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)))
  if (updates.category && !await Category.exists({ name: updates.category })) return res.status(400).json({ message: 'Choose an existing department.' })
  const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
  if (!product) return res.status(404).json({ message: 'Product not found.' })
  res.json(product)
}))

router.delete('/products/:id', authenticate, requireAdmin, asyncRoute(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found.' })
  res.json({ message: 'Product removed.' })
}))

router.get('/categories', asyncRoute(async (_req, res) => {
  const stored = await Category.find().sort({ name: 1 }).select('name')
  res.json(stored.map(category => category.name))
}))
router.post('/categories', authenticate, requireAdmin, asyncRoute(async (req, res) => {
  if (typeof req.body.name !== 'string' || !req.body.name.trim() || req.body.name.trim().length > 60) return res.status(400).json({ message: 'Provide a category name up to 60 characters.' })
  res.status(201).json(await Category.create({ name: req.body.name.trim() }))
}))
router.delete('/categories/:name', authenticate, requireAdmin, asyncRoute(async (req, res) => {
  if (await Product.exists({ category: req.params.name })) return res.status(409).json({ message: 'Move or remove this department’s products before deleting the department.' })
  const category = await Category.findOneAndDelete({ name: req.params.name })
  if (!category) return res.status(404).json({ message: 'Category not found.' })
  res.json({ message: 'Category removed.' })
}))

router.get('/cart', authenticate, asyncRoute(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
  res.json(cart || { items: [] })
}))
router.put('/cart', authenticate, asyncRoute(async (req, res) => {
  if (!Array.isArray(req.body.items) || req.body.items.some(i => !mongoose.isValidObjectId(i.product) || !Number.isInteger(i.quantity) || i.quantity < 1 || i.quantity > 99)) return res.status(400).json({ message: 'Cart items must include valid products and quantities from 1 to 99.' })
  for (const item of req.body.items) if (!await Product.exists({ _id: item.product })) return res.status(400).json({ message: 'A cart item is no longer available.' })
  const cart = await Cart.findOneAndUpdate({ user: req.user.id }, { items: req.body.items }, { new: true, upsert: true, runValidators: true }).populate('items.product')
  res.json(cart)
}))

router.get('/orders', authenticate, asyncRoute(async (req, res) => {
  const ownFilter = req.user.role === 'admin' && req.query.all === 'true' ? {} : { user: req.user.id }
  res.json(await Order.find(ownFilter).populate('items.product').populate('user', 'name email').sort({ createdAt: -1 }))
}))
router.post('/orders', authenticate, asyncRoute(async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body
  if (paymentMethod !== 'demo') return res.status(400).json({ message: 'Only the explicitly labeled demo payment method is enabled.' })
  if (!Array.isArray(items) || items.length === 0 || items.some(i => !mongoose.isValidObjectId(i.product) || !Number.isInteger(i.quantity) || i.quantity < 1 || i.quantity > 99)) return res.status(400).json({ message: 'Add at least one valid item to your order.' })
  const addressFields = ['name', 'street', 'city', 'postalCode', 'country']
  if (!shippingAddress || addressFields.some(field => typeof shippingAddress[field] !== 'string' || !shippingAddress[field].trim())) return res.status(400).json({ message: 'Complete all delivery address fields.' })
  const productIds = items.map(i => i.product)
  const products = await Product.find({ _id: { $in: productIds } })
  if (products.length !== new Set(productIds.map(String)).size) return res.status(400).json({ message: 'One or more items are no longer available.' })
  const subtotal = items.reduce((sum, item) => sum + products.find(p => p.id === String(item.product)).price * item.quantity, 0)
  const order = await Order.create({ user: req.user.id, items, shippingAddress, subtotal, shipping: subtotal >= 75 ? 0 : 6.95, total: subtotal + (subtotal >= 75 ? 0 : 6.95), paymentMethod: 'demo', paid: false })
  res.status(201).json(order)
}))
router.patch('/orders/:id/status', authenticate, requireAdmin, asyncRoute(async (req, res) => {
  const allowed = ['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Choose a valid order status.' })
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true })
  if (!order) return res.status(404).json({ message: 'Order not found.' })
  res.json(order)
}))

router.get('/products/:id/reviews', asyncRoute(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid product id.' })
  res.json(await Review.find({ product: req.params.id }).populate('user', 'name').sort({ createdAt: -1 }))
}))
router.post('/products/:id/reviews', authenticate, asyncRoute(async (req, res) => {
  const { rating, comment } = req.body
  if (!mongoose.isValidObjectId(req.params.id) || !Number.isInteger(rating) || rating < 1 || rating > 5 || typeof comment !== 'string' || !comment.trim() || comment.length > 1000) return res.status(400).json({ message: 'Provide a rating from 1 to 5 and a review up to 1,000 characters.' })
  const review = await Review.findOneAndUpdate({ product: req.params.id, user: req.user.id }, { rating, comment: comment.trim() }, { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }).populate('user', 'name')
  const stats = await Review.aggregate([{ $match: { product: new mongoose.Types.ObjectId(req.params.id) } }, { $group: { _id: null, rating: { $avg: '$rating' }, reviews: { $sum: 1 } } }])
  await Product.findByIdAndUpdate(req.params.id, { rating: Math.round(stats[0].rating * 10) / 10, reviews: stats[0].reviews })
  res.status(201).json(review)
}))

router.get('/admin/stats', authenticate, requireAdmin, asyncRoute(async (_req, res) => {
  const [products, orders, sales] = await Promise.all([Product.countDocuments(), Order.countDocuments(), Order.aggregate([{ $match: { paid: true } }, { $group: { _id: null, total: { $sum: '$total' } } }])])
  res.json({ products, orders, sales: sales[0]?.total || 0 })
}))

export default router
