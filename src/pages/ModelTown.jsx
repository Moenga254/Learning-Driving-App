import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const scenarios = [
  {
    id: 'scenario-1',
    title: 'Downtown Intersection',
    description: 'Navigate a busy downtown intersection with traffic lights and pedestrians.',
    difficulty: 'Easy',
    icon: '🏙️',
    questions: [
      {
        id: 'q1',
        question: 'You approach a traffic light that just turned amber. What should you do?',
        options: [
          'Speed up to get through before it turns red',
          'Stop safely if you can do so without harsh braking',
          'Continue at the same speed',
          'Sound your horn and proceed',
        ],
        correct: 1,
        explanation: 'Amber means prepare to stop. Only continue if stopping would be unsafe. Never speed up through an amber light.',
      },
      {
        id: 'q2',
        question: 'A pedestrian steps onto a zebra crossing ahead. What do you do?',
        options: [
          'Hoot to warn them and continue',
          'Slow down but only stop if they are directly in your path',
          'Stop and give way to the pedestrian',
          'Flash your lights and drive around them',
        ],
        correct: 2,
        explanation: 'You must always give way to pedestrians on a zebra crossing. Stop and wait until they have fully crossed.',
      },
      {
        id: 'q3',
        question: 'You are at a green light but there is a queue of vehicles blocking the intersection. What should you do?',
        options: [
          'Proceed since the light is green',
          'Wait until the intersection is clear before moving forward',
          'Hoot at the vehicles ahead',
          'Change lanes and go around',
        ],
        correct: 1,
        explanation: 'Never enter an intersection unless you can clear it completely. Blocking an intersection is illegal and causes gridlock.',
      },
      {
        id: 'q4',
        question: 'You are turning right at a junction and an oncoming vehicle is also turning right. Which is the safest path?',
        options: [
          'Pass offside to offside (right side to right side), keeping the other vehicle on your left',
          'Pass nearside to nearside (left side to left side), cutting across the other vehicle\'s path',
          'Stop completely and wait for the other vehicle to finish its turn first',
          'Accelerate and complete your turn before the other vehicle reaches you',
        ],
        correct: 0,
        explanation: 'The offside-to-offside method keeps both vehicles\' paths clear of each other and gives both drivers better visibility of oncoming traffic before completing the turn.',
      },
      {
        id: 'q5',
        question: 'A traffic officer\'s signal contradicts a green traffic light. What should you do?',
        options: [
          'Obey the traffic light — it is a fixed system',
          'Obey the traffic officer — their signals take precedence over lights',
          'Stop and wait for both signals to agree',
          'Proceed slowly and let the officer decide',
        ],
        correct: 1,
        explanation: 'A traffic officer\'s signals always override traffic lights. Officers are present to manage situations the fixed system cannot handle — always follow their instructions.',
      },
      {
        id: 'q6',
        question: 'You are waiting to turn right and oncoming traffic is continuous. When is it safe to go?',
        options: [
          'When you judge you can just make it before the next vehicle arrives',
          'When there is a gap large enough to complete the turn comfortably without forcing anyone to brake',
          'After waiting 30 seconds regardless of traffic',
          'Whenever the vehicle behind you hoots',
        ],
        correct: 1,
        explanation: 'Only turn when there is a clearly safe gap. Never rely on oncoming drivers to slow for you. A "just make it" gap is not a safe gap.',
      },
    ],
  },
  {
    id: 'scenario-2',
    title: 'Residential Zone',
    description: 'Drive through a residential area with parked cars, children and speed limits.',
    difficulty: 'Easy',
    icon: '🏘️',
    questions: [
      {
        id: 'q1',
        question: 'You are driving in a residential area with a 30 km/h sign. A child runs near the road. What do you do?',
        options: [
          'Maintain 30 km/h since you are within the limit',
          'Reduce speed further and be ready to stop immediately',
          'Sound your horn to warn the child',
          'Move to the center of the road',
        ],
        correct: 1,
        explanation: 'Speed limits are maximums not targets. When children are nearby you must reduce speed further and be prepared to stop at any moment.',
      },
      {
        id: 'q2',
        question: 'You are passing a row of parked cars. What is the main hazard?',
        options: [
          'The parked cars may block road signs',
          'A car door may open suddenly into your path',
          'Parked cars reduce road width only',
          'There are no hazards if you stay in your lane',
        ],
        correct: 1,
        explanation: 'Car doors opening suddenly is a major hazard. Always leave enough gap when passing parked cars to allow for a door opening.',
      },
      {
        id: 'q3',
        question: 'A ball rolls onto the road from between two parked cars. What should you expect?',
        options: [
          'Nothing — it is just a ball',
          'A child may follow the ball onto the road',
          'The ball will stop before reaching you',
          'Other drivers will warn you',
        ],
        correct: 1,
        explanation: 'A ball on the road almost always means a child is following. Slow down immediately and be ready to stop.',
      },
      {
        id: 'q4',
        question: 'You are driving at 30 km/h and a child darts out 15 metres ahead. Can you stop in time on a dry road?',
        options: [
          'Yes — 30 km/h is slow enough to always stop in time',
          'It depends on your reaction time and braking distance — you may not stop in time',
          'No — you can never stop within 15 metres at any speed',
          'Yes — modern ABS systems always prevent hitting pedestrians',
        ],
        correct: 1,
        explanation: 'At 30 km/h, total stopping distance (thinking + braking) is roughly 14–18 metres on a dry road. A child at 15 m is within that range. Speed, reaction time and road surface all affect whether you stop in time.',
      },
      {
        id: 'q5',
        question: 'You see a school bus stopped ahead with its hazard lights on and children getting off. What must you do?',
        options: [
          'Slow down, be prepared to stop, and give children space to cross',
          'Overtake quickly before more children get off',
          'Hoot to alert children and proceed at normal speed',
          'Move to the opposite lane and pass at the same speed',
        ],
        correct: 0,
        explanation: 'Children near a stopped school bus are an extreme hazard. Slow right down, be ready to stop, and never overtake until the road is completely clear.',
      },
      {
        id: 'q6',
        question: 'At night, you are driving through a residential area. A pedestrian wearing dark clothing steps off the pavement 20 m ahead. What is your greatest challenge?',
        options: [
          'The pedestrian breaking traffic law by crossing without a light',
          'Reduced visibility making it harder to spot the pedestrian early enough to stop safely',
          'Glare from streetlights affecting your vision',
          'Your speed limit being different at night',
        ],
        correct: 1,
        explanation: 'Dark clothing dramatically reduces how early you can spot a pedestrian at night. This is why night driving requires much greater caution and reduced speed even in residential zones.',
      },
    ],
  },
  {
    id: 'scenario-3',
    title: 'Roundabout',
    description: 'Master the rules of navigating a roundabout with proper lane selection.',
    difficulty: 'Medium',
    icon: '🔄',
    questions: [
      {
        id: 'q1',
        question: 'You are approaching a roundabout. Who has priority?',
        options: [
          'Vehicles entering the roundabout',
          'Vehicles already inside the roundabout',
          'The largest vehicle',
          'The vehicle on the right',
        ],
        correct: 1,
        explanation: 'Vehicles already inside the roundabout always have priority. You must give way before entering and only proceed when it is safe.',
      },
      {
        id: 'q2',
        question: 'You want to take the third exit at a roundabout. Which lane should you use to enter?',
        options: [
          'Left lane',
          'Any lane — it does not matter',
          'Right lane',
          'Center lane only',
        ],
        correct: 2,
        explanation: 'For exits past the halfway point (third exit or more) you should use the right lane when entering the roundabout.',
      },
      {
        id: 'q3',
        question: 'When should you signal left at a roundabout?',
        options: [
          'Before entering the roundabout',
          'As you pass the exit before the one you want',
          'Only when you have already exited',
          'You do not need to signal at roundabouts',
        ],
        correct: 1,
        explanation: 'Signal left as you pass the exit just before the one you intend to take. This lets other drivers know you are about to leave the roundabout.',
      },
      {
        id: 'q4',
        question: 'You are in the right lane of a two-lane roundabout. You have passed your intended exit by mistake. What should you do?',
        options: [
          'Stop and reverse to the correct exit',
          'Cut across lanes immediately to take the next exit',
          'Continue around the roundabout and take the correct exit on your next pass',
          'Signal left and force your way out regardless of other vehicles',
        ],
        correct: 2,
        explanation: 'Never reverse or cut lanes dangerously. Go around again and take the correct exit — this is the safest and legally correct approach.',
      },
      {
        id: 'q5',
        question: 'A large truck is already in the roundabout and its rear is swinging toward your lane as it navigates a tight turn. What should you do?',
        options: [
          'Hoot and maintain your position — you are in your lane',
          'Hold back and give the truck extra space even if it means waiting',
          'Accelerate past before the truck reaches you',
          'Move to the outer edge of your lane to give the truck half your space',
        ],
        correct: 1,
        explanation: 'Large vehicles require extra room due to off-tracking (the rear wheels cut corners). Always give them wide berth — your legal right of way is irrelevant if you are crushed.',
      },
      {
        id: 'q6',
        question: 'You are taking the first exit (immediately left) at a roundabout. Which lane and signal should you use?',
        options: [
          'Right lane, no signal needed',
          'Left lane, signal left on approach and maintain it through the roundabout',
          'Left lane, no signal needed since it is the first exit',
          'Any lane, signal right on approach',
        ],
        correct: 1,
        explanation: 'For the first exit you approach in the left lane and signal left on approach. Maintain the left signal throughout so other drivers know you are exiting immediately.',
      },
    ],
  },
  {
    id: 'scenario-4',
    title: 'Highway Merging',
    description: 'Safely merge onto a busy highway with proper speed and positioning.',
    difficulty: 'Medium',
    icon: '🛣️',
    questions: [
      {
        id: 'q1',
        question: 'You are on an acceleration lane joining a highway. What should you do?',
        options: [
          'Stop and wait for a gap in traffic',
          'Match the speed of highway traffic and merge smoothly',
          'Force your way in — you have right of way',
          'Slow down and signal to ask for space',
        ],
        correct: 1,
        explanation: 'On a highway slip road you must accelerate to match highway speed and merge smoothly into a safe gap. Never stop on an acceleration lane.',
      },
      {
        id: 'q2',
        question: 'What is a safe following distance on a highway at 100 km/h?',
        options: [
          '10 meters',
          'At least 2 seconds gap — roughly 55 meters',
          '5 car lengths',
          'Whatever feels comfortable',
        ],
        correct: 1,
        explanation: 'At 100 km/h you need at least a 2-second gap from the vehicle ahead — about 55 meters. In wet conditions double this to 4 seconds.',
      },
      {
        id: 'q3',
        question: 'You want to overtake on a highway. What must you check first?',
        options: [
          'That your vehicle can go faster',
          'Mirrors, blind spot and that the lane ahead is clear for a safe distance',
          'That no one behind you is also overtaking',
          'That the speed limit allows it',
        ],
        correct: 1,
        explanation: 'Before overtaking always check your mirrors, then your blind spot by glancing over your shoulder, and confirm the lane ahead is clear for a long enough distance to complete the manoeuvre safely.',
      },
      {
        id: 'q4',
        question: 'Your tyre blows out at 110 km/h on the highway. What is the correct immediate response?',
        options: [
          'Brake hard immediately and steer to the shoulder',
          'Hold the steering wheel firmly, ease off the accelerator gradually, and steer straight — brake gently only once you have control',
          'Steer sharply to the emergency lane and apply full brakes',
          'Switch on your hazards and maintain speed until you reach an exit',
        ],
        correct: 1,
        explanation: 'A sudden blowout can pull the car violently. Hard braking or sharp steering causes loss of control. Grip firmly, ease off the throttle gradually, let the car slow naturally, then brake gently to reach the shoulder.',
      },
      {
        id: 'q5',
        question: 'You are in the fast lane of a three-lane highway and a vehicle behind is flashing its lights at you. What should you do?',
        options: [
          'Maintain your speed — it is their problem',
          'Brake slightly to teach them a lesson',
          'Move to the middle lane when safe to let the vehicle pass',
          'Accelerate to match their desired speed',
        ],
        correct: 2,
        explanation: 'The fast lane is for overtaking, not cruising. Once you have passed vehicles to your left, move back. Hogging the fast lane is illegal in many countries and causes dangerous situations.',
      },
      {
        id: 'q6',
        question: 'You are driving at 120 km/h and the vehicle ahead brakes suddenly. What is the biggest factor determining whether you avoid a collision?',
        options: [
          'The quality of your brakes',
          'Your following distance and reaction time combined',
          'Whether you have ABS',
          'The weight of your vehicle',
        ],
        correct: 1,
        explanation: 'At high speed, even excellent brakes cannot save you without adequate following distance. Your reaction time alone consumes metres before braking even begins — following distance is the most critical factor.',
      },
    ],
  },
  {
    id: 'scenario-5',
    title: 'Night Driving',
    description: 'Navigate safely in low-light conditions with proper use of headlights.',
    difficulty: 'Hard',
    icon: '🌙',
    questions: [
      {
        id: 'q1',
        question: 'When should you switch from full beam to dipped headlights?',
        options: [
          'Only in the city',
          'When an oncoming vehicle approaches or you are following another car',
          'Full beam is always better at night',
          'When you see a road sign',
        ],
        correct: 1,
        explanation: 'Switch to dipped headlights whenever there is oncoming traffic or you are behind another vehicle. Full beam blinds other drivers and is dangerous.',
      },
      {
        id: 'q2',
        question: 'Your visibility is reduced at night. How should you adjust your speed?',
        options: [
          'Keep the same speed as during the day',
          'Reduce speed so you can stop within the distance lit by your headlights',
          'Increase speed to spend less time on dark roads',
          'Speed does not matter at night',
        ],
        correct: 1,
        explanation: 'At night you must drive at a speed that allows you to stop within the distance your headlights illuminate. This is called driving within your light.',
      },
      {
        id: 'q3',
        question: 'You feel drowsy while driving at night on a long trip. What should you do?',
        options: [
          'Open the windows and continue',
          'Turn up the radio and push through',
          'Pull over safely and rest before continuing',
          'Drink coffee and speed up to finish faster',
        ],
        correct: 2,
        explanation: 'Driver fatigue is as dangerous as drunk driving. The only safe solution is to pull over and rest. No trick like music or coffee eliminates the danger of drowsiness.',
      },
      {
        id: 'q4',
        question: 'An oncoming vehicle fails to dip its full beam, temporarily blinding you. What is the correct response?',
        options: [
          'Flash your full beam back repeatedly until they dip',
          'Slow down, look to the left edge of the road, and avoid staring into the oncoming lights',
          'Brake hard and stop immediately',
          'Close your eyes momentarily and maintain your lane by feel',
        ],
        correct: 1,
        explanation: 'Staring at oncoming lights worsens temporary blindness. Slow down, focus on the left edge of your lane, and wait for your eyes to readjust. Never retaliate with full beam — it blinds them too.',
      },
      {
        id: 'q5',
        question: 'Your headlights illuminate a pedestrian on the road about 40 m ahead at night. You are travelling at 80 km/h. What is the likely outcome if you brake normally?',
        options: [
          'You will stop comfortably before reaching them',
          'You will likely be unable to stop in time — stopping distance at 80 km/h exceeds 50 m',
          'ABS will ensure you stop within 20 m',
          'You will stop exactly at their position',
        ],
        correct: 1,
        explanation: 'At 80 km/h, total stopping distance is approximately 53 m on a dry road. At 40 m, you cannot stop in time — this is exactly why night speed must be kept within your headlight range.',
      },
      {
        id: 'q6',
        question: 'You are driving on an unlit rural road at night. A large animal appears in your headlights directly ahead. What should you do?',
        options: [
          'Swerve hard to avoid it at all costs',
          'Brake firmly in a straight line rather than swerving, and sound your horn',
          'Accelerate through to minimise impact time',
          'Switch to full beam and continue — animals always move away from light',
        ],
        correct: 1,
        explanation: 'Swerving at speed can cause a rollover or head-on collision — often worse than hitting the animal. Brake hard in a straight line to reduce speed as much as possible. Swerve only if you have enough space and speed is low.',
      },
    ],
  },
]

