import { Link } from 'react-router-dom'

const images = [
  {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80',
    label: 'Proyek #1',
    desc: 'Proyek konstruksi dan instalasi pipa gas',
  },
  {
    url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    label: 'Proyek #2',
    desc: 'Pengeboran dan eksplorasi minyak & gas bumi',
  },
  {
    url: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80',
    label: 'Proyek #3',
    desc: 'Proyek industri dan pengolahan migas',
  },
  {
    url: 'https://images.unsplash.com/photo-1578991624413-3a4ef08ab59f?w=800&q=80',
    label: 'Proyek #4',
    desc: 'Pembangunan infrastruktur dan konstruksi',
  },
  {
    url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80',
    label: 'Proyek #5',
    desc: 'Proyek ketenagalistrikan dan power plant',
  },
  {
    url: 'https://images.unsplash.com/photo-1565043589221-1a6fd9aea45f?w=800&q=80',
    label: 'Proyek #6',
    desc: 'Proyek pertambangan dan sumber daya mineral',
  },
]

export default function GalleryPage() {
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
        <h1>Galeri Proyek</h1>
        <p>Dokumentasi proyek dan kegiatan operasional PT YUSANO JAYA PRATAMA</p>
      </div>

      <div className="container" style={{ paddingTop: 0 }}>
        <div className="gallery-grid">
          {images.map((img, i) => (
            <div className="gallery-item" key={i}>
              <img src={img.url} alt={img.label} loading="lazy" />
              <div className="gallery-overlay">
                <span>{img.label}</span>
                <small>{img.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
