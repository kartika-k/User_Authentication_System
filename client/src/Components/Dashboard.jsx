import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3000/auth/verify')
        .then(res => {
        if(res.data.status) {
            console.log("Verification successful");
        } else {
            navigate('/')
        }
    })
}, [])
 return (
    <div className="dashboard-container">
        <h1>Welcome to the Dashboard</h1>
    </div>
    )
}

export default Dashboard