import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import signs from '../data/signs'

// Flatten all signs per top-level category
function getSignsForCategory(categoryId) {
  if (categoryId === 'warning') return signs.warning
  if (categoryId === 'informational') return signs.informational
  if (categoryId === 'regulatory') {
    return [
      ...signs.regulatory.prohibitory,
      ...signs.regulatory.mandatory,
      ...signs.regulatory.priority,
    ]
  }
  return []
}

const categoryMeta = {
  warning: {
    label: 'Warning',
    color: '#854F0B',
    bg: '#FAEEDA',
    border: '#EF9F27',
  },
  regulatory: {
    label: 'Regulatory',
    color: '#A32D2D',
    bg: '#FCEBEB',
    border: '#E24B4A',
  },
  informational: {
    label: 'Informational',
    color: '#0F6E56',
    bg: '#E1F5EE',
    border: '#1D9E75',
  },
}

// Shuffle helper
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

// Build quiz questions — each Q shows a sign image, 4 MCQ options (meanings)
function buildQuestions(signList, total = 8) {
  const shuffled = shuffle(signList).slice(0, total)
  return shuffled.map((sign) => {
    const wrongPool = signList.filter((s) => s.id !== sign.id)
    const wrongs = shuffle(wrongPool).slice(0, 3)
    const options = shuffle([...wrongs, sign])
    return {
      sign,
      options,
      correctId: sign.id,
    }
  })
}

const TOTAL_QUESTIONS = 8

