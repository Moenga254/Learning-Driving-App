import { useNavigate, useParams } from 'react-router-dom'

const subCategoryMeta = {
  prohibitory: {
    label: 'Prohibitory Signs',
    description: 'These signs tell you what you must NOT do. Disobeying them is a traffic offence.',
    color: '#A32D2D',
    bg: '#FCEBEB',
    border: '#E24B4A',
    examples: ['No entry', 'No U-turn', 'No overtaking', 'Speed limits'],
  },
  mandatory: {
    label: 'Mandatory Signs',
    description: 'These signs give instructions you MUST follow. They are usually blue circles.',
    color: '#0C447C',
    bg: '#E6F1FB',
    border: '#378ADD',
    examples: ['Keep left', 'Keep right', 'Turn left', 'Go straight'],
  },
  priority: {
    label: 'Priority Signs',
    description: 'These signs control who has the right of way at junctions and intersections.',
    color: '#3B6D11',
    bg: '#EAF3DE',
    border: '#639922',
    examples: ['Stop', 'Give way', 'Priority road', 'End of priority'],
  },
}

export default function SubCategory() {
  const { categoryId, subId } = useParams()
  const navigate = useNavigate()
  const meta = subCategoryMeta[subId]

  if (!meta) return <div style={styles.error}>Sub-category not found.</div>

  return (
    <div style={styles.page} className="page-transition">
      <div style={styles.container}>

        {/* Back button */}
        <button style={styles.back} onClick={() => navigate(`/category/${categoryId}`)}>
          ← Back
        </button>

        {/* Header badge */}
        <div style={{ ...styles.headerBadge, background: meta.bg, borderColor: meta.border }}>
          <h1 style={{ ...styles.title, color: meta.color }}>{meta.label}</h1>
          <p style={{ ...styles.subtitle, color: meta.color }}>{meta.description}</p>
        </div>

        {/* What to expect */}
        <p style={styles.sectionLabel}>Signs in this group</p>
        <div style={styles.exampleList}>
          {meta.examples.map((ex) => (
            <div key={ex} style={{ ...styles.exampleChip, background: meta.bg, borderColor: meta.border }}>
              <span style={{ color: meta.color, fontSize: '13px', fontWeight: '500' }}>{ex}</span>
            </div>
          ))}
        </div>

        {/* Browse button */}
        <button
          style={styles.browseBtn}
          onClick={() => navigate(`/category/${categoryId}/sub/${subId}/signs`)}
        >
          Browse Signs
        </button>

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
    padding: '1.25rem',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    margin: 0,
  },
  subtitle: {
    fontSize: '13px',
    marginTop: '6px',
    lineHeight: '1.6',
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
  exampleList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '2rem',
  },
  exampleChip: {
    padding: '6px 14px',
    borderRadius: '20px',
    border: '1px solid',
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
  },
}