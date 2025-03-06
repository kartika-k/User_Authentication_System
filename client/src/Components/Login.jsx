import React, { useState } from 'react'
import "../App.css"
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('')

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    Axios.post("http://localhost:3000/auth/login", {
      email,
      password,
    }).then(response => {
      if (response.data.status) {
        navigate('/')
      } else {
        setError(response.data.message || 'Login failed. Please try again.')
      }
    }).catch(err => {
      setError('An error occurred while logging in. Please try again.')
      console.log(err)
    })
  };

  return (
    <div className='sign-up-container'>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="email">Email:</label>
        <input type="email" autoComplete='off' placeholder='Email'
          onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='******* '
          onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>Login</button>
        <Link to="/forgotPassword">Forgot Password?</Link>
        <p>Don't Have Account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  )
}

export default Login