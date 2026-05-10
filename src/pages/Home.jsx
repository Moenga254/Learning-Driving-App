import { useNavigate } from 'react-router-dom'

const categories = [
  {
    id: 'warning',
    label: 'Warning Signs',
    description: 'Hazards and dangers ahead',
    icon: '⚠️',
    color: '#854F0B',
    bg: '#FAEEDA',
    border: '#EF9F27',
    count: '20 signs',
  },
  {
    id: 'regulatory',
    label: 'Regulatory Signs',
    description: 'Orders you must obey',
    icon: '🛑',
    color: '#A32D2D',
    bg: '#FCEBEB',
    border: '#E24B4A',
    count: '32 signs',
  },
  {
    id: 'informational',
    label: 'Informational Signs',
    description: 'Guidance and facilities',
    icon: 'ℹ️',
    color: '#0F6E56',
    bg: '#E1F5EE',
    border: '#1D9E75',
    count: '14 signs',
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <div style={styles.page} className="page-transition">
        <div style={styles.container}>

          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.title}>Driving App For Learner</h1>
            <p style={styles.subtitle}>Master road signs, model town & car basics</p>
          </div>

          {/* Road Signs section */}
          <p style={styles.sectionLabel}>Road Signs</p>
          <div style={styles.cardList}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                style={styles.card}
                onClick={() => navigate(`/category/${cat.id}`)}
              >
                <div style={{ ...styles.iconWrap, background: cat.bg, border: `1px solid ${cat.border}` }}>
                  <span style={styles.icon}>{cat.icon}</span>
                </div>
                <div style={styles.cardText}>
                  <span style={styles.cardLabel}>{cat.label}</span>
                  <span style={styles.cardDesc}>{cat.description}</span>
                </div>
                <span style={{ ...styles.cardCount, background: cat.bg, color: cat.color }}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Other modules */}
          <p style={styles.sectionLabel}>Learn More</p>
          <div style={styles.comingGrid}>

            {/* Model Town — now live */}
            <button
              style={styles.activeCard}
              onClick={() => navigate('/model-town')}
            >
              <span style={styles.comingIcon}>🏘️</span>
              <span style={styles.comingLabel}>Model Town</span>
              <span style={styles.activeSub}>Traffic simulation</span>
            </button>

            {/* Car Parts — now live */}
            <button
              style={styles.activeCard}
              onClick={() => navigate('/car-parts')}
            >
              <span style={styles.comingIcon}>🚗</span>
              <span style={styles.comingLabel}>Car Parts</span>
              <span style={styles.activeSub}>27 parts</span>
            </button>

          </div>

        </div>
      </div>

      <footer style={{ textAlign: 'center', padding: '1rem 0', fontSize: '12px', color: '#aaa' }}>
        <p>© 2023 Driving App For Learner. All rights reserved.</p>
        <p>Created by Kevin Moenga</p>
      </footer>
    </>
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
  header: {
    textAlign: 'center',
    padding: '2.5rem 0 2rem',
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
    marginBottom: '2rem',
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
  comingGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  comingCard: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '14px',
    padding: '18px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    opacity: 0.45,
  },
  activeCard: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '14px',
    padding: '18px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    width: '100%',
  },
  comingIcon: {
    fontSize: '26px',
  },
  comingLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  comingSub: {
    fontSize: '11px',
    color: '#bbb',
  },
  activeSub: {
    fontSize: '11px',
    color: '#0F6E56',
    fontWeight: '500',
  },
}
