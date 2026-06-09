import { useState, useEffect } from 'react'
import { getMessages, markRead, removeMessage } from '../data/adminData'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [detail, setDetail] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => { setMessages(getMessages()) }, [])

  const filteredMessages = messages.filter(m => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      (m.name || '').toLowerCase().includes(q) ||
      (m.email || '').toLowerCase().includes(q) ||
      (m.subject || '').toLowerCase().includes(q) ||
      (m.message || '').toLowerCase().includes(q)
    )
  })

  const refresh = () => setMessages(getMessages())

  const handleView = (m) => {
    setDetail(m)
    if (!m.read) {
      markRead(m.id)
      refresh()
    }
  }

  const handleDelete = (id) => {
    if (!confirm('Hapus pesan ini?')) return
    removeMessage(id)
    refresh()
    setDetail(detail?.id === id ? null : detail)
  }

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Pesan Masuk</h2>
        <span className="admin-badge">{messages.filter(m => !m.read).length} belum dibaca</span>
      </div>

      {detail && (
        <div className="admin-detail">
          <div className="admin-detail-header">
            <h3>Detail Pesan</h3>
            <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => setDetail(null)}>Tutup</button>
          </div>
          <div className="admin-detail-body">
            <p><strong>Dari:</strong> {detail.name} ({detail.email})</p>
            <p><strong>Subjek:</strong> {detail.subject}</p>
            <p><strong>Tanggal:</strong> {new Date(detail.date).toLocaleString('id-ID')}</p>
            <p><strong>Pesan:</strong></p>
            <div className="admin-detail-message">{detail.message}</div>
          </div>
          <div className="admin-detail-actions">
            <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(detail.id)}>Hapus</button>
          </div>
        </div>
      )}

      <div className="admin-search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" placeholder="Cari pesan..." value={search} onChange={e => setSearch(e.target.value)} />
        {search && <button className="admin-search-clear" onClick={() => setSearch('')}>×</button>}
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Tanggal</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Subjek</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredMessages.length === 0 && (
              <tr><td colSpan={6} className="admin-empty">{search ? 'Pesan tidak ditemukan' : 'Belum ada pesan'}</td></tr>
            )}
            {filteredMessages.map(m => (
              <tr key={m.id} className={!m.read ? 'admin-unread' : ''}>
                <td>{!m.read ? <span className="admin-dot" title="Belum dibaca" /> : ''}</td>
                <td>{new Date(m.date).toLocaleDateString('id-ID')}</td>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.subject}</td>
                <td className="admin-actions">
                  <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => handleView(m)}>Lihat</button>
                  <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(m.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
