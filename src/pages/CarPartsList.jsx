import { useNavigate, useParams } from 'react-router-dom'
import carParts from '../data/carParts'

export default function CarPartsList() {
  const { sectionId } = useParams()
  const navigate = useNavigate()

  const section = carParts[sectionId]

  if (!section) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <button style={styles.back} onClick={() => navigate('/car-parts')}>← Back</button>
          <p style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>Section not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page} className="page-transition">
      <div style={styles.container}>

        {/* Back */}
        <button style={styles.back} onClick={() => navigate('/car-parts')}>
          ← Back
        </button>

        {/* Header */}
        <div style={{
          ...styles.headerBadge,
          background: section.bg,
          borderColor: section.border,
        }}>
          <h1 style={{ ...styles.title, color: section.color }}>{section.label}</h1>
          <p style={{ ...styles.count, color: section.color }}>{section.parts.length} parts</p>
        </div>

        {/* Parts grid */}
        <div style={styles.grid}>
          {section.parts.map((part) => (
            <button
              key={part.id}
              style={styles.card}
              onClick={() => navigate(`/car-parts/${sectionId}/${part.id}`)}
            >
              {/* Part image */}
              <div style={styles.imgWrap}>
                <img
                  src={part.image}
                  alt={part.name}
                  style={styles.img}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                {/* Fallback */}
                <div style={styles.imgFallback}>
                  <span style={{ fontSize: '28px' }}>{section.icon}</span>
                </div>
              </div>

              {/* Part info */}
              <div style={styles.cardBody}>
                <span style={styles.cardName}>{part.name}</span>
                <span style={styles.cardDesc}>{part.shortDesc}</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f7f7f5',
    padding: '0 0 2rem',
  },
  container: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  back: {
    marginTop: '1.5rem',
    background: 'none',
    border: 'none',
    fontSize: '14px',
    color: '#888',
    cursor: 'pointer',
    padding: 0,
    marginBottom: '1.25rem',
    display: 'block',
  },
  headerBadge: {
    borderRadius: '14px',
    border: '1px solid',
    padding: '1.25rem',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
  },
  count: {
    fontSize: '13px',
    marginTop: '4px',
    opacity: 0.8,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  card: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '14px',
    padding: '14px',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
  },
  imgWrap: {
    width: '100%',
    aspectRatio: '1',
    borderRadius: '10px',
    background: '#f7f7f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    padding: '8px',
  },
  imgFallback: {
    display: 'none',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  cardName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cardDesc: {
    fontSize: '11px',
    color: '#999',
    lineHeight: '1.4',
  },
}