export default function Quiz() {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const meta = categoryMeta[categoryId]

  const [quizState, setQuizState] = useState(() => {
    const signList = getSignsForCategory(categoryId)
    const qs = buildQuestions(signList, Math.min(TOTAL_QUESTIONS, signList.length))
    return {
      questions: qs,
      current: 0,
      selected: null,
      score: 0,
      finished: false,
    }
  })

  const { questions, current, selected, score, finished } = quizState

  if (!meta) return <div style={styles.page} className="page-transition"><p style={styles.error}>Category not found.</p></div>
  if (questions.length === 0) return <div style={styles.page} className="page-transition"><p style={styles.error}>Loading...</p></div>

  const q = questions[current]
  const isAnswered = selected !== null
  const isCorrect = selected === q?.correctId
  const progress = ((current) / questions.length) * 100
  const pct = Math.round((score / questions.length) * 100)

  function handleSelect(optionId) {
    if (isAnswered) return
    const newScore = optionId === q.correctId ? score + 1 : score
    setQuizState((prev) => ({ ...prev, selected: optionId, score: newScore }))
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setQuizState((prev) => ({ ...prev, finished: true }))
    } else {
      setQuizState((prev) => ({ ...prev, current: prev.current + 1, selected: null }))
    }
  }

  function handleRestart() {
    const signList = getSignsForCategory(categoryId)
    const qs = buildQuestions(signList, Math.min(TOTAL_QUESTIONS, signList.length))
    setQuizState({
      questions: qs,
      current: 0,
      selected: null,
      score: 0,
      finished: false,
    })
  }

  // Results screen
  if (finished) {
    const passed = pct >= 70
    return (
      <div style={styles.page} className="page-transition">
        <div style={styles.container}>
          <button style={styles.back} onClick={() => navigate(`/category/${categoryId}`)}>
            ← Back
          </button>

          {/* Score card */}
          <div style={{
            ...styles.scoreCard,
            background: passed ? '#E9F7EF' : '#FCEBEB',
            borderColor: passed ? '#1D9E75' : '#E24B4A',
          }}>
            <div style={styles.scoreEmoji}>{passed ? '🎉' : '📚'}</div>
            <div style={{
              ...styles.scoreBig,
              color: passed ? '#0F6E56' : '#A32D2D',
            }}>
              {score}/{questions.length}
            </div>
            <div style={{
              ...styles.scorePct,
              color: passed ? '#0F6E56' : '#A32D2D',
            }}>
              {pct}% — {passed ? 'Well done!' : 'Keep practising'}
            </div>
          </div>

          {/* Breakdown */}
          <div style={styles.breakdown}>
            <div style={styles.breakdownItem}>
              <span style={styles.breakdownLabel}>Correct</span>
              <span style={{ ...styles.breakdownVal, color: '#0F6E56' }}>{score}</span>
            </div>
            <div style={styles.breakdownDivider} />
            <div style={styles.breakdownItem}>
              <span style={styles.breakdownLabel}>Wrong</span>
              <span style={{ ...styles.breakdownVal, color: '#A32D2D' }}>{questions.length - score}</span>
            </div>
            <div style={styles.breakdownDivider} />
            <div style={styles.breakdownItem}>
              <span style={styles.breakdownLabel}>Total</span>
              <span style={styles.breakdownVal}>{questions.length}</span>
            </div>
          </div>

          {/* Actions */}
          <button style={styles.primaryBtn} onClick={handleRestart}>
            Try again
          </button>
          <button style={styles.secondaryBtn} onClick={() => navigate(`/category/${categoryId}`)}>
            Back to {meta.label}
          </button>
        </div>
      </div>
    )
  }

  // Quiz question screen
  return (
    <div style={styles.page} className="page-transition">
      <div style={styles.container}>

        {/* Back */}
        <button style={styles.back} onClick={() => navigate(`/category/${categoryId}`)}>
          ← Back
        </button>

        {/* Progress bar */}
        <div style={styles.progressWrap}>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressFill, width: `${progress}%`, background: meta.color }} />
          </div>
          <span style={styles.progressLabel}>{current + 1} / {questions.length}</span>
        </div>

        {/* Question card */}
        <div style={styles.questionCard}>
          <p style={styles.questionText}>What does this sign mean?</p>

          {/* Sign image */}
          <div style={styles.signImgWrap}>
            <img
              src={q.sign.image}
              alt={q.sign.name}
              style={styles.signImg}
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div style={styles.signImgFallback}>
              <span style={{ fontSize: '44px' }}>🪧</span>
            </div>
          </div>
        </div>

        {/* Options */}
        <div style={styles.options}>
          {q.options.map((option) => {
            const isSelected = selected === option.id
            const isThisCorrect = option.id === q.correctId

            let optStyle = { ...styles.option }
            if (isAnswered) {
              if (isThisCorrect) {
                optStyle = { ...optStyle, ...styles.optionCorrect }
              } else if (isSelected && !isThisCorrect) {
                optStyle = { ...optStyle, ...styles.optionWrong }
              } else {
                optStyle = { ...optStyle, ...styles.optionDimmed }
              }
            }

            return (
              <button
                key={option.id}
                style={optStyle}
                onClick={() => handleSelect(option.id)}
                disabled={isAnswered}
              >
                <span style={styles.optionText}>{option.meaning}</span>
                {isAnswered && isThisCorrect && (
                  <span style={styles.optionIcon}>✓</span>
                )}
                {isAnswered && isSelected && !isThisCorrect && (
                  <span style={styles.optionIcon}>✗</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback + Next */}
        {isAnswered && (
          <div style={styles.feedbackWrap}>
            <div style={{
              ...styles.feedbackBox,
              background: isCorrect ? '#E9F7EF' : '#FCEBEB',
              borderColor: isCorrect ? '#1D9E75' : '#E24B4A',
            }}>
              <p style={{
                ...styles.feedbackText,
                color: isCorrect ? '#0F6E56' : '#A32D2D',
              }}>
                {isCorrect
                  ? '✓ Correct!'
                  : `✗ It means: "${q.sign.meaning}"`}
              </p>
              {!isCorrect && (
                <p style={styles.feedbackHint}>{q.sign.shortDesc}</p>
              )}
            </div>
            <button style={styles.nextBtn} onClick={handleNext}>
              {current + 1 >= questions.length ? 'See results' : 'Next →'}
            </button>
          </div>
        )}

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
  error: {
    textAlign: 'center',
    color: '#888',
    marginTop: '2rem',
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
  progressWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '1.25rem',
  },
  progressTrack: {
    flex: 1,
    height: '6px',
    background: '#e8e8e6',
    borderRadius: '99px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '99px',
    transition: 'width 0.3s ease',
  },
  progressLabel: {
    fontSize: '13px',
    color: '#888',
    flexShrink: 0,
  },
  questionCard: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '16px',
    padding: '1.5rem',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  questionText: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '1.25rem',
  },
  signImgWrap: {
    width: '130px',
    height: '130px',
    margin: '0 auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  signImgFallback: {
    display: 'none',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '1rem',
  },
  option: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '12px',
    padding: '13px 16px',
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.15s',
  },
  optionCorrect: {
    background: '#E9F7EF',
    borderColor: '#1D9E75',
  },
  optionWrong: {
    background: '#FCEBEB',
    borderColor: '#E24B4A',
  },
  optionDimmed: {
    opacity: 0.4,
  },
  optionText: {
    fontSize: '14px',
    color: '#1a1a1a',
  },
  optionIcon: {
    fontSize: '16px',
    fontWeight: '700',
  },
  feedbackWrap: {
    marginTop: '4px',
  },
  feedbackBox: {
    borderRadius: '12px',
    border: '1px solid',
    padding: '12px 14px',
    marginBottom: '10px',
  },
  feedbackText: {
    fontSize: '14px',
    fontWeight: '600',
    margin: 0,
  },
  feedbackHint: {
    fontSize: '13px',
    color: '#888',
    margin: '4px 0 0',
  },
  nextBtn: {
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
  scoreCard: {
    borderRadius: '16px',
    border: '1px solid',
    padding: '2rem',
    textAlign: 'center',
    marginBottom: '1.25rem',
  },
  scoreEmoji: {
    fontSize: '40px',
    marginBottom: '8px',
  },
  scoreBig: {
    fontSize: '42px',
    fontWeight: '700',
  },
  scorePct: {
    fontSize: '16px',
    fontWeight: '500',
    marginTop: '4px',
  },
  breakdown: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '14px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.25rem',
  },
  breakdownItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  breakdownDivider: {
    width: '1px',
    height: '32px',
    background: '#e8e8e6',
  },
  breakdownLabel: {
    fontSize: '12px',
    color: '#aaa',
    fontWeight: '500',
  },
  breakdownVal: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  primaryBtn: {
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
  secondaryBtn: {
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