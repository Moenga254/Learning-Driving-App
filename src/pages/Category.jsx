import { useNavigate, useParams } from 'react-router-dom'

const categoryMeta = {
  warning: {
    label: 'Warning Signs',
    description: 'Hazards and dangers ahead — stay alert',
    color: '#854F0B',
    bg: '#FAEEDA',
    border: '#EF9F27',
  },
  regulatory: {
    label: 'Regulatory Signs',
    description: 'Lawful orders you must obey on the road',
    color: '#A32D2D',
    bg: '#FCEBEB',
    border: '#E24B4A',
  },
  informational: {
    label: 'Informational Signs',
    description: 'Guidance and useful facilities on the road',
    color: '#0F6E56',
    bg: '#E1F5EE',
    border: '#1D9E75',
  },
}

const subCategories = [
  {
    id: 'prohibitory',
    label: 'Prohibitory',
    description: 'Things you must NOT do',
    icon: '🚫',
    count: '18 signs',
  },
  {
    id: 'mandatory',
    label: 'Mandatory',
    description: 'Things you MUST do',
    icon: '🔵',
    count: '12 signs',
  },
  {
    id: 'priority',
    label: 'Priority',
    description: 'Who has right of way',
    icon: '⛔',
    count: '2 signs',
  },
]

export default function Category() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const meta = categoryMeta[categoryId]

  if (!meta) return <div style={styles.error}>Category not found.</div>

  return (
    <div style={styles.page} className="page-transition">
      <div style={styles.container}>

        {/* Back button */}
        <button style={styles.back} onClick={() => navigate('/')}>
          ← Back
        </button>

        {/* Header */}
        <div style={{ ...styles.headerBadge, background: meta.bg, borderColor: meta.border }}>
          <h1 style={{ ...styles.title, color: meta.color }}>{meta.label}</h1>
          <p style={{ ...styles.subtitle, color: meta.color }}>{meta.description}</p>
        </div>

        {/* Regulatory → show sub-categories */}
        {categoryId === 'regulatory' && (
          <>
            <p style={styles.sectionLabel}>Select a group</p>
            <div style={styles.cardList}>
              {subCategories.map((sub) => (
                <button
                  key={sub.id}
                  style={styles.card}
                  onClick={() => navigate(`/category/regulatory/sub/${sub.id}`)}
                >
                  <div style={styles.subIcon}>{sub.icon}</div>
                  <div style={styles.cardText}>
                    <span style={styles.cardLabel}>{sub.label}</span>
                    <span style={styles.cardDesc}>{sub.description}</span>
                  </div>
                  <span style={styles.cardCount}>{sub.count}</span>
                </button>
              ))}
            </div>

            {/* Quiz button for Regulatory */}
            <button
              style={styles.quizBtn}
              onClick={() => navigate(`/quiz/${categoryId}`)}
            >
              Practice Quiz — All Regulatory Signs
            </button>
          </>
        )}

        {/* Warning / Informational → go straight to sign list */}
        {categoryId !== 'regulatory' && (
          <>
            <button
              style={styles.browseBtn}
              onClick={() => navigate(`/category/${categoryId}/signs`)}
            >
              Browse Signs
            </button>

            <button
              style={styles.quizBtn}
              onClick={() => navigate(`/quiz/${categoryId}`)}
            >
              Practice Quiz
            </button>
          </>
        )}

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
  error: {
    padding: '2rem',
    textAlign: 'center',
    color: '#888',
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
    padding: '1.25rem 1.25rem',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
  },
  subtitle: {
    fontSize: '13px',
    marginTop: '4px',
    opacity: 0.85,
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
    marginBottom: '1.5rem',
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
  subIcon: {
    fontSize: '24px',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f7f7f5',
    borderRadius: '10px',
    flexShrink: 0,
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
    background: '#f7f7f5',
    color: '#888',
    flexShrink: 0,
  },
  browseBtn: {
    width: '100%',
    padding: '14px',
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  quizBtn: {
    width: '100%',
    padding: '14px',
    background: '#fff',
    color: '#1a1a1a',
    border: '1px solid #e8e8e6',
    borderRadius: '14px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
  },
}