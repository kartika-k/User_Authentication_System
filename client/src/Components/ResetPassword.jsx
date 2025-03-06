import React, { useState, useEffect } from 'react'
import "../App.css"
import Axios from 'axios'
import { Link, useNavigate, useParams } from "react-router-dom"

const ResetPassword = () => {

    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const { token } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        console.log("Token from URL params:", token);
    }, [token]);

    const validatePassword = (password) => {
        return password.length >= 6
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        setSuccess('')

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long')
            return
        }

        console.log("Submitting with token:", token);
        Axios.post(`http://localhost:3000/auth/reset-password/${token}`, {
            password,
        }).then(response => {
            if (response.data.status) {
                setSuccess('Password reset successfully')
                setTimeout(() => {
                    navigate('/login')
                }, 3000)
            } else {
                setError(response.data.message || 'Password reset failed. Please try again.')
            }
            console.log(response.data)
        }).catch(err => {
            setError('An error occurred while resetting the password. Please try again.')
            console.log(err)
        })
    };

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>Reset Password</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <label htmlFor="password">New Password:</label>
                <input type="password" placeholder='******* ' 
                    onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Reset password</button>
                <p>Have an Account? <Link to="/login">Login</Link></p> 
            </form>
        </div>
    )
}

export default ResetPassword