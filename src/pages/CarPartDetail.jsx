import { useNavigate, useParams } from 'react-router-dom'
import carParts from '../data/carParts'

// Flatten all parts for easy lookup
const allParts = Object.entries(carParts).flatMap(([sectionId, section]) =>
  section.parts.map((part) => ({ ...part, sectionId }))
)

export default function CarPartDetail() {
  const { sectionId, partId } = useParams()
  const navigate = useNavigate()

  const part = allParts.find((p) => p.id === partId)
  const section = carParts[sectionId]

  if (!part || !section) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <button style={styles.back} onClick={() => navigate('/car-parts')}>← Back</button>
          <p style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>Part not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page} className="page-transition">
      <div style={styles.container}>

        {/* Back */}
        <button style={styles.back} onClick={() => navigate(`/car-parts/${sectionId}`)}>
          ← Back
        </button>

        {/* Image card */}
        <div style={styles.imageCard}>
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
              <span style={{ fontSize: '52px' }}>{section.icon}</span>
            </div>
          </div>
        </div>

        {/* Section badge */}
        <div style={{ marginBottom: '12px' }}>
          <span style={{
            ...styles.badge,
            background: section.bg,
            color: section.color,
            border: `1px solid ${section.border}`,
          }}>
            {section.label}
          </span>
        </div>

        {/* Part name */}
        <h1 style={styles.name}>{part.name}</h1>

        {/* Description */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>What it does</p>
          <div style={{ ...styles.sectionBox, ...styles.descBox }}>
            <p style={styles.descText}>{part.shortDesc}</p>
          </div>
        </div>

        {/* Did you know */}
        <div style={styles.section}>
          <p style={styles.sectionLabel}>Remember</p>
          <div style={styles.sectionBox}>
            <p style={styles.sectionText}>
              {getRememberTip(part.id)}
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

// Extra tips per part to help learners remember
function getRememberTip(partId) {
  const tips = {
    ext1: 'The front bumper is the first line of defence. Never drive close to walls or other vehicles.',
    ext2: 'Check your rear bumper for cracks or damage — hidden damage can affect the car\'s safety sensors.',
    ext3: 'Always ensure the bonnet is fully latched before driving. A flying bonnet blocks your vision completely.',
    ext4: 'Switch on headlights at dusk, not just at full darkness. Make yourself visible early.',
    ext5: 'If your brake lights fail, drivers behind you cannot tell you are stopping — extremely dangerous.',
    ext6: 'Adjust both side mirrors before every trip. Blind spots cause most lane-change accidents.',
    ext7: 'A cracked windscreen can shatter under pressure. Get chips repaired early before they spread.',
    ext8: 'Test your wipers before the rainy season. Worn wiper blades leave dangerous smears.',
    ext9: 'Under-inflated tyres increase stopping distance and risk a blowout at high speed.',
    ext10: 'A loose fuel cap can trigger a warning light and cause fuel evaporation — always close it firmly.',
    eng1: 'Never open the bonnet while the engine is hot. Let it cool for at least 20 minutes first.',
    eng2: 'A dead battery is the most common breakdown cause. Check terminals for corrosion regularly.',
    eng3: 'If the temperature gauge rises into the red, pull over immediately — overheating destroys engines.',
    eng4: 'Check engine oil level every two weeks using the dipstick. Low oil causes serious engine damage.',
    eng5: 'Brake fluid is hygroscopic — it absorbs moisture over time. Replace it as per your service schedule.',
    eng6: 'A clogged air filter makes the engine work harder and burns more fuel. Replace it annually.',
    eng7: 'If your battery keeps dying, the alternator may be faulty — it should charge the battery while driving.',
    eng8: 'A snapped fan belt stops the alternator and water pump instantly. Listen for squealing sounds.',
    int1: 'Always hold the steering wheel with both hands. One-handed driving reduces control significantly.',
    int2: 'Always press the clutch fully before changing gears. Half-pressing causes gear grinding and wear.',
    int3: 'Never rest your foot on the brake pedal while driving — it causes brake fade and wear.',
    int4: 'Press the accelerator smoothly, not suddenly. Sudden acceleration wastes fuel and reduces control.',
    int5: 'Never change gears without pressing the clutch on a manual car. It damages the gearbox.',
    int6: 'Always apply the handbrake when parked on a slope, even if in gear.',
    int7: 'A warning light on the dashboard should never be ignored — get it checked immediately.',
    int8: 'Glance at the speedometer regularly, especially after overtaking — it\'s easy to speed without noticing.',
    int9: 'Adjust the rear view mirror so you see the full rear window without moving your head.',
  }
  return tips[partId] || 'Understanding this part helps you maintain your vehicle and drive safely.'
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
    lineHeight: '1.6',
  },
  descBox: {
    borderLeft: '3px solid #1a1a1a',
  },
  descText: {
    fontSize: '14px',
    color: '#333',
    margin: 0,
    lineHeight: '1.7',
    fontWeight: '500',
  },
}