import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isLoggedIn, logout, getProducts, getMessages } from '../data/adminData'
import { IconGrid, IconInbox, IconPackage, IconLogOut, IconCheckCircle, IconAlertCircle } from '../Icons'
import AdminProducts from './AdminProducts'
import AdminMessages from './AdminMessages'
import AdminCategories from './AdminCategories'
import AdminSettings from './AdminSettings'

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

function StatBgIcon({ icon, color }) {
  return (
    <div className="admin-stat-bg-icon" style={{ color }}>
      {icon}
    </div>
  )
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('products')
  const [theme, setTheme] = useState(() => localStorage.getItem('yusano_theme') || 'light')
  const [products, setProducts] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn()) navigate('/admin')
  }, [navigate])

  useEffect(() => {
    Promise.all([getProducts(), getMessages()]).then(([prods, msgs]) => {
      setProducts(prods)
      setMessages(msgs)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('yusano_theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  if (!isLoggedIn()) return null

  const unread = messages.filter(m => !m.read).length
  const readPercent = messages.length > 0 ? Math.round(((messages.length - unread) / messages.length) * 100) : 0

  return (
    <div className="admin-layout" data-theme={theme}>
      <div className="admin-body">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-brand">
            <div className="admin-sidebar-logo">Y</div>
            <div className="admin-sidebar-brand-text">
              <div className="admin-sidebar-brand-name">PT YUSANO</div>
              <div className="admin-sidebar-brand-sub">Admin Panel</div>
            </div>
          </div>

          <div className="admin-sidebar-divider" />

          <div className="admin-sidebar-section">
            <div className="admin-sidebar-label">Menu</div>
            <nav className="admin-nav">
              <button
                className={`admin-nav-item${tab === 'products' ? ' active' : ''}`}
                onClick={() => setTab('products')}
              >
                <IconGrid />
                <span>Produk</span>
              </button>
              <button
                className={`admin-nav-item${tab === 'messages' ? ' active' : ''}`}
                onClick={() => setTab('messages')}
              >
                <IconInbox />
                <span>Pesan Masuk</span>
                {unread > 0 && <span className="admin-sidebar-badge">{unread}</span>}
              </button>
              <button
                className={`admin-nav-item${tab === 'categories' ? ' active' : ''}`}
                onClick={() => setTab('categories')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 00-2 2v3" />
                  <path d="M21 8V5a2 2 0 00-2-2h-3" />
                  <path d="M3 16v3a2 2 0 002 2h3" />
                  <path d="M16 21h3a2 2 0 002-2v-3" />
                </svg>
                <span>Kategori</span>
              </button>
              <button
                className={`admin-nav-item${tab === 'settings' ? ' active' : ''}`}
                onClick={() => setTab('settings')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
                <span>Pengaturan</span>
              </button>
            </nav>
          </div>

          <div className="admin-sidebar-spacer" />

          <div className="admin-sidebar-divider" />

          <div className="admin-sidebar-footer">
            <div className="admin-sidebar-user">
              <div className="admin-sidebar-avatar">S</div>
              <div className="admin-sidebar-user-info">
                <div className="admin-sidebar-user-name">Admin</div>
                <div className="admin-sidebar-user-role">admin1@gmail.com</div>
              </div>
            </div>
            <button className="admin-theme-toggle" onClick={toggleTheme} title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}>
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button className="admin-sidebar-logout" onClick={handleLogout} title="Logout">
              <IconLogOut />
            </button>
          </div>
        </aside>

        <main className="admin-main">
          {loading ? (
            <div className="admin-loading">Memuat data...</div>
          ) : (
            <>
              <div className="admin-stats">
                <div className="admin-stat-card">
                  <StatBgIcon icon={<IconPackage />} color="#e67e22" />
                  <div className="admin-stat-icon orange">
                    <IconPackage />
                  </div>
                  <div className="admin-stat-info">
                    <h4>Total Produk</h4>
                    <p>{products.length}</p>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <StatBgIcon icon={<IconInbox />} color="#3b82f6" />
                  <div className="admin-stat-icon blue">
                    <IconInbox />
                  </div>
                  <div className="admin-stat-info">
                    <h4>Total Pesan</h4>
                    <p>{messages.length}</p>
                  </div>
                </div>
                <div className="admin-stat-card">
                  <StatBgIcon icon={<IconCheckCircle />} color="#22c55e" />
                  <div className="admin-stat-icon green">
                    <IconCheckCircle />
                  </div>
                  <div className="admin-stat-info">
                    <h4>Pesan Dibaca</h4>
                    <p>{messages.length - unread}</p>
                  </div>
                  <div className="admin-stat-bar">
                    <div className="admin-stat-bar-fill green" style={{ width: `${readPercent}%`, background: '#22c55e' }} />
                  </div>
                </div>
                <div className="admin-stat-card">
                  <StatBgIcon icon={<IconAlertCircle />} color="#ef4444" />
                  <div className="admin-stat-icon red">
                    <IconAlertCircle />
                  </div>
                  <div className="admin-stat-info">
                    <h4>Belum Dibaca</h4>
                    <p>{unread}</p>
                  </div>
                  <div className="admin-stat-bar">
                    <div className="admin-stat-bar-fill" style={{ width: `${100 - readPercent}%`, background: '#ef4444' }} />
                  </div>
                </div>
              </div>

              <div className="admin-tab-content" key={tab}>
                {tab === 'products' && <AdminProducts />}
                {tab === 'messages' && <AdminMessages />}
                {tab === 'categories' && <AdminCategories />}
                {tab === 'settings' && <AdminSettings />}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
