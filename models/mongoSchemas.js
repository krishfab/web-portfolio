// MongoDB Schema suggestions for your backend

// Product Schema
const productSchema = {
  _id: "ObjectId",
  name: "String", // required
  description: "String",
  price: "Number", // required
  originalPrice: "Number", // for showing discounts
  category: "ObjectId", // reference to Category
  categoryName: "String", // denormalized for faster queries
  brand: "String",
  images: ["String"], // array of image URLs
  specifications: {
    // flexible object for product specs
    processor: "String",
    memory: "String",
    storage: "String",
    display: "String",
    // ... other specs
  },
  inventory: {
    quantity: "Number",
    inStock: "Boolean",
    lowStockThreshold: "Number",
  },
  ratings: {
    average: "Number", // calculated average
    count: "Number", // total number of ratings
  },
  reviews: ["ObjectId"], // references to Review documents
  tags: ["String"], // for search and filtering
  featured: "Boolean", // for homepage display
  isActive: "Boolean", // for soft delete
  createdAt: "Date",
  updatedAt: "Date",
}

// Category Schema
const categorySchema = {
  _id: "ObjectId",
  name: "String", // required, unique
  description: "String",
  icon: "String", // emoji or icon class
  image: "String", // category banner image
  parentCategory: "ObjectId", // for subcategories
  productCount: "Number", // denormalized count
  isActive: "Boolean",
  sortOrder: "Number", // for display ordering
  createdAt: "Date",
  updatedAt: "Date",
}

// Order Schema
const orderSchema = {
  _id: "ObjectId",
  userId: "ObjectId", // reference to User
  orderNumber: "String", // unique order identifier
  items: [
    {
      productId: "ObjectId",
      name: "String", // snapshot of product name
      price: "Number", // snapshot of price at time of order
      quantity: "Number",
      image: "String", // snapshot of product image
    },
  ],
  customerInfo: {
    email: "String",
    firstName: "String",
    lastName: "String",
    phone: "String",
  },
  shippingAddress: {
    street: "String",
    city: "String",
    state: "String",
    zipCode: "String",
    country: "String",
  },
  billingAddress: {
    // same structure as shipping
  },
  paymentInfo: {
    method: "String", // 'card', 'paypal', 'gcash', etc.
    transactionId: "String",
    paymentStatus: "String", // 'pending', 'completed', 'failed'
  },
  orderSummary: {
    subtotal: "Number",
    tax: "Number",
    shipping: "Number",
    discount: "Number",
    total: "Number",
  },
  shippingMethod: "String", // 'standard', 'express'
  status: "String", // 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  trackingNumber: "String",
  orderDate: "Date",
  shippedDate: "Date",
  deliveredDate: "Date",
  notes: "String",
  createdAt: "Date",
  updatedAt: "Date",
}

// User Schema (enhanced)
const userSchema = {
  _id: "ObjectId",
  email: "String", // required, unique
  password: "String", // hashed
  firstName: "String",
  lastName: "String",
  phone: "String",
  isAdmin: "Boolean",
  profile: {
    avatar: "String",
    dateOfBirth: "Date",
    gender: "String",
  },
  addresses: [
    {
      type: "String", // 'home', 'work', 'other'
      street: "String",
      city: "String",
      state: "String",
      zipCode: "String",
      country: "String",
      isDefault: "Boolean",
    },
  ],
  preferences: {
    newsletter: "Boolean",
    notifications: "Boolean",
    currency: "String",
  },
  cart: [
    {
      productId: "ObjectId",
      quantity: "Number",
      addedAt: "Date",
    },
  ],
  wishlist: ["ObjectId"], // array of product IDs
  orderHistory: ["ObjectId"], // references to orders
  isActive: "Boolean",
  lastLogin: "Date",
  createdAt: "Date",
  updatedAt: "Date",
}

// Cart Schema (separate collection for better performance)
const cartSchema = {
  _id: "ObjectId",
  userId: "ObjectId", // reference to User
  items: [
    {
      productId: "ObjectId",
      quantity: "Number",
      addedAt: "Date",
      // Denormalized product data for faster access
      productName: "String",
      productPrice: "Number",
      productImage: "String",
      inStock: "Boolean",
    },
  ],
  updatedAt: "Date",
}

// Review Schema
const reviewSchema = {
  _id: "ObjectId",
  productId: "ObjectId",
  userId: "ObjectId",
  orderId: "ObjectId", // to verify purchase
  rating: "Number", // 1-5
  title: "String",
  comment: "String",
  images: ["String"], // review images
  helpful: "Number", // helpful votes count
  verified: "Boolean", // verified purchase
  isActive: "Boolean",
  createdAt: "Date",
  updatedAt: "Date",
}

export { productSchema, categorySchema, orderSchema, userSchema, cartSchema, reviewSchema }
