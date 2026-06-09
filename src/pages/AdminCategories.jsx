import { useState, useEffect } from 'react'
import { getCategories, addCategory, deleteCategory } from '../data/adminData'

export default function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [nameId, setNameId] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    getCategories().then(data => {
      setCategories(data)
      setLoading(false)
    })
  }, [])

  const refresh = () => getCategories().then(setCategories)

  const showToast = (msg) => {
    setToast({ message: msg })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!nameId.trim() || !nameEn.trim()) return
    try {
      await addCategory({ nameId: nameId.trim(), nameEn: nameEn.trim() })
      await refresh()
      setNameId('')
      setNameEn('')
      showToast('Kategori berhasil ditambahkan')
    } catch (err) {
      showToast(err.message || 'Terjadi kesalahan')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus kategori ini?')) return
    try {
      await deleteCategory(id)
      await refresh()
      showToast('Kategori berhasil dihapus')
    } catch (err) {
      showToast(err.message || 'Terjadi kesalahan')
    }
  }

  if (loading) return <div className="admin-loading">Memuat kategori...</div>

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Kelola Kategori</h2>
      </div>

      <form className="admin-category-form" onSubmit={handleAdd}>
        <div className="admin-category-form-row">
          <div className="admin-field">
            <label>Nama (Indonesia)</label>
            <input value={nameId} onChange={e => setNameId(e.target.value)} placeholder="Contoh: Mining" required />
          </div>
          <div className="admin-field">
            <label>Nama (English)</label>
            <input value={nameEn} onChange={e => setNameEn(e.target.value)} placeholder="Example: Mining" required />
          </div>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ marginTop: 20 }}>+ Tambah</button>
        </div>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Indonesia</th>
              <th>English</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 && (
              <tr><td colSpan={4} className="admin-empty">Belum ada kategori</td></tr>
            )}
            {categories.map((c, i) => (
              <tr key={c.id}>
                <td>{i + 1}</td>
                <td><span className="admin-badge">{c.nameId}</span></td>
                <td><span className="admin-badge">{c.nameEn}</span></td>
                <td className="admin-actions">
                  <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(c.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && (
        <div className="admin-toast admin-toast-success">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  )
}
