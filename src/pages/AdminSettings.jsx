import { useState } from 'react'
import { changePassword } from '../data/adminData'

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (newPassword.length < 6) {
      setError('Password minimal 6 karakter')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password tidak cocok')
      return
    }
    if (!changePassword(currentPassword, newPassword)) {
      setError('Password saat ini salah')
      return
    }

    setSuccess(true)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Pengaturan</h2>
      </div>

      <div className="admin-settings-card">
        <div className="admin-settings-info">
          <div className="admin-settings-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <div>
            <h3>Ubah Password</h3>
            <p>Admin: admin1@gmail.com</p>
          </div>
        </div>

        <form className="admin-settings-form" onSubmit={handleSubmit}>
          {error && <div className="admin-login-alert">{error}</div>}
          {success && (
            <div className="admin-settings-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Password berhasil diubah
            </div>
          )}

          <div className="admin-field">
            <label>Password Saat Ini</label>
            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Masukkan password saat ini" required />
          </div>
          <div className="admin-field">
            <label>Password Baru</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Minimal 6 karakter" required />
          </div>
          <div className="admin-field">
            <label>Konfirmasi Password Baru</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Ketik ulang password baru" required />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary">Simpan Password</button>
        </form>
      </div>
    </div>
  )
}
