import { useState, useEffect, useRef } from 'react'
import { getProducts, getCategories, addProduct, updateProduct, deleteProduct, iconOptions } from '../data/adminData'

const emptyForm = { nameId: '', nameEn: '', icon: 'pipe', categoryId: 'Mining', categoryEn: 'Mining', descId: '', descEn: '', image: '', features: [], specs: [] }

const MAX_IMAGE_SIZE = 2 * 1024 * 1024

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [imageError, setImageError] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [categories, setCategories] = useState([])
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([prods, cats]) => {
      setProducts(prods)
      setCategories(cats)
      setLoading(false)
    })
  }, [])

  const refresh = () => getProducts().then(setProducts)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageError('')
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError('Ukuran gambar maksimal 2MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      setImageError('File harus berupa gambar')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result
      if (typeof dataUrl === 'string') {
        setForm(prev => ({ ...prev, image: dataUrl }))
        setImagePreview(dataUrl)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setForm(prev => ({ ...prev, image: '' }))
    setImagePreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const item = {
      icon: form.icon,
      name: { id: form.nameId, en: form.nameEn },
      category: { id: form.categoryId, en: form.categoryEn },
      description: { id: form.descId, en: form.descEn },
      image: form.image,
      features: form.features.filter(f => f.id || f.en).map(f => ({ id: f.id, en: f.en })),
      specs: form.specs.filter(s => s.keyId || s.keyEn || s.valueId || s.valueEn).map(s => ({ key: { id: s.keyId, en: s.keyEn }, value: { id: s.valueId, en: s.valueEn } })),
    }
    try {
      if (editingId) {
        await updateProduct(editingId, item)
        showToast('success', 'Produk berhasil diperbarui')
      } else {
        await addProduct(item)
        showToast('success', 'Produk berhasil ditambahkan')
      }
      await refresh()
    } catch (err) {
      showToast('error', err.message || 'Terjadi kesalahan')
    }
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
    setImagePreview('')
    setSubmitting(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
    document.body.style.overflow = ''
  }

  const [search, setSearch] = useState('')

  const filteredProducts = products.filter(p => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      (p.name.id || '').toLowerCase().includes(q) ||
      (p.name.en || '').toLowerCase().includes(q) ||
      (p.category.id || '').toLowerCase().includes(q) ||
      (p.category.en || '').toLowerCase().includes(q)
    )
  })

  const handleDelete = async (id) => {
    if (!confirm('Hapus produk ini?')) return
    try {
      await deleteProduct(id)
      await refresh()
      showToast('success', 'Produk berhasil dihapus')
    } catch (err) {
      showToast('error', err.message || 'Terjadi kesalahan')
    }
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
    setImagePreview('')
    setImageError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
    document.body.style.overflow = ''
  }

  const handleFeatureChange = (i, field, value) => {
    const features = [...form.features]
    if (!features[i]) features[i] = { id: '', en: '' }
    features[i][field] = value
    setForm({ ...form, features })
  }

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, { id: '', en: '' }] })
  }

  const removeFeature = (i) => {
    setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) })
  }

  const handleSpecChange = (i, field, value) => {
    const specs = [...form.specs]
    if (!specs[i]) specs[i] = { keyId: '', keyEn: '', valueId: '', valueEn: '' }
    specs[i][field] = value
    setForm({ ...form, specs })
  }

  const addSpec = () => {
    setForm({ ...form, specs: [...form.specs, { keyId: '', keyEn: '', valueId: '', valueEn: '' }] })
  }

  const removeSpec = (i) => {
    setForm({ ...form, specs: form.specs.filter((_, idx) => idx !== i) })
  }

  const openForm = (product) => {
    if (product) {
      setForm({
        nameId: product.name.id, nameEn: product.name.en,
        icon: product.icon,
        categoryId: product.category.id, categoryEn: product.category.en,
        descId: product.description?.id || '', descEn: product.description?.en || '',
        image: product.image || '',
        features: product.features ? product.features.map(f => ({ id: f.id, en: f.en })) : [],
        specs: product.specs ? product.specs.map(s => ({ keyId: s.key.id, keyEn: s.key.en, valueId: s.value.id, valueEn: s.value.en })) : [],
      })
      setImagePreview(product.image || '')
      setEditingId(product.id)
    } else {
      setForm(emptyForm)
      setEditingId(null)
      setImagePreview('')
    }
    setShowForm(true)
    document.body.style.overflow = 'hidden'
  }

  const handleInsertBullet = (name) => {
    const ta = document.querySelector(`textarea[name="${name}"]`)
    if (!ta) return
    const start = ta.selectionStart
    const end = ta.selectionEnd
    const text = form[name]
    const newText = text.substring(0, start) + '- ' + text.substring(end)
    setForm(prev => ({ ...prev, [name]: newText }))
    setTimeout(() => {
      ta.focus()
      ta.setSelectionRange(start + 2, start + 2)
    }, 0)
  }

  if (loading) return <div className="admin-loading">Memuat produk...</div>

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <h2>Kelola Produk</h2>
        <button className="admin-btn admin-btn-primary" onClick={() => openForm(null)}>
          + Tambah Produk
        </button>
      </div>

      <div className="admin-search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="16" height="16">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input type="text" placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)} />
        {search && <button className="admin-search-clear" onClick={() => setSearch('')}>×</button>}
      </div>

      {showForm && (
        <div className="admin-modal-overlay" onClick={handleCancel}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingId ? 'Edit Produk' : 'Tambah Produk'}</h3>
              <button type="button" className="admin-modal-close" onClick={handleCancel}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="20" height="20">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="admin-form-grid">
                <div className="admin-field">
                  <label>Nama (Indonesia)</label>
                  <input name="nameId" value={form.nameId} onChange={handleChange} required />
                </div>
                <div className="admin-field">
                  <label>Nama (English)</label>
                  <input name="nameEn" value={form.nameEn} onChange={handleChange} required />
                </div>
                <div className="admin-field">
                  <label>Ikon</label>
                  <select name="icon" value={form.icon} onChange={handleChange}>
                    {iconOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                <div className="admin-field">
                  <label>Kategori (Indonesia)</label>
                  <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
                    <option value="">Pilih kategori</option>
                    {categories.map(c => <option key={c.id} value={c.nameId}>{c.nameId}</option>)}
                  </select>
                </div>
                <div className="admin-field">
                  <label>Kategori (English)</label>
                  <select name="categoryEn" value={form.categoryEn} onChange={handleChange} required>
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c.id} value={c.nameEn}>{c.nameEn}</option>)}
                  </select>
                </div>
                <div className="admin-field admin-field-full">
                  <label>Deskripsi (Indonesia)</label>
                  <div className="admin-toolbar">
                    <button type="button" className="admin-toolbar-btn" onClick={() => handleInsertBullet('descId')} title="Tambah bullet list">•</button>
                  </div>
                  <textarea name="descId" value={form.descId} onChange={handleChange} rows="5" required />
                </div>
                <div className="admin-field admin-field-full">
                  <label>Deskripsi (English)</label>
                  <div className="admin-toolbar">
                    <button type="button" className="admin-toolbar-btn" onClick={() => handleInsertBullet('descEn')} title="Add bullet list">•</button>
                  </div>
                  <textarea name="descEn" value={form.descEn} onChange={handleChange} rows="5" required />
                </div>
                <div className="admin-field admin-field-full">
                  <label>Upload Gambar</label>
                  <div className="admin-image-upload">
                    {(imagePreview || form.image) ? (
                      <div className="admin-image-preview">
                        <img src={form.image || imagePreview} alt="Preview" />
                        <button type="button" className="admin-btn admin-btn-sm admin-btn-danger" onClick={handleRemoveImage}>
                          Hapus
                        </button>
                      </div>
                    ) : (
                      <div className="admin-image-dropzone" onClick={() => fileInputRef.current?.click()}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
                          <path d="M12 16V4m0 0L8 8m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Klik untuk upload gambar (max 2MB)</span>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                {imageError && <div className="admin-alert admin-alert-error" style={{ marginTop: 8 }}>{imageError}</div>}
              </div>
            </div>

            <div className="admin-field admin-field-full">
              <label>Fitur (Indonesia / English)</label>
              {form.features.map((f, i) => (
                <div key={i} className="admin-field-row">
                  <input value={f.id} onChange={e => handleFeatureChange(i, 'id', e.target.value)} placeholder="Fitur (ID)" />
                  <input value={f.en} onChange={e => handleFeatureChange(i, 'en', e.target.value)} placeholder="Feature (EN)" />
                  <button type="button" className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => removeFeature(i)}>×</button>
                </div>
              ))}
              <button type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={addFeature} style={{ marginTop: 4 }}>+ Tambah Fitur</button>
            </div>

            <div className="admin-field admin-field-full">
              <label>Spesifikasi (Key / Value — Indonesia / English)</label>
              {form.specs.map((s, i) => (
                <div key={i} className="admin-field-row spec-row">
                  <input value={s.keyId} onChange={e => handleSpecChange(i, 'keyId', e.target.value)} placeholder="Key (ID)" />
                  <input value={s.keyEn} onChange={e => handleSpecChange(i, 'keyEn', e.target.value)} placeholder="Key (EN)" />
                  <input value={s.valueId} onChange={e => handleSpecChange(i, 'valueId', e.target.value)} placeholder="Value (ID)" />
                  <input value={s.valueEn} onChange={e => handleSpecChange(i, 'valueEn', e.target.value)} placeholder="Value (EN)" />
                  <button type="button" className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => removeSpec(i)}>×</button>
                </div>
              ))}
              <button type="button" className="admin-btn admin-btn-sm admin-btn-secondary" onClick={addSpec} style={{ marginTop: 4 }}>+ Tambah Spesifikasi</button>
            </div>
          </div>
          <div className="admin-form-actions">
                <button type="submit" className="admin-btn admin-btn-primary" disabled={submitting}>{submitting ? 'Menyimpan...' : editingId ? 'Simpan' : 'Tambah'}</button>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={handleCancel}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Gambar</th>
              <th>Nama (ID)</th>
              <th>Nama (EN)</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 && (
              <tr><td colSpan={6} className="admin-empty">{search ? 'Produk tidak ditemukan' : 'Belum ada produk'}</td></tr>
            )}
            {filteredProducts.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>
                  {p.image && <img src={p.image} alt="" className="admin-thumb" />}
                  {!p.image && <span className="admin-thumb-placeholder">{p.icon}</span>}
                </td>
                <td>{p.name.id}</td>
                <td>{p.name.en}</td>
                <td><span className="admin-badge">{p.category.id}</span></td>
                <td className="admin-actions">
                  <button className="admin-btn admin-btn-sm admin-btn-secondary" onClick={() => openForm(p)}>Edit</button>
                  <button className="admin-btn admin-btn-sm admin-btn-danger" onClick={() => handleDelete(p.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
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
