import { useNavigate, useParams } from 'react-router-dom'
import signs from '../data/signs'

// Flatten all signs into one array for easy lookup by id
const allSigns = [
  ...signs.warning,
  ...signs.regulatory.prohibitory,
  ...signs.regulatory.mandatory,
  ...signs.regulatory.priority,
  ...signs.informational,
]

// Figure out which category/sub a sign belongs to for the back button
function getBackPath(signId) {
  if (signs.warning.find((s) => s.id === signId))
    return '/category/warning/signs'
  if (signs.regulatory.prohibitory.find((s) => s.id === signId))
    return '/category/regulatory/sub/prohibitory/signs'
  if (signs.regulatory.mandatory.find((s) => s.id === signId))
    return '/category/regulatory/sub/mandatory/signs'
  if (signs.regulatory.priority.find((s) => s.id === signId))
    return '/category/regulatory/sub/priority/signs'
  if (signs.informational.find((s) => s.id === signId))
    return '/category/informational/signs'
  return '/'
}

// Category label & color for the badge
function getCategoryMeta(signId) {
  if (signs.warning.find((s) => s.id === signId))
    return { label: 'Warning', color: '#854F0B', bg: '#FAEEDA', border: '#EF9F27' }
  if (signs.regulatory.prohibitory.find((s) => s.id === signId))
    return { label: 'Prohibitory', color: '#A32D2D', bg: '#FCEBEB', border: '#E24B4A' }
  if (signs.regulatory.mandatory.find((s) => s.id === signId))
    return { label: 'Mandatory', color: '#0C447C', bg: '#E6F1FB', border: '#378ADD' }
  if (signs.regulatory.priority.find((s) => s.id === signId))
    return { label: 'Priority', color: '#3B6D11', bg: '#EAF3DE', border: '#639922' }
  if (signs.informational.find((s) => s.id === signId))
    return { label: 'Informational', color: '#0F6E56', bg: '#E1F5EE', border: '#1D9E75' }
  return { label: '', color: '#888', bg: '#f0f0f0', border: '#ccc' }
}

export default function SignDetail() {
  const { signId } = useParams()
  const navigate = useNavigate()

  const sign = allSigns.find((s) => s.id === signId)
  const backPath = getBackPath(signId)
  const catMeta = getCategoryMeta(signId)

  if (!sign) {
    return (
      <div style={styles.page} className="page-transition">
        <div style={styles.container}>
          <button style={styles.back} onClick={() => navigate('/')}>← Back</button>
          <p style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>Sign not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page} className="page-transition">
      <div style={styles.container}>

        {/* Back button */}
        <button style={styles.back} onClick={() => navigate(backPath)}>
          ← Back
        </button>

        {/* Sign image card */}
        <div style={styles.imageCard}>
          <div style={styles.imgWrap}>
            <img
              src={sign.image}
              alt={sign.name}
              style={styles.img}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            {/* Fallback */}
            <div style={styles.imgFallback}>
              <span style={{ fontSize: '52px' }}>🪧</span>
            </div>
          </div>
        </div>

        {/* Category badge */}
        <div style={{ marginBottom: '12px' }}>
          <span style={{
            ...styles.badge,
            background: catMeta.bg,
            color: catMeta.color,
            border: `1px solid ${catMeta.border}`,
          }}>
            {catMeta.label}
          </span>
        </div>

        {/* Sign name */}
        <h1 style={styles.name}>{sign.name}</h1>

        {/* Meaning */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>Meaning</p>
          <div style={styles.sectionBox}>
            <p style={styles.sectionText}>{sign.meaning}</p>
          </div>
        </div>

        {/* Short description */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>Quick tip</p>
          <div style={styles.sectionBox}>
            <p style={styles.sectionText}>{sign.shortDesc}</p>
          </div>
        </div>

        {/* Full explanation */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>Full explanation</p>
          <div style={{ ...styles.sectionBox, ...styles.explanationBox }}>
            <p style={styles.explanationText}>{sign.explanation}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f7f7f5',
    padding: '0 0 3rem',
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
  imageCard: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '16px',
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.25rem',
  },
  imgWrap: {
    width: '160px',
    height: '160px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
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
  badge: {
    display: 'inline-block',
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  name: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 1.25rem',
  },
  section: {
    marginBottom: '1rem',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#aaa',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '6px',
  },
  sectionBox: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '12px',
    padding: '12px 14px',
  },
  sectionText: {
    fontSize: '14px',
    color: '#444',
    margin: 0,
    lineHeight: '1.5',
  },
  explanationBox: {
    background: '#fff',
    borderLeft: '3px solid #1a1a1a',
  },
  explanationText: {
    fontSize: '14px',
    color: '#333',
    margin: 0,
    lineHeight: '1.7',
  },
}