import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../App.css"

const Home = () => {
    const navigate = useNavigate()
    const [error, setError] = useState('')
    axios.defaults.withCredentials = true; 

    const handleLogout = () => {
        setError('')
        axios.get('http://localhost:3000/auth/logout')
        .then(res => {
            if(res.data.status) {
                navigate('/login')
            } else {
                setError('Logout failed. Please try again.')
            }
        }).catch(err => {
            setError('An error occurred while logging out. Please try again.')
            console.log(err)
        })
    }

    return (
        <div className="home-container">
            <h1>Welcome to the Home Page</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="button-container">
                <Link to="/dashboard" className="btn">Go to Dashboard</Link>
                <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Home