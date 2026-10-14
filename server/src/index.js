import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import router from './routes.js'
import { Category, User } from './models.js'
import { seedProducts } from './seed.js'

const app = express()
const port = Number(process.env.PORT || 5000)

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error('JWT_SECRET must be configured with at least 32 characters.')
  process.exit(1)
}

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '20kb' }))
app.use('/api', router)
app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` }))
app.use((error, _req, res, _next) => {
  console.error(error)
  if (error.name === 'ValidationError') return res.status(400).json({ message: error.message })
  if (error.code === 11000) return res.status(409).json({ message: 'That record already exists.' })
  if (error.name === 'CastError') return res.status(400).json({ message: 'Invalid record id.' })
  res.status(500).json({ message: 'An unexpected server error occurred.' })
})

async function start() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI must be configured.')
  await mongoose.connect(process.env.MONGODB_URI)
  await seedProducts()
  if (!await Category.exists()) await Category.insertMany(['Home & Living', 'Electronics', 'Accessories', 'Wellness'].map(name => ({ name })))
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    if (process.env.ADMIN_PASSWORD.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters.')
    await User.findOneAndUpdate(
      { email: process.env.ADMIN_EMAIL.toLowerCase().trim() },
      { $setOnInsert: { name: 'Northstar Admin', email: process.env.ADMIN_EMAIL, password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12), role: 'admin' } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
  }
  app.listen(port, () => console.log(`Northstar API listening on http://localhost:${port}`))
}

start().catch(error => {
  console.error('Unable to start the API:', error.message)
  process.exit(1)
})
