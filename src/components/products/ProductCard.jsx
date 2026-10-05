import React from 'react';
import { Star, Tag, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Reusable ProductCard Child Component
 * Demonstrates:
 * - Receiving props from parent component
 * - Conditional rendering based on props (stock status, discount badge)
 * - Event callbacks passed down from parent
 *
 * @param {Object} props
 * @param {Object} props.product - The product object from DummyJSON
 * @param {Function} [props.onAddToCart] - Callback when user clicks add to cart
 * @param {Function} [props.onViewDetails] - Callback when user clicks card or view details
 */
export default function ProductCard({ product, onAddToCart, onViewDetails }) {
  if (!product) return null;

  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    rating,
    category,
    thumbnail,
    stock,
    brand,
  } = product;

  // Calculate original price before discount
  const originalPrice = discountPercentage
    ? (price / (1 - discountPercentage / 100)).toFixed(2)
    : null;

  const inStock = stock > 0;

  return (
    <article className="product-card" id={`product-card-${id}`}>
      {/* Image & Badges */}
      <div className="product-image-container">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="product-thumbnail"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://dummyimage.com/300x200/1e293b/ffffff&text=Product';
          }}
        />

        {discountPercentage > 0 && (
          <span className="badge badge-discount">
            -{Math.round(discountPercentage)}% OFF
          </span>
        )}

        <span className="badge badge-category">
          <Tag size={11} /> {category}
        </span>
      </div>

      {/* Product Body */}
      <div className="product-card-body">
        {brand && <div className="product-brand">{brand}</div>}
        <h3 className="product-title" title={title}>
          {title}
        </h3>

        <p className="product-description" title={description}>
          {description}
        </p>

        {/* Rating and Stock Row */}
        <div className="product-meta-row">
          <div className="rating-pill">
            <Star size={14} className="star-icon" fill="currentColor" />
            <span className="rating-value">{rating?.toFixed(1) || '4.0'}</span>
          </div>

          <div className={`stock-status ${inStock ? 'in-stock' : 'out-of-stock'}`}>
            {inStock ? (
              <>
                <CheckCircle size={13} /> <span>{stock} in stock</span>
              </>
            ) : (
              <>
                <AlertCircle size={13} /> <span>Out of stock</span>
              </>
            )}
          </div>
        </div>

        {/* Price and Action Row */}
        <div className="product-card-footer">
          <div className="price-block">
            <span className="current-price">${price?.toFixed(2)}</span>
            {originalPrice && (
              <span className="original-price">${originalPrice}</span>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm btn-cart"
            onClick={() => onAddToCart && onAddToCart(product)}
            disabled={!inStock}
            title={inStock ? 'Add to Cart' : 'Out of stock'}
          >
            <ShoppingCart size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
