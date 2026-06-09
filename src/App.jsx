import { useState, useEffect, useRef, useCallback } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import {
  IconExploration, IconMining, IconLogistics,
  IconAward, IconTeam, IconEnvironment, IconSafety,
  IconLocation, IconPhone, IconEmail, IconClock,
  IconOilGas, IconBuilding, IconPipe, IconValve,
  IconBolt, IconGenerator, IconTool, IconCheckCircle,
} from './Icons.jsx'
import { translations, defaultLang } from './translations.js'
import { getProducts, addMessage } from './data/adminData.js'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import './App.css'
import './pages/Admin.css'

function useRevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function useAnimatedCounter(target, ref) {
  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let current = 0
          const increment = Math.ceil(target / 60)
          const interval = setInterval(() => {
            current += increment
            if (current >= target) {
              current = target
              clearInterval(interval)
            }
            if (ref.current) ref.current.textContent = current + '+'
          }, 20)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, ref])
}

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 8,
    size: Math.random() * 3 + 1,
  }))

  return (
    <div className="particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

function StatCard({ value, label, icon }) {
  const ref = useRef(null)
  useAnimatedCounter(value, ref)
  return (
    <div className="stat-card reveal reveal-delay-1">
      <div className="stat-icon-wrap">{icon}</div>
      <span className="stat-number" ref={ref}>0</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function ServiceCard({ icon, title, desc, delay }) {
  return (
    <div className={`service-card reveal reveal-delay-${delay}`}>
      <div className="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

function ProductCard({ icon, title, category, delay, productId }) {
  return (
    <Link to={`/product/${productId}`} className={`product-card reveal reveal-delay-${delay}`}>
      <div className="product-card-icon">{icon}</div>
      <div className="product-card-info">
        <h3>{title}</h3>
        <span className="product-card-category">{category}</span>
      </div>
    </Link>
  )
}

function WhyItem({ icon, title, desc, delay }) {
  return (
    <div className={`why-item reveal reveal-delay-${delay}`}>
      <div className="why-item-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div className="faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  )
}

function ContactItem({ icon, title, info }) {
  return (
    <div className="contact-item reveal">
      <div className="contact-icon">{icon}</div>
      <div className="contact-item-content">
        <h4>{title}</h4>
        <p>{info}</p>
      </div>
    </div>
  )
}

function Navbar({ scrolled, mobileOpen, toggleMobile, scrollTo, t, toggleLang, toggleTheme, lang, theme, activeSection }) {
  const sections = ['hero', 'tentang', 'layanan', 'produk', 'mengapa', 'kontak']
  const labels = [t('nav_home'), t('nav_about'), t('nav_services'), t('nav_products'), t('nav_why'), t('nav_contact')]
  const mobileItems = translations[lang].nav_mobile

  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const icons = [
    <svg key="home" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    <svg key="about" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    <svg key="services" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    <svg key="products" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
    <svg key="why" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    <svg key="contact" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  ]

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <img src="/logo_yusano.webp" alt="PT Yusano Jaya Pratama" className="logo-img" />
          </Link>
          <ul className="nav-links">
            {labels.slice(0, 2).map((label, i) => (
              <li key={sections[i]} style={{ animationDelay: `${i * 0.06}s` }} className={mounted ? 'nav-item-visible' : ''}>
                <a href={`#${sections[i]}`} className={activeSection === sections[i] ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollTo(sections[i]) }}>{label}</a>
              </li>
            ))}
            <li><a href="#layanan" className={activeSection === 'layanan' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollTo('layanan') }}>{t('nav_services')}</a></li>
            <li className="nav-dropdown" ref={dropdownRef}>
              <button
                className={`nav-dropdown-trigger${dropdownOpen ? ' open' : ''}`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {t('nav_products')}
                <svg className="nav-dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {dropdownOpen && (
                <div className="nav-dropdown-menu">
                  <Link to="/produk" className="nav-dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                    Semua Produk
                  </Link>
                  <Link to="/galeri" className="nav-dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    Galeri Proyek
                  </Link>
                </div>
              )}
            </li>
            <li><a href="#mengapa" className={activeSection === 'mengapa' ? 'active' : ''} onClick={(e) => { e.preventDefault(); scrollTo('mengapa') }}>{t('nav_why')}</a></li>
            <li><a className="nav-contact-btn" href="#kontak" onClick={(e) => { e.preventDefault(); scrollTo('kontak') }}>{t('nav_contact')}</a></li>
            <li className="nav-toggles">
              <button className="toggle-btn toggle-lang" onClick={toggleLang} aria-label="Toggle language">
                {lang === 'id' ? 'EN' : 'ID'}
              </button>
              <button className="toggle-btn toggle-theme" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? '\u2600' : '\u263E'}
              </button>
            </li>
          </ul>
          <button
            className={`hamburger${mobileOpen ? ' active' : ''}`}
            onClick={toggleMobile}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      <div className={`mobile-nav-overlay${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-nav-glow" />
        <div className="mobile-nav-brand" onClick={() => { scrollTo('hero'); toggleMobile() }}>
          <img src="/logo_yusano.webp" alt="PT Yusano Jaya Pratama" />
        </div>
        <div className="mobile-nav-links">
          {mobileItems.slice(0, 2).map((item, i) => (
            <a
              key={item}
              href={`#${sections[i]}`}
              className={`mobile-nav-item${activeSection === sections[i] ? ' active' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(sections[i])
                toggleMobile()
              }}
            >
              <span className="mobile-nav-icon">{icons[i]}</span>
              <span className="mobile-nav-label">{item}</span>
            </a>
          ))}
          <Link to="/produk" className="mobile-nav-item" onClick={() => toggleMobile()}>
            <span className="mobile-nav-icon">{icons[3]}</span>
            <span className="mobile-nav-label">{t('nav_products')}</span>
          </Link>
          <Link to="/galeri" className="mobile-nav-item" onClick={() => toggleMobile()}>
            <span className="mobile-nav-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </span>
            <span className="mobile-nav-label">Galeri</span>
          </Link>
          {mobileItems.slice(4).map((item, i) => {
            const idx = i + 4
            return (
              <a
                key={item}
                href={`#${sections[idx]}`}
                className={`mobile-nav-item${activeSection === sections[idx] ? ' active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(sections[idx])
                  toggleMobile()
                }}
              >
                <span className="mobile-nav-icon">{icons[idx]}</span>
                <span className="mobile-nav-label">{item}</span>
              </a>
            )
          })}
        </div>
        <div className="mobile-nav-footer">
          <button className="toggle-btn toggle-lang" onClick={toggleLang} aria-label="Toggle language">
            {lang === 'id' ? 'EN' : 'ID'}
          </button>
          <button className="toggle-btn toggle-theme" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '\u2600' : '\u263E'}
          </button>
        </div>
      </div>
    </>
  )
}

const iconMap = {
  pipe: <IconPipe />,
  valve: <IconValve />,
  bolt: <IconBolt />,
  generator: <IconGenerator />,
  safety: <IconSafety />,
  tool: <IconTool />,
  oilgas: <IconOilGas />,
}

function MainWebsite() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || defaultLang)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formErrors, setFormErrors] = useState({})
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [toast, setToast] = useState(null)
  const [products, setProducts] = useState([])
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => { getProducts().then(setProducts) }, [])

  const t = useCallback((key) => translations[lang][key] || key, [lang])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  useRevealOnScroll()

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 60)
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setShowBackToTop(scrollTop > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ids = ['hero', 'tentang', 'layanan', 'produk', 'mengapa', 'kontak']
    const observers = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { rootMargin: '-40% 0px -50% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev)
    document.body.style.overflow = !mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  useEffect(() => {
    return () => { document.body.style.overflow = '' }
  }, [])

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'id' ? 'en' : 'id')
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }, [])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const errors = {}
    const isId = lang === 'id'
    if (!formData.name.trim()) errors.name = isId ? 'Nama harus diisi' : 'Name is required'
    if (!formData.email.trim()) errors.email = isId ? 'Email harus diisi' : 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = isId ? 'Email tidak valid' : 'Invalid email'
    if (!formData.message.trim()) errors.message = isId ? 'Pesan harus diisi' : 'Message is required'
    return errors
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    setFormErrors(errors)
    if (Object.keys(errors).length > 0) return
    await addMessage({ name: formData.name, email: formData.email, subject: formData.subject, message: formData.message })
    setFormSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setToast({ type: 'success', message: t('toast_sent') })
    setTimeout(() => setFormSubmitted(false), 3000)
    setTimeout(() => setToast(null), 3500)
  }

  const values = ['Integrity', 'Loyalty', 'Entrepreneurial Spirit', 'Culture of Learning', 'Perseverance', 'Excellence']

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <Navbar
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        toggleMobile={toggleMobile}
        scrollTo={scrollTo}
        t={t}
        toggleLang={toggleLang}
        toggleTheme={toggleTheme}
        lang={lang}
        theme={theme}
        activeSection={activeSection}
      />

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
            alt="Oil & Gas Industry"
            loading="eager"
          />
        </div>
        <div className="hero-overlay" />
        <Particles />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            {t('hero_badge')}
          </div>
          <h1 className="hero-title">
            <span className="hero-title-line">{t('hero_line1')}</span>
            <span className="hero-title-line gold">{t('hero_line2')}</span>
            <span className="hero-title-line">{t('hero_line3')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('hero_subtitle')}
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollTo('tentang')}>
              <span>{t('hero_btn1')}</span>
              <span>&rarr;</span>
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('kontak')}>
              {t('hero_btn2')}
            </button>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="tentang" className="section about">
        <div className="about-bg-glow" />
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{t('about_tag')}</span>
            <h2 className="section-title">
              <span className="highlight">{t('about_title_1')}</span> {t('about_title_2')}
            </h2>
            <p className="section-desc">
              {t('about_desc')}
            </p>
          </div>

          <div className="about-grid">
            <div className="about-image reveal">
              <div className="about-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80"
                  alt="Industrial Project"
                  loading="lazy"
                />
                <div className="about-image-overlay" />
                <div className="about-image-badge">
                  <span className="about-badge-year">Sejak 1981</span>
                  <span className="about-badge-text">Pengalaman</span>
                </div>
              </div>
            </div>

            <div className="about-content-text reveal reveal-delay-1">
              <div className="about-quote">
                <svg className="about-quote-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
                <p>{t('about_p1')}</p>
              </div>
              <p>{t('about_p2')}</p>
              <div className="about-stats">
                <StatCard value={18} label={t('stat_exp')} icon={<IconAward />} />
                <StatCard value={502} label={t('stat_projects')} icon={<IconTool />} />
                <StatCard value={120} label={t('stat_workers')} icon={<IconTeam />} />
                <StatCard value={12} label={t('stat_running')} icon={<IconClock />} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="layanan" className="section services">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{t('services_tag')}</span>
            <h2 className="section-title">
              {t('services_title_1')} <span className="highlight">Supplier</span> {t('services_title_2')}
            </h2>
            <p className="section-desc">
              {t('services_desc')}
            </p>
          </div>

          <div className="services-grid">
            <ServiceCard icon={<IconOilGas />} title={t('s1_title')} desc={t('s1_desc')} delay={1} />
            <ServiceCard icon={<IconMining />} title={t('s2_title')} desc={t('s2_desc')} delay={2} />
            <ServiceCard icon={<IconExploration />} title={t('s3_title')} desc={t('s3_desc')} delay={3} />
            <ServiceCard icon={<IconBuilding />} title={t('s4_title')} desc={t('s4_desc')} delay={4} />
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section certifications">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{t('cert_tag')}</span>
            <h2 className="section-title">
              {t('cert_title_1')} <span className="highlight">{t('cert_title_2')}</span>
            </h2>
            <p className="section-desc">
              {t('cert_desc')}
            </p>
          </div>
          <div className="cert-grid reveal">
            {['ISO 9001:2015', 'API 6D', 'SNI', 'OSHA', 'ANSI', 'IEC'].map((cert, i) => (
              <div className="cert-item" key={cert} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="cert-icon">
                  <IconCheckCircle />
                </div>
                <span className="cert-label">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="produk" className="section products">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{t('products_tag')}</span>
            <h2 className="section-title">
              <span className="highlight">{t('products_title_1')}</span> {t('products_title_2')}
            </h2>
            <p className="section-desc">
              {t('products_desc')}
            </p>
          </div>

          <div className="products-grid">
            {products.slice(0, 3).map((p, i) => (
              <ProductCard
                key={p.id}
                productId={p.id}
                icon={iconMap[p.icon] || <IconPipe />}
                title={p.name[lang] || p.name.id}
                category={p.category[lang] || p.category.id}
                delay={(i % 4) + 1}
              />
            ))}
          </div>

          <div className="section-footer-link">
            <Link to="/produk" className="btn-primary">
              <span>Lihat Semua Produk</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section gallery">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{t('gallery_tag')}</span>
            <h2 className="section-title">
              {t('gallery_title_1')} <span className="highlight">{t('gallery_title_2')}</span>
            </h2>
            <p className="section-desc">
              {t('gallery_desc')}
            </p>
          </div>
          <div className="gallery-grid">
            {[
              'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80',
              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
            ].map((url, i) => (
              <div className="gallery-item reveal" style={{ animationDelay: `${i * 0.08}s` }} key={i}>
                <img src={url} alt={`Gallery ${i + 1}`} loading="lazy" />
                <div className="gallery-overlay">
                  <span>Proyek #{i + 1}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="section-footer-link">
            <Link to="/galeri" className="btn-primary">
              <span>Lihat Galeri</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="mengapa" className="section why">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{t('why_tag')}</span>
            <h2 className="section-title">
              {t('why_title_1')} <span className="highlight">{t('why_title_2')}</span>
            </h2>
            <p className="section-desc">
              {t('why_desc')}
            </p>
          </div>

          <div className="why-grid">
            <WhyItem icon={<IconAward />} title={t('w1_title')} desc={t('w1_desc')} delay={1} />
            <WhyItem icon={<IconTeam />} title={t('w2_title')} desc={t('w2_desc')} delay={2} />
            <WhyItem icon={<IconLogistics />} title={t('w3_title')} desc={t('w3_desc')} delay={3} />
            <WhyItem icon={<IconEnvironment />} title={t('w4_title')} desc={t('w4_desc')} delay={4} />
          </div>

          <div className="values-section reveal">
            <h3 className="values-heading">{t('values_heading')}</h3>
            <div className="values-grid">
              {values.map((v, i) => (
                <div key={v} className={`value-badge reveal reveal-delay-${(i % 4) + 1}`}>
                  <span>{t('v' + (i + 1))}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{t('faq_tag')}</span>
            <h2 className="section-title">
              {t('faq_title_1')} <span className="highlight">{t('faq_title_2')}</span>
            </h2>
            <p className="section-desc">
              {t('faq_desc')}
            </p>
          </div>
          <div className="faq-list reveal">
            {[1, 2, 3].map((q) => (
              <FAQItem key={q} question={t(`faq_q${q}`)} answer={t(`faq_a${q}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <div className="cta-content reveal">
            <h2>{t('cta_title')}</h2>
            <p>{t('cta_desc')}</p>
            <div className="cta-actions">
              <button className="btn-primary" onClick={() => scrollTo('kontak')}>
                <span>{t('cta_btn1')}</span>
                <span>&rarr;</span>
              </button>
              <a href="https://www.yusanojayapratama.co.id/Page/Company-Profile.html" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <span>{t('cta_btn2')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontak" className="section contact">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">{t('contact_tag')}</span>
            <h2 className="section-title">
              {t('contact_title_1')} <span className="highlight">{t('contact_title_2')}</span>
            </h2>
            <p className="section-desc">
              {t('contact_desc')}
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <ContactItem icon={<IconLocation />} title={t('co_jkt')} info="JL. Cilosari No.14, Cikini Menteng, Jakarta Pusat, DKI Jakarta 10330" />
              <ContactItem icon={<IconLocation />} title={t('co_pku')} info="Jl. Duyung, Villa Putri Duyung Blok F3, Pekanbaru, Riau 28281" />
              <ContactItem icon={<IconPhone />} title={t('co_phone_jkt')} info="0812 9795 2828 (Sonya)" />
              <ContactItem icon={<IconPhone />} title={t('co_phone_pku')} info="0821 7274 3629 (Robby)" />
              <ContactItem icon={<IconEmail />} title={t('co_email')} info="sonya@yusanojayapratama.co.id" />
              <ContactItem icon={<IconClock />} title={t('co_web')} info="www.yusanojayapratama.co.id" />
            </div>

            <div className="contact-right">
              <form className="contact-form reveal" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <input type="text" name="name" placeholder={t('form_name')} value={formData.name} onChange={handleFormChange} className={formErrors.name ? 'form-error' : ''} required />
                    {formErrors.name && <span className="form-error-text">{formErrors.name}</span>}
                  </div>
                  <div className="form-field">
                    <input type="email" name="email" placeholder={t('form_email')} value={formData.email} onChange={handleFormChange} className={formErrors.email ? 'form-error' : ''} required />
                    {formErrors.email && <span className="form-error-text">{formErrors.email}</span>}
                  </div>
                </div>
                <div className="form-field">
                  <input type="text" name="subject" placeholder={t('form_subject')} value={formData.subject} onChange={handleFormChange} />
                </div>
                <div className="form-field">
                  <textarea name="message" rows="5" placeholder={t('form_message')} value={formData.message} onChange={handleFormChange} className={formErrors.message ? 'form-error' : ''} required />
                  {formErrors.message && <span className="form-error-text">{formErrors.message}</span>}
                </div>
                <button type="submit" className="btn-primary">
                  <span>{formSubmitted ? t('form_sent') : t('form_send')}</span>
                  {!formSubmitted && <span>&rarr;</span>}
                </button>
              </form>

              <div className="contact-map reveal">
                <iframe
                  src="https://maps.google.com/maps?q=JL.+Cilosari+No.14+Cikini+Menteng+Jakarta+Pusat&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi PT Yusano Jaya Pratama"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>PT <span>YUSANO JAYA PRATAMA</span></h3>
              <p>{t('footer_desc')}</p>
              <div className="footer-contact">
                <div className="footer-contact-item">
                  <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>JL. Cilosari No.14, Cikini Menteng, Jakarta Pusat</span>
                </div>
                <div className="footer-contact-item">
                  <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>0812 9795 2828 (Sonya)</span>
                </div>
                <div className="footer-contact-item">
                  <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-10 7L2 7" />
                  </svg>
                  <span>sonya@yusanojayapratama.co.id</span>
                </div>
              </div>
              <div className="footer-social">
                <a href="https://www.linkedin.com/company/pt-yusano-jaya-pratama" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                </a>
                <a href="https://facebook.com/yusanojayapratama" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://instagram.com/yusanojayapratama" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://www.youtube.com/@yusanojayapratama" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
            <div className="footer-links">
              <h4>{t('footer_links')}</h4>
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>{t('f_home')}</a>
              <a href="#tentang" onClick={(e) => { e.preventDefault(); scrollTo('tentang') }}>{t('f_about')}</a>
              <a href="#layanan" onClick={(e) => { e.preventDefault(); scrollTo('layanan') }}>{t('f_services')}</a>
              <a href="#produk" onClick={(e) => { e.preventDefault(); scrollTo('produk') }}>{t('f_products')}</a>
              <a href="#kontak" onClick={(e) => { e.preventDefault(); scrollTo('kontak') }}>{t('f_contact')}</a>
            </div>
            <div className="footer-links">
              <h4>{t('footer_services')}</h4>
              <a href="#layanan" onClick={(e) => { e.preventDefault(); scrollTo('layanan') }}>{t('f_s1')}</a>
              <a href="#layanan" onClick={(e) => { e.preventDefault(); scrollTo('layanan') }}>{t('f_s2')}</a>
              <a href="#layanan" onClick={(e) => { e.preventDefault(); scrollTo('layanan') }}>{t('f_s3')}</a>
              <a href="#layanan" onClick={(e) => { e.preventDefault(); scrollTo('layanan') }}>{t('f_s4')}</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} {t('footer_copy')}</p>
            <div className="footer-bottom-links">
              <a href="#">{t('footer_priv')}</a>
              <a href="#">{t('footer_terms')}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button
        className={`back-to-top${showBackToTop ? ' visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Kembali ke atas"
      >
        &uarr;
      </button>

      {/* TOAST */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{toast.message}</span>
        </div>
      )}

      <a href="https://wa.me/6281297952828" target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="WhatsApp">
        <img src="/whatsapp.svg" alt="WhatsApp" className="wa-icon" />
      </a>
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/produk" element={<ProductsPage />} />
      <Route path="/galeri" element={<GalleryPage />} />
      <Route path="*" element={<MainWebsite />} />
    </Routes>
  )
}

export default App
