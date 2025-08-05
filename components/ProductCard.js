"use client"
import "./ProductCard.css"

const ProductCard = ({ product, onAddToCart }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? "filled" : ""}`}>
        ⭐
      </span>
    ))
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image || "/placeholder.svg"} alt={product.name} />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="wishlist-btn">❤️</button>
      </div>

      <div className="product-info">
        <div className="product-rating">
          {renderStars(product.rating)}
          <span className="reviews">({product.reviews})</span>
        </div>

        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>

        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.originalPrice > product.price && <span className="original-price">${product.originalPrice}</span>}
        </div>
      </div>

      <div className="product-actions">
        <button className="btn btn-primary btn-full" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
