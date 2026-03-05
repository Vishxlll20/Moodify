import React  from 'react'
import { useState } from 'react'
import "../styles/login.scss"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const Login = () => {

  const {loading,handleLogin} = useAuth()
  const navigate = useNavigate()

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

async function handleSubmit(e){
  e.preventDefault();
  await handleLogin({username,password})
  navigate("/")
}

  return (
    <main>
       <div className="formContainer" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <form className="formdata">
            <label htmlFor="username">Username:</label>
            <input
            onChange={(e)=>{
              setUserName(e.target.value)
            }}
            type="username" id="username" placeholder='enter username' /> <br />
            <label htmlFor="password">Password:</label>
            <input
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            type="password" id="password" placeholder='enter password' /> <br />
            <button type='submit'>Login</button>
        </form>
        <p className='link'>Don't have an account? <Link to="/register">Register</Link></p>
       </div>
    </main>
  )
}

export default Login
