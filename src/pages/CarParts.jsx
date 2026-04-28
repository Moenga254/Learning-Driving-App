import { useNavigate } from 'react-router-dom'
import carParts from '../data/carParts'

export default function CarParts() {
  const navigate = useNavigate()

  const sections = Object.entries(carParts).map(([key, section]) => ({
    id: key,
    ...section,
  }))

  return (
    <div style={styles.page} className="page-transition">
      <div style={styles.container}>

        {/* Back button */}
        <button style={styles.back} onClick={() => navigate('/')}>
          ← Back
        </button>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Car Parts</h1>
          <p style={styles.subtitle}>Learn the parts of a car and their functions</p>
        </div>

        {/* Section cards */}
        <p style={styles.sectionLabel}>Select a section</p>
        <div style={styles.cardList}>
          {sections.map((section) => (
            <button
              key={section.id}
              style={styles.card}
              onClick={() => navigate(`/car-parts/${section.id}`)}
            >
              <div style={{
                ...styles.iconWrap,
                background: section.bg,
                border: `1px solid ${section.border}`,
              }}>
                <span style={styles.icon}>{section.icon}</span>
              </div>
              <div style={styles.cardText}>
                <span style={styles.cardLabel}>{section.label}</span>
                <span style={styles.cardDesc}>{section.description}</span>
              </div>
              <span style={{
                ...styles.cardCount,
                background: section.bg,
                color: section.color,
              }}>
                {section.parts.length} parts
              </span>
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
  header: {
    marginBottom: '1.75rem',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: '#888',
    marginTop: '6px',
  },
  sectionLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '10px',
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '14px',
    padding: '14px 16px',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
  },
  iconWrap: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    fontSize: '22px',
  },
  cardText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  cardLabel: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cardDesc: {
    fontSize: '13px',
    color: '#888',
  },
  cardCount: {
    fontSize: '12px',
    fontWeight: '500',
    padding: '4px 10px',
    borderRadius: '20px',
    flexShrink: 0,
  },
}