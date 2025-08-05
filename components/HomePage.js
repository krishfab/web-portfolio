// "use client"

// import { useState } from "react"
// import "./HomePage.css"

// const HomePage = () => {
//   const [cartItems, setCartItems] = useState([])

//   // Mock data for products
//   const featuredProducts = [
//     {
//       id: 1,
//       name: "iPhone 15 Pro Max",
//       price: 1199,
//       originalPrice: 1299,
//       image: "/placeholder.svg?height=300&width=300",
//       rating: 4.8,
//       reviews: 2847,
//       category: "Smartphones",
//       badge: "Best Seller",
//     },
//     {
//       id: 2,
//       name: "MacBook Pro 16-inch M3",
//       price: 2499,
//       originalPrice: 2699,
//       image: "/placeholder.svg?height=300&width=300",
//       rating: 4.9,
//       reviews: 1523,
//       category: "Laptops",
//       badge: "New",
//     },
//     {
//       id: 3,
//       name: "Sony WH-1000XM5",
//       price: 349,
//       originalPrice: 399,
//       image: "/placeholder.svg?height=300&width=300",
//       rating: 4.7,
//       reviews: 3241,
//       category: "Audio",
//       badge: "Sale",
//     },
//     {
//       id: 4,
//       name: 'Samsung 65" OLED TV',
//       price: 1899,
//       originalPrice: 2199,
//       image: "/placeholder.svg?height=300&width=300",
//       rating: 4.6,
//       reviews: 892,
//       category: "TVs",
//       badge: "Hot Deal",
//     },
//   ]

//   const categories = [
//     { name: "Smartphones", icon: "📱", count: 156 },
//     { name: "Laptops", icon: "💻", count: 89 },
//     { name: "Audio", icon: "🎧", count: 234 },
//     { name: "TVs", icon: "📺", count: 67 },
//     { name: "Gaming", icon: "🎮", count: 145 },
//     { name: "Accessories", icon: "🔌", count: 312 },
//   ]

//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const existing = prev.find((item) => item.id === product.id)
//       if (existing) {
//         return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
//       }
//       return [...prev, { ...product, quantity: 1 }]
//     })
//   }

//   const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <span key={i} className={`star ${i < Math.floor(rating) ? "filled" : ""}`}>
//         ⭐
//       </span>
//     ))
//   }

//   return (
//     <div className="homepage">
//       {/* Header */}
//       <header className="header">
//         <div className="container">
//           <div className="header-content">
//             <div className="logo">
//               <span className="logo-icon">⚡</span>
//               <span className="logo-text">TechVault</span>
//             </div>

//             <div className="search-bar">
//               <input type="text" placeholder="Search for electronics..." className="search-input" />
//               <button className="search-btn">🔍</button>
//             </div>

//             <div className="header-actions">
//               <button className="icon-btn">❤️</button>
//               <button className="cart-btn">🛒{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="hero">
//         <div className="container">
//           <div className="hero-content">
//             <h1 className="hero-title">Next-Gen Electronics</h1>
//             <p className="hero-subtitle">
//               Discover cutting-edge technology and premium electronics at unbeatable prices. Your gateway to the future
//               of tech.
//             </p>
//             <div className="hero-buttons">
//               <button className="btn btn-primary">Shop Now</button>
//               <button className="btn btn-secondary">View Deals</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features */}
//       <section className="features">
//         <div className="container">
//           <div className="features-grid">
//             <div className="feature-item">
//               <div className="feature-icon">🚚</div>
//               <h3>Free Shipping</h3>
//               <p>Free delivery on orders over $99</p>
//             </div>
//             <div className="feature-item">
//               <div className="feature-icon">🛡️</div>
//               <h3>2-Year Warranty</h3>
//               <p>Comprehensive protection plan</p>
//             </div>
//             <div className="feature-item">
//               <div className="feature-icon">⚡</div>
//               <h3>24/7 Support</h3>
//               <p>Expert technical assistance</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="categories">
//         <div className="container">
//           <h2 className="section-title">Shop by Category</h2>
//           <div className="categories-grid">
//             {categories.map((category) => (
//               <div key={category.name} className="category-card">
//                 <div className="category-icon">{category.icon}</div>
//                 <h3>{category.name}</h3>
//                 <p>{category.count} items</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="products">
//         <div className="container">
//           <div className="section-header">
//             <h2 className="section-title">Featured Products</h2>
//             <button className="btn btn-outline">View All</button>
//           </div>

//           <div className="products-grid">
//             {featuredProducts.map((product) => (
//               <div key={product.id} className="product-card">
//                 <div className="product-image">
//                   <img src={product.image || "/placeholder.svg"} alt={product.name} />
//                   {product.badge && <span className="product-badge">{product.badge}</span>}
//                   <button className="wishlist-btn">❤️</button>
//                 </div>

//                 <div className="product-info">
//                   <div className="product-rating">
//                     {renderStars(product.rating)}
//                     <span className="reviews">({product.reviews})</span>
//                   </div>

//                   <h3 className="product-name">{product.name}</h3>
//                   <p className="product-category">{product.category}</p>

//                   <div className="product-price">
//                     <span className="current-price">${product.price}</span>
//                     {product.originalPrice > product.price && (
//                       <span className="original-price">${product.originalPrice}</span>
//                     )}
//                   </div>
//                 </div>

//                 <div className="product-actions">
//                   <button className="btn btn-primary btn-full" onClick={() => addToCart(product)}>
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="newsletter">
//         <div className="container">
//           <h2>Stay Updated</h2>
//           <p>Get the latest tech news, exclusive deals, and product launches delivered to your inbox.</p>
//           <div className="newsletter-form">
//             <input type="email" placeholder="Enter your email" />
//             <button className="btn btn-primary">Subscribe</button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <div className="container">
//           <div className="footer-content">
//             <div className="footer-section">
//               <div className="logo">
//                 <span className="logo-icon">⚡</span>
//                 <span className="logo-text">TechVault</span>
//               </div>
//               <p>Your trusted destination for premium electronics and cutting-edge technology.</p>
//             </div>

//             <div className="footer-section">
//               <h4>Shop</h4>
//               <ul>
//                 <li>
//                   <a href="#">Smartphones</a>
//                 </li>
//                 <li>
//                   <a href="#">Laptops</a>
//                 </li>
//                 <li>
//                   <a href="#">Audio</a>
//                 </li>
//                 <li>
//                   <a href="#">Gaming</a>
//                 </li>
//               </ul>
//             </div>

//             <div className="footer-section">
//               <h4>Support</h4>
//               <ul>
//                 <li>
//                   <a href="#">Contact Us</a>
//                 </li>
//                 <li>
//                   <a href="#">Shipping Info</a>
//                 </li>
//                 <li>
//                   <a href="#">Returns</a>
//                 </li>
//                 <li>
//                   <a href="#">Warranty</a>
//                 </li>
//               </ul>
//             </div>

//             <div className="footer-section">
//               <h4>Company</h4>
//               <ul>
//                 <li>
//                   <a href="#">About Us</a>
//                 </li>
//                 <li>
//                   <a href="#">Careers</a>
//                 </li>
//                 <li>
//                   <a href="#">Privacy Policy</a>
//                 </li>
//                 <li>
//                   <a href="#">Terms of Service</a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="footer-bottom">
//             <p>&copy; 2024 TechVault. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default HomePage
