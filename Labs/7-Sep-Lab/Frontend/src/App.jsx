import { useState } from 'react'

let apiUrl = 'http://localhost:3000'

function App() {
  let [page, setPage] = useState('login')
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [passWord, setPassWord] = useState('')
  let [message, setMessage] = useState('')
  let [user, setUser] = useState(null)

  async function submitForm(event) {
    event.preventDefault()
    setMessage('Please wait...')

    let url = page === 'login' ? '/login' : '/signUp'
    let data = { email: email, passWord: passWord }

    if (page === 'signup') {
      data.name = name
    }

    try {
      let response = await fetch(apiUrl + url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      let result = await response.json()

      if (!response.ok) {
        setMessage(result.message)
        return
      }

      if (page === 'signup') {
        setMessage('Account created. You can login now.')
        setPage('login')
        setName('')
        setPassWord('')
        return
      }

      localStorage.setItem('token', result.token)
      await getProfile(result.token)
    } catch {
      setMessage('Could not connect to the server')
    }
  }

  async function getProfile(token) {
    let response = await fetch(apiUrl + '/me', {
      headers: { Authorization: 'Bearer ' + token },
    })
    let result = await response.json()

    if (!response.ok) {
      setMessage(result.message)
      return
    }

    setUser(result.user)
    setMessage('Login successful')
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
    setEmail('')
    setPassWord('')
    setMessage('You are logged out')
  }

  if (user) {
    return (
      <main>
        <h1>My Account</h1>
        <p>{message}</p>
        <hr />
        <h2>Profile</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <button onClick={logout}>Logout</button>
      </main>
    )
  }

  return (
    <main>
      <h1>{page === 'login' ? 'Login' : 'Signup'}</h1>
      <p>{message}</p>

      <form onSubmit={submitForm}>
        {page === 'signup' && (
          <p>
            <label>
              Name<br />
              <input value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
          </p>
        )}

        <p>
          <label>
            Email<br />
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
        </p>

        <p>
          <label>
            Password<br />
            <input type="password" value={passWord} onChange={(event) => setPassWord(event.target.value)} required />
          </label>
        </p>

        <button type="submit">{page === 'login' ? 'Login' : 'Create account'}</button>
      </form>

      <p>
        {page === 'login' ? 'New user?' : 'Already have an account?'}{' '}
        <button onClick={() => { setPage(page === 'login' ? 'signup' : 'login'); setMessage('') }}>
          {page === 'login' ? 'Signup' : 'Login'}
        </button>
      </p>
    </main>
  )
}

export default App
