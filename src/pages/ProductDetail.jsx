import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById, getProducts } from '../data/adminData'
import { translations, defaultLang } from '../translations'
import {
  IconPipe, IconValve, IconBolt, IconGenerator, IconSafety, IconTool, IconOilGas,
  IconLocation, IconPhone, IconEmail, IconCheckCircle,
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

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || defaultLang)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    getProductById(id).then(p => {
      if (!p) navigate('/')
      else setProduct(p)
      setLoading(false)
    })
  }, [id, navigate])

  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    if (!product) return
    getProducts().then(all => {
      setRelatedProducts(all.filter(p => p.id !== product.id && p.category.id === product.category.id).slice(0, 4))
    })
  }, [product])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  const toggleLang = () => setLang(prev => prev === 'id' ? 'en' : 'id')

  const t = (key) => translations[lang]?.[key] || key

  if (loading) return <div className="product-detail-page"><div className="container" style={{ paddingTop: 200, textAlign: 'center', color: 'var(--text-muted)' }}>Memuat...</div></div>
  if (!product) return null

  return (
    <div className="product-detail-page">
      <header className="product-detail-nav">
        <div className="container">
          <div className="product-detail-nav-inner">
            <button className="btn-secondary" onClick={() => navigate('/')}>
              &larr; {t('prod_back')}
            </button>
            <div className="nav-toggles">
              <button className="toggle-btn toggle-lang" onClick={toggleLang} aria-label="Toggle language">
                {lang === 'id' ? 'EN' : 'ID'}
              </button>
              <button className="toggle-btn toggle-theme" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? '\u2600' : '\u263E'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="product-detail-hero" data-category={product.category.id}>
        <div className="product-detail-hero-bg">
          {product.image && <img src={product.image} alt="" />}
          <div className="product-detail-hero-overlay" />
        </div>
        <div className="container">
          <div className="product-detail-hero-content">
            <div className="product-detail-badge">{product.category[lang] || product.category.id}</div>
            <div className="product-detail-icon">{iconMap[product.icon] || <IconPipe />}</div>
            <h1 className="product-detail-title">{product.name[lang] || product.name.id}</h1>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="product-detail-body">
            <div className="product-detail-left">
              <div className="product-detail-desc">
                <h2>{t('prod_desc_title')}</h2>
                {(() => {
                  const desc = product.description?.[lang] || product.description?.id || '';
                  if (Array.isArray(desc)) {
                    return (
                      <ul className="product-detail-list">
                        {desc.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    );
                  }
                  if (desc.includes('<br>') || desc.includes('\n') || desc.includes('- ')) {
                    const raw = desc.replace(/<br>\s*/g, '\n');
                    const lines = raw.split('\n').map(s => s.trim()).filter(Boolean);
                    const els = [];
                    let bullets = [];
                    const flush = () => {
                      if (!bullets.length) return;
                      els.push(<ul className="product-detail-list">{bullets.map((item, i) => <li key={`b${i}`}>{item}</li>)}</ul>);
                      bullets = [];
                    };
                    for (const line of lines) {
                      if (line.startsWith('- ')) {
                        bullets.push(line.replace(/^-\s*/, ''));
                      } else {
                        flush();
                        if (/[:：]$/.test(line)) {
                          els.push(<h4 key={`h${els.length}`} className="pd-desc-subheading">{line}</h4>);
                        } else {
                          els.push(<p key={`p${els.length}`}>{line}</p>);
                        }
                      }
                    }
                    flush();
                    return <>{els}</>;
                  }
                  return <p>{desc}</p>;
                })()}
              </div>

              <div className="product-detail-cta">
                <h3>{t('prod_interest')}</h3>
                <p>{t('prod_contact_prompt')}</p>
                <div className="product-detail-cta-buttons">
                  <a href="tel:081297952828" className="btn-primary">
                    <IconPhone /> <span>{t('prod_call')}</span>
                  </a>
                  <a href="mailto:sonya@yusanojayapratama.co.id" className="btn-secondary">
                    <IconEmail /> <span>{t('prod_email')}</span>
                  </a>
                </div>
              </div>
            </div>

            {product.image ? (
              <div className="product-detail-image-wrap">
                <img src={product.image} alt={product.name[lang] || product.name.id} />
              </div>
            ) : (
              <div className="product-detail-image-placeholder" data-category={product.category.id}>
                <div className="pd-img-placeholder-icon">
                  {iconMap[product.icon] || <IconPipe />}
                </div>
                <span>{product.category[lang] || product.category.id}</span>
              </div>
            )}
          </div>

          {product.features && product.features.length > 0 && (
            <div className="pd-features">
              <h2 className="pd-section-title">{t('prod_features')}</h2>
              <div className="pd-features-grid">
                {product.features.map((f, i) => (
                  <div className="pd-feature-item" key={i}>
                    <IconCheckCircle />
                    <span>{f[lang] || f.id}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.specs && product.specs.length > 0 && (
            <div className="pd-specs">
              <h2 className="pd-section-title">{t('prod_specs')}</h2>
              <div className="pd-specs-table">
                {product.specs.map((s, i) => (
                  <div className={`pd-spec-row${i % 2 === 0 ? ' even' : ''}`} key={i}>
                    <span className="pd-spec-key">{s.key[lang] || s.key.id}</span>
                    <span className="pd-spec-value">{s.value[lang] || s.value.id}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

            {relatedProducts.length > 0 && (
            <div className="pd-related">
              <h2 className="pd-section-title">{t('prod_related')}</h2>
              <div className="pd-related-grid">
                {relatedProducts.map(rp => (
                  <Link to={`/product/${rp.id}`} className="pd-related-card" key={rp.id}>
                    <div className="pd-related-icon">{iconMap[rp.icon] || <IconPipe />}</div>
                    <h4>{rp.name[lang] || rp.name.id}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
