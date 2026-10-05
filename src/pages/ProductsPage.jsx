import React, { useState, useEffect, useCallback } from 'react';
import Wrapper from '../components/common/Wrapper';
import HeroSection from '../components/common/HeroSection';
import ProductCard from '../components/products/ProductCard';
import { fetchProducts } from '../api/dummyJson';
import {
  Search,
  RefreshCw,
  AlertCircle,
  Package,
  Layers,
  Sparkles,
  CheckCircle2,
  X,
} from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Asynchronous GET request to fetch products from DummyJSON
  const loadProducts = useCallback(async (searchQuery = '') => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts({
        limit: 24,
        skip: 0,
        search: searchQuery,
      });
      setProducts(data.products || []);
      setTotalCount(data.total || 0);
    } catch (err) {
      setError(err.message || 'Failed to load products from DummyJSON.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on initial mount
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handle live search with debounce
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadProducts(searchTerm);
  };

  // Add to cart callback passed to child ProductCard
  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    setToastMessage(`Added "${product.title}" to cart!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Extract unique categories from loaded products
  const categories = ['all', ...new Set(products.map((p) => p.category))];

  // Filter products by category tab if selected
  const displayedProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <Wrapper maxWidth="1280px">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="toast-close"
            aria-label="Close notification"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* HeroSection Component (Parent-Child Props) */}
      <HeroSection
        badge="GET /products • Live Catalog"
        title="Products Dashboard"
        subtitle="Explore products fetched asynchronously from DummyJSON with category filtering, search, and reusable card components."
        stats={[
          {
            label: 'Total Available',
            value: totalCount || '194+',
            icon: <Package size={16} />,
          },
          {
            label: 'Loaded in View',
            value: displayedProducts.length,
            icon: <Layers size={16} />,
          },
          {
            label: 'Cart Items',
            value: cartItems.length,
            icon: <Sparkles size={16} />,
          },
        ]}
      />

      {/* Control Bar: Search & Refresh */}
      <section className="catalog-toolbar">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search products (e.g., iPhone, perfume, shoes)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearchTerm('');
                  loadProducts('');
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button type="submit" className="btn btn-secondary">
            Search
          </button>
        </form>

        <button
          onClick={() => loadProducts(searchTerm)}
          className="btn btn-outline btn-refresh"
          disabled={loading}
          title="Reload products"
        >
          <RefreshCw size={16} className={loading ? 'spin-animation' : ''} />
          <span>Refresh</span>
        </button>
      </section>

      {/* Category Pills */}
      {categories.length > 1 && (
        <div className="category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip ${activeCategory === cat ? 'chip-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area: Loading, Error, or Grid */}
      <div className="products-container">
        {loading && (
          <div className="products-loading-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="product-skeleton-card">
                <div className="skeleton-image" />
                <div className="skeleton-body">
                  <div className="skeleton-line skeleton-title" />
                  <div className="skeleton-line skeleton-desc" />
                  <div className="skeleton-line skeleton-desc short" />
                  <div className="skeleton-footer">
                    <div className="skeleton-line skeleton-price" />
                    <div className="skeleton-line skeleton-btn" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="alert alert-error alert-centered">
            <AlertCircle size={28} />
            <div>
              <h3>Failed to load products</h3>
              <p>{error}</p>
              <button
                onClick={() => loadProducts(searchTerm)}
                className="btn btn-primary btn-sm mt-3"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!loading && !error && displayedProducts.length === 0 && (
          <div className="empty-state">
            <Package size={48} className="empty-state-icon" />
            <h3>No products found</h3>
            <p>Try refining your search keyword or switching category filter.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
                loadProducts('');
              }}
              className="btn btn-outline mt-3"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Product Cards Grid rendering child ProductCard components with props */}
        {!loading && !error && displayedProducts.length > 0 && (
          <div className="products-grid">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
