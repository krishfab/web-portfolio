const express = require("express")
const app = express()
const Product = require("./models/Product")
const Category = require("./models/Category")
const Cart = require("./models/Cart")
const Order = require("./models/Order")
const User = require("./models/User")
const authenticateToken = require("./middleware/authenticateToken")

// Backend API route suggestions for your Express.js server

// Products Routes
app.get("/products/active", async (req, res) => {
  try {
    const { category, search, sort, limit = 20, page = 1 } = req.query

    const query = { isActive: true }

    // Add category filter
    if (category) {
      query.category = category
    }

    // Add search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    // Sort options
    let sortOption = {}
    switch (sort) {
      case "price-low":
        sortOption = { price: 1 }
        break
      case "price-high":
        sortOption = { price: -1 }
        break
      case "rating":
        sortOption = { "ratings.average": -1 }
        break
      case "newest":
        sortOption = { createdAt: -1 }
        break
      default:
        sortOption = { featured: -1, createdAt: -1 }
    }

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("category", "name")
      .exec()

    const total = await Product.countDocuments(query)

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Categories Routes
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1, name: 1 }).exec()

    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Cart Routes
app.post("/cart/add", authenticateToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    const userId = req.user.id

    // Check if product exists and is in stock
    const product = await Product.findById(productId)
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" })
    }

    if (!product.inventory.inStock) {
      return res.status(400).json({ message: "Product out of stock" })
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId })
    if (!cart) {
      cart = new Cart({ userId, items: [] })
    }

    // Check if item already in cart
    const existingItem = cart.items.find((item) => item.productId.toString() === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({
        productId,
        quantity,
        productName: product.name,
        productPrice: product.price,
        productImage: product.images[0],
        inStock: product.inventory.inStock,
        addedAt: new Date(),
      })
    }

    cart.updatedAt = new Date()
    await cart.save()

    res.json({ message: "Item added to cart", cart })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/cart", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id
    const cart = await Cart.findOne({ userId })
      .populate("items.productId", "name price images inventory.inStock")
      .exec()

    if (!cart) {
      return res.json({ items: [] })
    }

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.delete("/cart/clear", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id
    await Cart.findOneAndUpdate({ userId }, { items: [], updatedAt: new Date() })

    res.json({ message: "Cart cleared" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Orders Routes
app.post("/orders/checkout", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id
    const orderData = req.body

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Create order
    const order = new Order({
      ...orderData,
      userId,
      orderNumber,
      status: "pending",
      paymentInfo: {
        ...orderData.paymentInfo,
        paymentStatus: "pending",
      },
      orderDate: new Date(),
    })

    await order.save()

    // Update product inventory
    for (const item of orderData.items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { "inventory.quantity": -item.quantity } })
    }

    res.json({
      message: "Order placed successfully",
      orderId: order._id,
      orderNumber: order.orderNumber,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.get("/orders", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id
    const orders = await Order.find({ userId }).sort({ orderDate: -1 }).exec()

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// User Profile Routes
app.get("/users/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id
    const user = await User.findById(userId).select("-password").exec()

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

app.put("/users/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id
    const updates = req.body

    const user = await User.findByIdAndUpdate(
      userId,
      { ...updates, updatedAt: new Date() },
      { new: true, select: "-password" },
    )

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
