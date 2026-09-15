import { useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:3000'

function App() {
  const resetToken = new URLSearchParams(window.location.search).get('resetToken')
  const [mode, setMode] = useState(resetToken ? 'reset' : 'login')
  const [form, setForm] = useState({ name: '', email: '', passWord: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [session, setSession] = useState(() => localStorage.getItem('authToken'))
  const [adminMessage, setAdminMessage] = useState('')

  const updateForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setError('')
    setMessage('')
  }

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const endpoint = mode === 'login' ? '/login' : mode === 'signup' ? '/signUp' : mode === 'forgot' ? '/api/forgot-password' : `/api/reset-password/${resetToken}`
      const body = mode === 'login' ? { email: form.email, passWord: form.passWord } : mode === 'signup' ? form : mode === 'forgot' ? { email: form.email } : { newPassword: form.passWord }
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      })
      const data = await response.json().catch(() => null)
      if (!response.ok || data?.error) throw new Error(data?.error || data?.message || 'Request failed')
      if (mode === 'login' && data?.token) {
        localStorage.setItem('authToken', data.token)
        setSession(data.token)
        setMessage('You are signed in.')
      } else if (mode === 'signup') {
        setMessage('Account created. You can sign in now.')
        setMode('login')
      } else if (mode === 'forgot') {
        setMessage('Check your email for a password reset link.')
      } else {
        window.history.replaceState({}, '', window.location.pathname)
        setMessage('Password reset. You can sign in now.')
        setMode('login')
      }
    } catch (requestError) {
      setError(requestError.message || 'Could not reach the server.')
    } finally { setLoading(false) }
  }

  const checkAdmin = async () => {
    setLoading(true); setError(''); setAdminMessage('')
    try {
      const response = await fetch(`${API_URL}/api`, { headers: { Authorization: session } })
      const data = await response.text()
      if (!response.ok) throw new Error(data || 'Admin access denied')
      setAdminMessage(data)
    } catch (requestError) { setError(requestError.message || 'Admin check failed.') }
    finally { setLoading(false) }
  }

  const signOut = () => {
    localStorage.removeItem('authToken'); setSession(null); setAdminMessage(''); setMessage('You have been signed out.')
  }

  if (session) return (
    <main className="dashboard-shell">
      <nav className="topbar"><div className="brand"><span className="brand-mark">V</span><span>Vedam<span className="brand-dot">.</span></span></div><button className="text-button" type="button" onClick={signOut}>Sign out</button></nav>
      <section className="dashboard-content"><p className="eyebrow">Authenticated workspace</p><h1>Good to see you<span className="accent">.</span></h1><p className="lead">Your session is active. Use the control below to verify your protected admin route.</p>
        <div className="admin-panel"><div><span className="status-dot" />Session active</div><button className="primary-button" type="button" onClick={checkAdmin} disabled={loading}>{loading ? 'Checking...' : 'Check admin access'}</button>{adminMessage && <p className="success-message">{adminMessage}</p>}{error && <p className="error-message">{error}</p>}</div>
      </section>
    </main>
  )

  return (
    <main className="auth-shell">
      <section className="intro-panel"><nav className="topbar"><div className="brand"><span className="brand-mark">V</span><span>Vedam<span className="brand-dot">.</span></span></div><span className="topbar-note">Identity portal / 06</span></nav><div className="intro-copy"><p className="eyebrow">A calm place to begin</p><h1>Make room for<br /><em>what matters.</em></h1><p className="lead">Secure access to your Vedam workspace, built for clear work and quiet momentum.</p></div><div className="intro-footer"><span>01</span><span className="footer-line" /><span>Private by design</span></div></section>
      <section className="form-panel"><div className="form-wrap"><div className="form-heading"><p className="eyebrow">Welcome</p><h2>{mode === 'login' ? 'Sign in to Vedam' : mode === 'signup' ? 'Create your account' : mode === 'forgot' ? 'Recover your account' : 'Choose a new password'}</h2><p>{mode === 'login' ? 'Enter your details to continue.' : mode === 'signup' ? 'A few details and you are in.' : mode === 'forgot' ? 'We will send a secure reset link.' : 'Your reset link is ready.'}</p></div>{mode !== 'reset' && <div className="mode-switch" role="tablist"><button className={mode === 'login' ? 'active' : ''} type="button" onClick={() => { setMode('login'); setError(''); setMessage('') }}>Sign in</button><button className={mode === 'signup' ? 'active' : ''} type="button" onClick={() => { setMode('signup'); setError(''); setMessage('') }}>Sign up</button></div>}
        <form onSubmit={submit}>{mode === 'signup' && <label>Full name<input name="name" value={form.name} onChange={updateForm} placeholder="Your name" required /></label>}{mode !== 'reset' && <label>Email address<input name="email" type="email" value={form.email} onChange={updateForm} placeholder="you@example.com" required /></label>}{mode !== 'forgot' && <label>Password<input name="passWord" type="password" value={form.passWord} onChange={updateForm} placeholder={mode === 'reset' ? 'New password' : 'Enter your password'} minLength="6" required /></label>}<button className="primary-button submit-button" type="submit" disabled={loading}>{loading ? 'Please wait...' : mode === 'login' ? 'Continue' : mode === 'signup' ? 'Create account' : mode === 'forgot' ? 'Send reset link' : 'Reset password'}<span>-&gt;</span></button></form>
        {mode === 'login' && <button className="text-button recovery-button" type="button" onClick={() => { setMode('forgot'); setError(''); setMessage('') }}>Forgot your password?</button>}{message && <p className="success-message">{message}</p>}{error && <p className="error-message">{error}</p>}<p className="form-note">By continuing, you agree to keep this space thoughtful.</p></div></section>
    </main>
  )
}

export default App
