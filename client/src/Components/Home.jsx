import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "../App.css"

const Home = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true; 

    const handleLogout = () => {
        axios.get('http://localhost:3000/auth/logout')
        .then(res => {
            if(res.data.status) {
                navigate('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="home-container">
            <h1>Welcome to the Home Page</h1>
            <div className="button-container">
                <button className="btn"><Link to="/dashboard">Go to Dashboard</Link></button>
                <button className="btn" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Home