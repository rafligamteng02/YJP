import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../data/adminData'
import {
  IconPipe, IconValve, IconBolt, IconGenerator,
  IconSafety, IconTool, IconOilGas,
} from '../Icons'

const iconMap = {
  pipe: <IconPipe />,
  valve: <IconValve />,
  bolt: <IconBolt />,
  generator: <IconGenerator />,
  safety: <IconSafety />,
  tool: <IconTool />,
  oilgas: <IconOilGas />,
}

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  const categories = useMemo(() => {
    const set = new Set()
    products.forEach(p => {
      const cat = p.category.en || p.category.id
      if (cat) set.add(cat)
    })
    return ['all', ...Array.from(set)]
  }, [products])

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return products
    return products.filter(p => {
      const cat = p.category.en || p.category.id
      return cat === activeCategory
    })
  }, [products, activeCategory])

  const catLabel = (cat) => {
    if (cat === 'all') return 'Semua'
    return cat
  }

  return (
    <div className="page-wrapper">
      <div className="page-bg-orbs">
        <div className="page-orb page-orb-1" />
        <div className="page-orb page-orb-2" />
        <div className="page-orb page-orb-3" />
      </div>

      <div className="page-hero">
        <div className="page-hero-bg-pattern" />
        <Link to="/" className="page-back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Kembali
        </Link>
        <h1>Produk Kami</h1>
        <p>Berbagai produk berkualitas tinggi untuk kebutuhan industri Oil & Gas, Mining, dan General.</p>
      </div>

      <div className="container" style={{ paddingTop: 0 }}>
        <div className="products-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`products-filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {catLabel(cat)}
              {activeCategory === cat && (
                <span className="products-filter-count">
                  {activeCategory === 'all' ? products.length : filtered.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filtered.map((p, i) => (
            <Link to={`/product/${p.id}`} className="product-card product-card-enter" key={p.id} style={{ animationDelay: `${(i % 4) * 0.1}s` }}>
              <div className="product-card-icon">{iconMap[p.icon] || <IconPipe />}</div>
              <div className="product-card-info">
                <h3>{p.name.en || p.name.id}</h3>
                <span className="product-card-category">{p.category.en || p.category.id}</span>
                {p.description && (p.description.en || p.description.id) && (
                  <p className="product-card-desc">{(p.description.en || p.description.id).substring(0, 80)}{(p.description.en || p.description.id).length > 80 ? '...' : ''}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="products-empty">
            <p>Tidak ada produk di kategori ini</p>
          </div>
        )}
      </div>
    </div>
  )
}
