import React from 'react'
import { useState } from 'react'
import "../styles/register.scss"
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password, username } = e.target.elements;
    await handleRegister({ email: email.value, password: password.value, username: username.value });
    navigate("/Login");
  }
  return (
   <main>
       <div className="formContainer">
           <h1>Register</h1>
           <form className="formdata" onSubmit={handleSubmit}>
               <label htmlFor="username">Username:</label>
               <input
               onChange={(e)=>{
                    setUserName(e.target.value)
               }}
                type="text" id="username" placeholder='enter username' /> <br />
               <label htmlFor="email">Email:</label>
               <input
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
                type="email" id="email" placeholder='enter email' /> <br />
               <label htmlFor="password">Password:</label>
               <input
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                type="password" id="password" placeholder='enter password' /> <br />
               <button>Register</button>
           </form>
            <p className='link'>Already have an account? <Link to="/login">Login</Link></p>
       </div>
   </main>
  )
}

export default Register
