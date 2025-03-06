import React, { useState } from 'react'
import "../App.css"
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const navigate = useNavigate()

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(String(email).toLowerCase())
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        setSuccess('')

        if (!validateEmail(email)) {
            setError('Please enter a valid email address')
            return
        }

        Axios.post("http://localhost:3000/auth/forgot-password", {
            email,
        }).then(response => {
            if (response.data.status) {
                setSuccess("Check your email for reset password link")
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            } else {
                setError(response.data.message || "An error occurred")
            }
        }).catch(err => {
            setError("An error occurred while sending the email")
            console.log(err)
        })
    };

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>Forgot Password</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <label htmlFor="email">Email:</label>
                <input type="email" autoComplete='off' placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)} />
                <button type='submit'>Send</button>
                <p>Have an Account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}

export default ForgotPassword