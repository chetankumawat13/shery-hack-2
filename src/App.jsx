import React, { useEffect, useRef, useState } from 'react'
import './App.css'

const REQUIREMENTS = [
  'At least 8 characters',
  'Contains upper and lower case',
  'Contains a number',
  'Contains a special character',
  'No common words',
  'Not your pet name',
  'Not used elsewhere',
  'Must include an emoji',
  'Must rhyme with "love"',
  'Must be written in iambic pentameter',
]

function RunningButton({ children, className = '', onClick }) {
  const ref = useRef()

  // local dodge behavior: move away from cursor inside nearby bounds
  function dodge(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    if (Math.abs(dx) < 120 && Math.abs(dy) < 80) {
      const nx = -dx + (Math.random() - 0.5) * 80
      const ny = -dy + (Math.random() - 0.5) * 40
      el.style.transform = `translate(${nx}px, ${ny}px)`
    }
  }

  return (
    <button ref={ref} className={className} onMouseMove={dodge} onClick={onClick}>
      {children}
    </button>
  )
}

function App() {
  const [view, setView] = useState('landing')
  const [showConfirmImage, setShowConfirmImage] = useState(false)
  const [jokeIndex, setJokeIndex] = useState(0)

  const JOKES = [
    "Love is blind, but our UI isn't.",
    "Find someone who laughs at your bugs.",
    "Swipe responsibly: your thumb matters.",
    "Terms & Conditions: bring snacks.",
    "We pair you based on mutual awkwardness."
  ]

  useEffect(() => {
    const i = setInterval(() => setJokeIndex((n) => (n + 1) % JOKES.length), 3800)
    return () => clearInterval(i)
  }, [])

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [reqShown, setReqShown] = useState(1)
  const [age, setAge] = useState('')
  const [ageMsg, setAgeMsg] = useState('')
  const [tcScrolled, setTcScrolled] = useState(false)
  const tcRef = useRef()

  const [swipeCount, setSwipeCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showPremium, setShowPremium] = useState(false)
  const [showMatch, setShowMatch] = useState(false)
  const [matchClosableAfter, setMatchClosableAfter] = useState(0)
  const [showVirus, setShowVirus] = useState(false)
  const [unreadMessages] = useState(120)
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0)
  const [toast, setToast] = useState('')

  const PROFILES = [
    { name: 'Rex', age: 3, img: 'https://placedog.net/400/300?id=1', bio: 'Loves long walks, bones, and aggressively judging your playlist.' },
    { name: 'Rex (The Existential)', age: 27, img: 'https://placedog.net/400/300?id=2', bio: 'Philosopher by night, chew-toy connoisseur by day. Will analyze your dreams.' },
    { name: 'Rex Royale', age: 4, img: 'https://placedog.net/400/300?id=3', bio: 'Royalty adjacent. Expects treats served on porcelain.' },
    { name: 'Rex Tornado', age: 2, img: 'https://placedog.net/400/300?id=4', bio: 'Leaves a trail of chaos and glitter. Great at surprise parties.' },
    { name: 'Rex Noir', age: 5, img: 'https://placedog.net/400/300?id=5', bio: 'Mysterious. Speaks in film-noir one-liners. Will steal your socks.' },
    { name: 'Rex 2.0', age: 3, img: 'https://placedog.net/400/300?id=6', bio: 'New and improved. Now with extra sarcasm and a USB-C port (figuratively).' },
    { name: 'Rex the Unapologetic', age: 6, img: 'https://placedog.net/400/300?id=7', bio: 'Loud, proud, and likely to eat your lunch. Edgy by design.' },
    { name: 'Rex McDanger', age: 1, img: 'https://placedog.net/400/300?id=8', bio: 'Dangerous cuddles ahead. Not responsible for spontaneous naps.' },
    { name: 'Rex Heartthrob', age: 3, img: 'https://placedog.net/400/300?id=9', bio: 'Charm level: unsettling. Heart eyes guaranteed.' },
    { name: 'Rex of Chaos', age: 8, img: 'https://placedog.net/400/300?id=10', bio: 'Been around the block. Will mentor you in minor anarchy.' },
    { name: 'Rex Apocalypse', age: 7, img: 'https://placedog.net/400/300?id=11', bio: 'Brings apocalypse-themed puns and unmatched commitment.' },
  ]

  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(true)
  const [compatibility, setCompatibility] = useState(0)
  const [showDeadEnd, setShowDeadEnd] = useState(false)
  const [virusProgress, setVirusProgress] = useState(0)
  const [appLocked, setAppLocked] = useState(false)

  // floating hearts positions
  const hearts = useRef(Array.from({length:12}).map(() => ({
    left: Math.floor(Math.random()*100) + '%',
    delay: Math.floor(Math.random()*5000)
  })))

  // messy panels decorative layer
  const panels = useRef(Array.from({length:6}).map(() => ({
    left: Math.floor(Math.random()*80) + 10 + '%',
    top: Math.floor(Math.random()*80) + 10 + 'vh',
    rot: Math.floor((Math.random()-0.5)*30),
    size: 80 + Math.floor(Math.random()*200)
  })))

  useEffect(() => {
    const id = setInterval(() => setTyping((t) => !t), 700)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {

    const weirdSounds = [
      () => playBeep(200, 120),
      () => playBeep(800, 80),
      () => playBeep(1200, 50),
      () => playBeep(400, 200),
    ]
  
    const id = setInterval(() => {
  
      if (Math.random() > 0.5) {
  
        const sound =
          weirdSounds[Math.floor(Math.random() * weirdSounds.length)]
  
        sound()
  
      }
  
    }, 5000)
  
    return () => clearInterval(id)
  
  }, [])
  useEffect(() => {

    const id = setInterval(() => {
  
      setCompatibility(Math.floor(Math.random()*100))
  
    }, 1000)
  
    return () => clearInterval(id)
  
  }, [])

  useEffect(() => {

    const messages = [
      "💔 Your ex joined Smooched",
      "😭 Someone ignored your vibe",
      "🔥 32 singles rejected you",
      "⚠ Emotional damage detected"
    ]
  
    const id = setInterval(() => {
  
      setToast(messages[Math.floor(Math.random()*messages.length)])
  
      setTimeout(() => {
        setToast('')
      }, 3000)
  
    }, 7000)
  
    return () => clearInterval(id)
  
  }, [])

  useEffect(() => {
    if (password.length > 0 && reqShown < REQUIREMENTS.length) {
      setReqShown((r) => Math.min(REQUIREMENTS.length, r + 1))
    }
  }, [password])

  useEffect(() => {
    let t
    if (view === 'swipe') {
      t = setTimeout(() => setShowVirus(true), 5000)
    }
    return () => clearTimeout(t)
  }, [view])

  // when virus popup shows, run fake scan
  useEffect(() => {
    let id
    if (showVirus) {
      setVirusProgress(0)
      id = setInterval(() => {
        setVirusProgress((p) => {
          if (p >= 100) {
            clearInterval(id)
            // lock the app as part of the prank
            setTimeout(() => setAppLocked(true), 500)
            return 100
          }
          return Math.min(100, p + Math.floor(Math.random() * 12) + 5)
        })
      }, 500)
    }
    return () => clearInterval(id)
  }, [showVirus])

  useEffect(() => {
    if (appLocked) playSound('virus')
  }, [appLocked])

  // audio helper using WebAudio API
  function playBeep(freq = 440, dur = 120) {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext
      const ctx = new Ctx()
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = freq
      g.gain.value = 0.02
      o.connect(g); g.connect(ctx.destination)
      o.start()
      setTimeout(() => { o.stop(); ctx.close() }, dur)
    } catch (e) {
      // ignore
    }
  }

  function playSound(name) {
    if (name === 'send') playBeep(900, 80)
    if (name === 'match') { playBeep(1200, 160); setTimeout(() => playBeep(800, 120), 120) }
    if (name === 'virus') { playBeep(200, 300); setTimeout(() => playBeep(150, 300), 350) }
    if (name === 'popup') playBeep(600, 120)
  }

  function formatNameTyped(raw) {
    return raw
      .split('')
      .map((ch, i) => {
        if ((i + 1) % 3 === 0 && Math.random() > 0.5) return ch.toUpperCase()
        return ch
      })
      .join('')
  }

  function handleAgeBlur() {
    const n = parseInt(age, 10)
    if (n !== 27) {
      const messages = [
        "Are you sure? Most people today are 27.",
        "That's a weird age. Have you tried being 27?",
        "Our data suggests 27 is the optimal dating age.",
        "Error: Invalid age detected. Only 27 is allowed currently."
      ]
      setAgeMsg(messages[Math.floor(Math.random()*messages.length)])
    } else {
      setAgeMsg("")
    }
  }

  function handleTCScroll(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setTcScrolled(true)
    }
  }

  function startSwiping() {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setView('swipe')
    }, 2000)
  }

  function handleSwipe(action = 'tap') {
    // action: 'no' | 'yes' | 'super' | 'rewind' | 'block'
    if (action === 'rewind') {
      setSwipeCount(s => Math.max(0, s - 1))
      playBeep(520, 90)
      return
    }

    if (action === 'block') {
      // playful block: open premium modal as a mock
      setShowPremium(true)
      playSound('popup')
      return
    }

    // increment for any forward action
    setSwipeCount(s => s + 1)

    if (action === 'super') {
      // super-like forces a match
      setShowMatch(true)
      setMatchClosableAfter(Date.now() + 3000)
      playSound('match')
      return
    }

    // regular like/no: probabilistic match
    if (action === 'yes' && Math.random() > 0.35) {
      setShowMatch(true)
      setMatchClosableAfter(Date.now() + 5000)
      playSound('match')
    } else if (swipeCount >= 4) {
      // after a few swipes, prompt premium
      setShowPremium(true)
      playSound('popup')
    }
  }

  function closeMatch() {
    if (Date.now() >= matchClosableAfter) {
      setShowMatch(false)
    }
  }

  function goToChat() {
    setShowMatch(false)
    setView('chat')
  }

  function sendMessage() {
    if (!draft.trim()) return
    const id = Date.now()
    const original = draft
    setMessages(m => [...m, { id, text: original, user: true, status: 'pending' }])
    setDraft('')
    playSound('send')
    // delayed autocorrect: replace with nonsense
    const nonsense = [
      'flibber flob',
      'quantum tacos',
      '╰(°▽°)╯',
      'soggy umbrella',
      'purple kangaroo',
      'lorem ipsum whoops',
    ]
    setTimeout(() => {
      const text = nonsense[Math.floor(Math.random() * nonsense.length)]
      setMessages(m => m.map(msg => msg.id === id ? { ...msg, text, status: 'sent' } : msg))
    }, 700)
  }

  return (
    <div className="app-container">
      <div className="floating-hearts" aria-hidden>
        {hearts.current.map((h, i) => (
          <span key={i} style={{left: h.left, top: Math.floor(60+Math.random()*30)+'vh', animationDelay: (h.delay/1000)+'s'}}>{['💖','💀','⭐','🔥','🍕'][i%5]}</span>
        ))}
      </div>

      <div className="mess-panels" aria-hidden>
        {panels.current.map((p, i) => (
          <div key={i} className="mess-panel" style={{left:p.left, top:p.top, width:p.size+'px', height:(p.size/2)+'px', transform:`rotate(${p.rot}deg)`}}>{i%2? 'CHAOS' : 'MAX'}</div>
        ))}
      </div>
      <header className="head">
      {toast && <div className="toast">{toast}</div>}
        <div>
          <div className="logo">Smooched™</div>
          <div className="joke-pill">{JOKES[jokeIndex]}</div>
        </div>
        {view !== 'landing' && (
          <div className="notifications">🔔 <span className="unread" onClick={(e)=>{ e.stopPropagation(); setShowDeadEnd(true); playSound('popup') }}>{unreadMessages > 99 ? '99+' : unreadMessages}</span></div>
        )}
      </header>

      <main className="content">
        {view === 'landing' && (
          <section className="view-landing">
            <div>
              <h1>Find your soulmate (probably not)</h1>
              <p>The only app that pairs you with compatible chaos.</p>
            </div>
            <div>
              <button className="cta" onClick={() => setShowConfirmImage(true)}>Catch My Soulmate</button>
              <div className="sub">Warning: may contain excessive awkwardness.</div>
            </div>
          </section>
        )}

        {view === 'signup' && (
          <section className="view-signup">
            <h2>Create Profile</h2>
            
            <div className="field">
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(formatNameTyped(e.target.value))} />
            </div>

            <div className="field">
              <label>Age:</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} onBlur={handleAgeBlur} />
              {ageMsg && <div className="error">{ageMsg}</div>}
            </div>

            <div className="field">
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <div className="reqs">
                {REQUIREMENTS.slice(0, reqShown).map((r, i) => (
                  <div key={i} className="req">❌ {r}</div>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Terms & Conditions:</label>
              <div className="tc-box" ref={tcRef} onScroll={handleTCScroll}>
                <p>By using Smooched™, you agree to our entirely fictional privacy policy. We may, at random, send you love haikus and extremely sincere apology GIFs.</p>
                <p>Also: we reserve the right to change the background color of your profile without notice.</p>
                <button className="agree-btn" onClick={() => {
                  // smooth-scroll the TC box to the end and mark as scrolled
                  const el = tcRef.current
                  if (el) {
                    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
                    setTimeout(() => setTcScrolled(true), 600)
                  }
                  playSound('popup')
                }}>I Agree</button>
                <p>Final clause: you will accept cookies and stressed-out puns.</p>
              </div>
            </div>

            <RunningButton className="cta" onClick={tcScrolled ? startSwiping : () => alert("Scroll to the end of the emotional novel first!")}>{loading ? 'Summoning...' : 'Summon Love'}</RunningButton>
          </section>
        )}

        {showConfirmImage && (
          <div className="overlay" onClick={() => setShowConfirmImage(false)}>
            <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
              <img className="confirm-img" src="https://i.pinimg.com/736x/af/91/e1/af91e1d435a8fd310f1dd20594014023.jpg" alt="Are you sure" />
              <h3>Are you sure you are looking for love?</h3>
              <div className="confirm-actions">
                <button className="cta" onClick={() => { setShowConfirmImage(false); setView('signup'); }}>Yes — Proceed</button>
                <button className="agree-btn" onClick={() => { setShowConfirmImage(false); setView('landing'); setName(''); setPassword('') }}>No</button>
              </div>
            </div>
          </div>
        )}

        {view === 'swipe' && (
          <section className="view-swipe">
            <div className="compatibility">
  Compatibility: {compatibility}%
</div>
            <div className="card">
              {(() => {
                const p = PROFILES[currentProfileIndex % PROFILES.length]
                return (
                  <>
                    <img src={p.img} alt={`Potential Match ${p.name}`} />
                    <div className="info">
                      <h3>{p.name}, {p.age}</h3>
                      <p>{p.bio}</p>
                    </div>
                  </>
                )
              })()}
            </div>
            <div className="swipe-actions">
              <button className="swipe-rewind" title="Rewind" onClick={() => { handleSwipe('rewind'); setCurrentProfileIndex(i => Math.max(0, i - 1)) }}>⤺</button>
              <button className="swipe-no" title="Nope" onClick={() => handleSwipe('no')}>✖</button>
              <button className="swipe-super" title="Super Like" onClick={() => handleSwipe('super')}>★</button>
              <button className="swipe-yes" title="Like" onClick={() => { handleSwipe('yes'); setCurrentProfileIndex(i => Math.min(PROFILES.length - 1, i + 1)) }}>❤</button>
              <button className="swipe-block" title="Block" onClick={() => { handleSwipe('block'); setCurrentProfileIndex(i => Math.min(PROFILES.length - 1, i + 1)) }}>🚩</button>
            </div>

            {showPremium && (
              <div className="overlay">
                <div className="modal">
                  <h3>He likes you back! (conditional)</h3>
                  <p>But Premium gives you the ability to view the existential crisis attached to this match.</p>
                  <button className="cta-gold" onClick={() => alert('Premium purchased. Enjoy endless guilt.')}>Unlock for $49.99/mo</button>
                  <p className="tiny">Also available as pay-what-you-regret</p>
                </div>
              </div>
            )}

            {showMatch && (
              <div className="overlay">
                <div className="modal">
                  <span className="close" onClick={closeMatch}>[X] (Available in 5s)</span>
                    <h3>IT'S A MATCH! 🎉</h3>
                    <p>You matched with "Error 404: Personality Not Found" — but they love your weirdness.</p>
                    <button className="cta" onClick={goToChat}>Message Now (bravely)</button>
                </div>
              </div>
            )}

            {showVirus && (
              <div className="virus-popup">
                <strong>⚠ YOUR DEVICE IS SMOOCHED ⚠</strong>
                <div className="virus-bar"><i style={{width: virusProgress + '%'}}/></div>
                <div style={{marginTop:8}}>{virusProgress < 100 ? `Smooch scan... ${virusProgress}%` : 'Smooch complete — spreading love.'}</div>
                <div style={{marginTop:8}}>
                  <button onClick={() => setShowVirus(false)}>Ignore</button>
                </div>
              </div>
            )}
          </section>
        )}

        {view === 'chat' && (
          <section className="view-chat">
            <div className="chat-window">
              <div className="msg bot">
                <div className="bubble">Bot: I'm not a therapist, but I'm a great listener.</div>
                <div className="meta">Bot · {new Date().toLocaleTimeString()}</div>
              </div>
              {messages.map(m => (
                <div key={m.id} className={`msg ${m.user ? 'user' : 'bot'} ${m.status === 'pending' ? 'pending' : ''}`}>
                  <div className="bubble">{m.text}</div>
                  <div className="meta">{m.user ? 'You' : 'Them'} · {new Date(m.id).toLocaleTimeString()} · {m.status}</div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <textarea className="message-input" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter') { e.preventDefault(); sendMessage() }
              }} placeholder="Type a questionable message..." />
              <div className="chat-actions">
                <button className="attach" onClick={() => alert('Attach feature coming soon (not really)')}>📎</button>
                <button className="send" onClick={sendMessage} onMouseMove={(e) => {
                  const el = e.currentTarget
                  el.style.transform = `translate(${(Math.random()-0.5)*12}px, ${(Math.random()-0.5)*6}px)`
                }}>Send ❤</button>
              </div>
            </div>

            <div className="typing">{typing ? 'typing...' : ''}</div>
          </section>
        )}
        {showDeadEnd && (
          <div className="overlay" onClick={() => setShowDeadEnd(false)}>
            <div className="dead-end" onClick={(e)=>e.stopPropagation()}>
              <img className="zero-img" src="https://i.pinimg.com/736x/f3/71/4c/f3714cc71fe46bde01e8176bc818d4ec.jpg" alt="Zero dates" />
              <h3>Zero Dates</h3>
              <p className="zero-msg">You zero dates — go wash your face.</p>
              <div style={{marginTop:8, display:'flex', gap:8, justifyContent:'center'}}>
                <button className="agree-btn" onClick={() => { alert('Fine. Go wash.'); playSound('popup'); setShowDeadEnd(false); }}>Okay</button>
                <button className="cta" onClick={() => { setShowDeadEnd(false); setView('landing'); }}>Back to Login</button>
              </div>
            </div>
          </div>
        )}

        {appLocked && (
          <div className="app-lock">
            <div>
              <h2>Your device has been smooched</h2>
              <p>Everything is fine. Please refresh to continue pretending.</p>
              <button onClick={() => window.location.reload()}>Refresh</button>
            </div>
          </div>
        )}
      </main>

      <footer className="foot">Made with dubious intentions.</footer>
    </div>
  )
}

export default App
