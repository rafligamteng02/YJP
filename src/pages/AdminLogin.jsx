import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../data/adminData'

const Particles = () => (
  <div className="admin-login-particles">
    {Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="admin-login-particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${Math.random() * 6 + 4}s`,
        }}
      />
    ))}
  </div>
)

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    // brief delay so loading animation is visible
    await new Promise(r => setTimeout(r, 400))
    if (login(email, password)) {
      navigate('/admin/dashboard')
    } else {
      setError('Email atau password salah')
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-bg">
        <div className="admin-login-bg-orbe orbe-1" />
        <div className="admin-login-bg-orbe orbe-2" />
        <div className="admin-login-bg-orbe orbe-3" />
      </div>
      <Particles />
      <div className="admin-login-card">
        <div className="admin-login-card-glow" />
        <div className="admin-login-logo">
          <img src="/logo_yusano.webp" alt="PT Yusano Jaya Pratama" />
        </div>
        <h2>Welcome Back</h2>
        <p className="admin-login-subtitle">Masuk ke panel admin</p>
        {error && (
          <div className="admin-login-alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="admin-login-field">
            <label>Email</label>
            <div className="admin-login-input-wrap">
              <svg className="admin-login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin1@gmail.com" required disabled={loading} />
            </div>
          </div>
          <div className="admin-login-field">
            <label>Password</label>
            <div className="admin-login-input-wrap">
              <svg className="admin-login-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required disabled={loading} />
            </div>
          </div>
          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? (
              <>
                <svg className="admin-login-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                  <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="32" strokeLinecap="round" />
                </svg>
                <span>Memasukkan...</span>
              </>
            ) : (
              <>
                <span>Masuk</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
              </>
            )}
          </button>
        </form>
        <a href="/" className="admin-login-back">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Kembali ke Website
        </a>
      </div>
    </div>
  )
}
