import { useNavigate, useParams } from 'react-router-dom'
import signs from '../data/signs'

const categoryMeta = {
  warning: {
    label: 'Warning Signs',
    color: '#854F0B',
    bg: '#FAEEDA',
    border: '#EF9F27',
  },
  regulatory: {
    label: 'Regulatory Signs',
    color: '#A32D2D',
    bg: '#FCEBEB',
    border: '#E24B4A',
  },
  informational: {
    label: 'Informational Signs',
    color: '#0F6E56',
    bg: '#E1F5EE',
    border: '#1D9E75',
  },
}

const subCategoryMeta = {
  prohibitory: {
    label: 'Prohibitory Signs',
    color: '#A32D2D',
    bg: '#FCEBEB',
    border: '#E24B4A',
  },
  mandatory: {
    label: 'Mandatory Signs',
    color: '#0C447C',
    bg: '#E6F1FB',
    border: '#378ADD',
  },
  priority: {
    label: 'Priority Signs',
    color: '#3B6D11',
    bg: '#EAF3DE',
    border: '#639922',
  },
}

export default function SignList() {
  const { categoryId, subId } = useParams()
  const navigate = useNavigate()

  let signList = []
  let meta = {}
  let backPath = '/'

  if (subId) {
    signList = signs.regulatory[subId] || []
    meta = subCategoryMeta[subId] || {}
    backPath = `/category/${categoryId}/sub/${subId}`
  } else {
    signList = signs[categoryId] || []
    meta = categoryMeta[categoryId] || {}
    backPath = `/category/${categoryId}`
  }

  return (
    <div style={styles.page} className="page-transition">
      <div style={styles.container}>

        {/* Back button */}
        <button style={styles.back} onClick={() => navigate(backPath)}>
          ← Back
        </button>

        {/* Header */}
        <div style={{ ...styles.headerBadge, background: meta.bg, borderColor: meta.border }}>
          <h1 style={{ ...styles.title, color: meta.color }}>{meta.label}</h1>
          <p style={{ ...styles.count, color: meta.color }}>{signList.length} signs</p>
        </div>

        {/* Sign grid */}
        <div style={styles.grid}>
          {signList.map((sign) => (
            <button
              key={sign.id}
              style={styles.card}
              onClick={() => navigate(`/sign/${sign.id}`)}
            >
              {/* Sign image */}
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
                {/* Fallback placeholder */}
                <div style={styles.imgFallback}>
                  <span style={{ fontSize: '28px' }}>🪧</span>
                </div>
              </div>

              {/* Sign info */}
              <div style={styles.cardBody}>
                <span style={styles.cardName}>{sign.name}</span>
                <span style={styles.cardMeaning}>{sign.meaning}</span>
                <span style={styles.cardShortDesc}>{sign.shortDesc}</span>
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
    gap: '3px',
  },
  cardName: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  cardMeaning: {
    fontSize: '12px',
    color: '#555',
  },
  cardShortDesc: {
    fontSize: '11px',
    color: '#999',
    lineHeight: '1.4',
    marginTop: '2px',
  },
}