const difficultyColors = {
  Easy: { color: '#0F6E56', bg: '#E1F5EE', border: '#1D9E75' },
  Medium: { color: '#854F0B', bg: '#FAEEDA', border: '#EF9F27' },
  Hard: { color: '#A32D2D', bg: '#FCEBEB', border: '#E24B4A' },
}

export default function ModelTown() {
  const navigate = useNavigate()
  const [view, setView] = useState('list')
  const [activeScenario, setActiveScenario] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [completed, setCompleted] = useState([])

  function startScenario(scenario) {
    setActiveScenario(scenario)
    setView('detail')
  }

  function startQuiz() {
    setCurrentQ(0)
    setSelected(null)
    setScore(0)
    setAnswered(false)
    setView('quiz')
  }

  function handleAnswer(idx) {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === activeScenario.questions[currentQ].correct) {
      setScore(s => s + 1)
    }
  }

  function handleNext() {
    if (currentQ + 1 >= activeScenario.questions.length) {
      if (!completed.includes(activeScenario.id)) {
        setCompleted(c => [...c, activeScenario.id])
      }
      setView('result')
    } else {
      setCurrentQ(q => q + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const completionPct = Math.round((completed.length / scenarios.length) * 100)

  // ─── LIST VIEW ────────────────────────────────────────────
  if (view === 'list') {
    return (
      <div style={styles.page} className="page-transition">
        <div style={styles.container}>
          <button style={styles.back} onClick={() => navigate('/')}>← Back</button>

          <div style={styles.header}>
            <h1 style={styles.title}>Model Town</h1>
            <p style={styles.subtitle}>Practice real-world driving scenarios</p>
          </div>

          <div style={styles.progressCard}>
            <div style={styles.progressTop}>
              <span style={styles.progressLabel}>Your progress</span>
              <span style={styles.progressPct}>{completionPct}%</span>
            </div>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${completionPct}%` }} />
            </div>
            <p style={styles.progressSub}>{completed.length} of {scenarios.length} scenarios completed</p>
          </div>

          <p style={styles.sectionLabel}>Available scenarios</p>
          <div style={styles.cardList}>
            {scenarios.map(scenario => {
              const diff = difficultyColors[scenario.difficulty]
              const isDone = completed.includes(scenario.id)
              return (
                <button
                  key={scenario.id}
                  style={styles.card}
                  onClick={() => startScenario(scenario)}
                >
                  <div style={{ ...styles.iconWrap, background: diff.bg, border: `1px solid ${diff.border}` }}>
                    <span style={styles.icon}>{scenario.icon}</span>
                  </div>
                  <div style={styles.cardText}>
                    <div style={styles.cardTop}>
                      <span style={styles.cardLabel}>{scenario.title}</span>
                      {isDone && <span style={styles.doneBadge}>✓ Done</span>}
                    </div>
                    <span style={styles.cardDesc}>{scenario.description}</span>
                  </div>
                  <span style={{ ...styles.diffBadge, background: diff.bg, color: diff.color }}>
                    {scenario.difficulty}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ─── DETAIL VIEW ──────────────────────────────────────────
  if (view === 'detail' && activeScenario) {
    const diff = difficultyColors[activeScenario.difficulty]
    const isDone = completed.includes(activeScenario.id)
    return (
      <div style={styles.page} className="page-transition">
        <div style={styles.container}>
          <button style={styles.back} onClick={() => setView('list')}>← Back</button>

          <div style={{ ...styles.detailHeader, background: diff.bg, borderColor: diff.border }}>
            <span style={styles.detailIcon}>{activeScenario.icon}</span>
            <div>
              <span style={{ ...styles.diffBadge, background: 'white', color: diff.color, marginBottom: '8px', display: 'inline-block' }}>
                {activeScenario.difficulty}
              </span>
              <h1 style={{ ...styles.title, color: diff.color }}>{activeScenario.title}</h1>
              <p style={{ fontSize: '14px', color: diff.color, opacity: 0.85, marginTop: '4px' }}>
                {activeScenario.description}
              </p>
            </div>
          </div>

          <p style={styles.sectionLabel}>What you will be tested on</p>
          <div style={styles.objectiveList}>
            {activeScenario.questions.map((q, i) => (
              <div key={q.id} style={styles.objectiveItem}>
                <div style={{ ...styles.objectiveNum, background: diff.bg, color: diff.color }}>
                  {i + 1}
                </div>
                <span style={styles.objectiveText}>{q.question}</span>
              </div>
            ))}
          </div>

          <button style={styles.primaryBtn} onClick={startQuiz}>
            {isDone ? 'Retake scenario' : 'Start scenario'}
          </button>
        </div>
      </div>
    )
  }

  // ─── QUIZ VIEW ────────────────────────────────────────────
  if (view === 'quiz' && activeScenario) {
    const q = activeScenario.questions[currentQ]
    const progress = (currentQ / activeScenario.questions.length) * 100
    const diff = difficultyColors[activeScenario.difficulty]

    return (
      <div style={styles.page} className="page-transition">
        <div style={styles.container}>
          <button style={styles.back} onClick={() => setView('detail')}>← Back</button>

          <div style={styles.quizProgressWrap}>
            <div style={styles.progressTrack}>
              <div style={{ ...styles.progressFill, width: `${progress}%`, background: diff.color }} />
            </div>
            <span style={styles.quizProgressLabel}>{currentQ + 1} / {activeScenario.questions.length}</span>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <span style={{ ...styles.diffBadge, background: diff.bg, color: diff.color }}>
              {activeScenario.icon} {activeScenario.title}
            </span>
          </div>

          <div style={styles.questionCard}>
            <p style={styles.questionText}>{q.question}</p>
          </div>

          <div style={styles.options}>
            {q.options.map((opt, i) => {
              let optStyle = { ...styles.option }
              if (answered) {
                if (i === q.correct) optStyle = { ...optStyle, ...styles.optCorrect }
                else if (i === selected) optStyle = { ...optStyle, ...styles.optWrong }
                else optStyle = { ...optStyle, opacity: 0.4 }
              }
              return (
                <button
                  key={i}
                  style={optStyle}
                  // Blur the button immediately on click to kill browser focus ring
                  onMouseDown={e => e.currentTarget.blur()}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                >
                  <span style={styles.optLetter}>{['A', 'B', 'C', 'D'][i]}</span>
                  <span style={styles.optText}>{opt}</span>
                  {answered && i === q.correct && <span style={{ marginLeft: 'auto' }}>✓</span>}
                  {answered && i === selected && i !== q.correct && <span style={{ marginLeft: 'auto' }}>✗</span>}
                </button>
              )
            })}
          </div>

          {answered && (
            <div style={{
              ...styles.feedbackBox,
              background: selected === q.correct ? '#E9F7EF' : '#FCEBEB',
              borderColor: selected === q.correct ? '#1D9E75' : '#E24B4A',
            }}>
              <p style={{
                ...styles.feedbackTitle,
                color: selected === q.correct ? '#0F6E56' : '#A32D2D',
              }}>
                {selected === q.correct ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p style={styles.feedbackText}>{q.explanation}</p>
              <button style={styles.nextBtn} onClick={handleNext}>
                {currentQ + 1 >= activeScenario.questions.length ? 'See results' : 'Next →'}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ─── RESULT VIEW ──────────────────────────────────────────
  if (view === 'result' && activeScenario) {
    const total = activeScenario.questions.length
    const pct = Math.round((score / total) * 100)
    const passed = pct >= 70

    return (
      <div style={styles.page} className="page-transition">
        <div style={styles.container}>
          <button style={styles.back} onClick={() => setView('list')}>← Back to scenarios</button>

          <div style={{
            ...styles.scoreCard,
            background: passed ? '#E9F7EF' : '#FCEBEB',
            borderColor: passed ? '#1D9E75' : '#E24B4A',
          }}>
            <div style={styles.scoreEmoji}>{passed ? '🎉' : '📚'}</div>
            <div style={{ ...styles.scoreBig, color: passed ? '#0F6E56' : '#A32D2D' }}>
              {score}/{total}
            </div>
            <div style={{ ...styles.scorePct, color: passed ? '#0F6E56' : '#A32D2D' }}>
              {pct}% — {passed ? 'Scenario passed!' : 'Keep practising'}
            </div>
            <div style={styles.scenarioBadge}>{activeScenario.icon} {activeScenario.title}</div>
          </div>

          <div style={styles.breakdown}>
            <div style={styles.breakdownItem}>
              <span style={styles.breakdownLabel}>Correct</span>
              <span style={{ ...styles.breakdownVal, color: '#0F6E56' }}>{score}</span>
            </div>
            <div style={styles.breakdownDivider} />
            <div style={styles.breakdownItem}>
              <span style={styles.breakdownLabel}>Wrong</span>
              <span style={{ ...styles.breakdownVal, color: '#A32D2D' }}>{total - score}</span>
            </div>
            <div style={styles.breakdownDivider} />
            <div style={styles.breakdownItem}>
              <span style={styles.breakdownLabel}>Total</span>
              <span style={styles.breakdownVal}>{total}</span>
            </div>
          </div>

          <button style={styles.primaryBtn} onClick={startQuiz}>Try again</button>
          <button style={{ ...styles.primaryBtn, ...styles.secondaryBtn }} onClick={() => setView('list')}>
            Back to scenarios
          </button>
        </div>
      </div>
    )
  }

  return null
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
    outline: 'none',
  },
  header: {
    marginBottom: '1.5rem',
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
  progressCard: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '14px',
    padding: '1rem 1.25rem',
    marginBottom: '1.75rem',
  },
  progressTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  progressLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  progressPct: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  progressTrack: {
    height: '6px',
    background: '#e8e8e6',
    borderRadius: '99px',
    overflow: 'hidden',
    marginBottom: '6px',
    flex: 1,
  },
  progressFill: {
    height: '100%',
    background: '#1a1a1a',
    borderRadius: '99px',
    transition: 'width 0.4s ease',
  },
  progressSub: {
    fontSize: '12px',
    color: '#aaa',
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
    outline: 'none',
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
  icon: { fontSize: '22px' },
  cardText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cardLabel: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  doneBadge: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#0F6E56',
    background: '#E1F5EE',
    padding: '2px 8px',
    borderRadius: '20px',
  },
  cardDesc: {
    fontSize: '12px',
    color: '#888',
    lineHeight: '1.4',
  },
  diffBadge: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '3px 10px',
    borderRadius: '20px',
    flexShrink: 0,
  },
  detailHeader: {
    borderRadius: '14px',
    border: '1px solid',
    padding: '1.25rem',
    marginBottom: '1.5rem',
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  detailIcon: { fontSize: '36px', flexShrink: 0 },
  objectiveList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '1.5rem',
  },
  objectiveItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '12px',
    padding: '12px 14px',
  },
  objectiveNum: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    flexShrink: 0,
  },
  objectiveText: {
    fontSize: '13px',
    color: '#444',
    lineHeight: '1.5',
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
    outline: 'none',
  },
  quizProgressWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '1rem',
  },
  quizProgressLabel: {
    fontSize: '13px',
    color: '#888',
    flexShrink: 0,
  },
  questionCard: {
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '14px',
    padding: '1.25rem',
    marginBottom: '1rem',
  },
  questionText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a1a',
    lineHeight: '1.5',
    margin: 0,
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '1rem',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: '#fff',
    border: '1px solid #e8e8e6',
    borderRadius: '12px',
    padding: '12px 14px',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    // Kill ALL browser default focus/active styling
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    boxShadow: 'none',
  },
  optCorrect: {
    background: '#E9F7EF',
    borderColor: '#1D9E75',
    outline: 'none',
    boxShadow: 'none',
  },
  optWrong: {
    background: '#FCEBEB',
    borderColor: '#E24B4A',
    outline: 'none',
    boxShadow: 'none',
  },
  optLetter: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: '#f7f7f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    color: '#888',
    flexShrink: 0,
  },
  optText: {
    fontSize: '14px',
    color: '#1a1a1a',
    flex: 1,
  },
  feedbackBox: {
    borderRadius: '14px',
    border: '1px solid',
    padding: '1rem 1.25rem',
  },
  feedbackTitle: {
    fontSize: '15px',
    fontWeight: '700',
    marginBottom: '6px',
  },
  feedbackText: {
    fontSize: '13px',
    color: '#444',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  nextBtn: {
    width: '100%',
    padding: '12px',
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    outline: 'none',
  },
  scoreCard: {
    borderRadius: '16px',
    border: '1px solid',
    padding: '2rem',
    textAlign: 'center',
    marginBottom: '1.25rem',
  },
  scoreEmoji: { fontSize: '44px', marginBottom: '8px' },
  scoreBig: {
    fontSize: '44px',
    fontWeight: '700',
  },
  scorePct: {
    fontSize: '16px',
    fontWeight: '500',
    marginTop: '4px',
    marginBottom: '12px',
  },
  scenarioBadge: {
    fontSize: '13px',
    color: '#888',
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
  secondaryBtn: {
    background: '#fff',
    color: '#1a1a1a',
    border: '1px solid #e8e8e6',
  },
}