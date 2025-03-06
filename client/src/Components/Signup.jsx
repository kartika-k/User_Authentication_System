import React, { useState } from 'react'
import "../App.css"
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('')
    setSuccess('')

    if (!username) {
      setError('Username is required')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long')
      return
    }

    Axios.post("http://localhost:3000/auth/signup", {
      username,
      email,
      password,
    }).then(response => {
      if (response.data.status) {
        setSuccess('Signup successful')
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        setError(response.data.message || 'Signup failed. Please try again.')
      }
    }).catch(err => {
      setError('An error occurred while signing up. Please try again.')
      console.log(err)
    })
  };

  return (
    <div className='sign-up-container'>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <label htmlFor="username">Username:</label>
        <input type="text" placeholder='Username'
          onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="email">Email:</label>
        <input type="email" autoComplete='off' placeholder='Email'
          onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" placeholder='******* '
          onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>Sign Up</button>
        <p>Have an Account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Signup