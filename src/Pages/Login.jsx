import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    } else {
      setIcon(eyeOff);
      setType('password');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://stg.dhunjam.in/account/admin/login", {
        username,
        password,
      });
  
      console.log("Login Response:", response);
  
      const { status, data } = response;
  
      console.log("Login Data:", data);
  
      if (status === 200 && data.response === "Success") {
        const { token } = data.data;
          localStorage.setItem('authToken', token);
          navigate('/accout/admin/dashboard');
        
        
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  
  

  useEffect(() => {
    
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      console.log("User already authenticated");
      navigate('/accout/admin/dashboard');
    }
  }, [navigate]);

  return (
    <div className='w-[100vw] h-[100vh] bg-[#030303]  flex justify-center items-center'>

      <div className='w-[600px] h-[300px] flex justify-center flex-col gap-6 items-center'>
        <h1
          className='text-[#FFFFFF]  text-[32px] font-poppins font-bold'
        >Venue Admin Login</h1>
        <div className="mb-4 flex flex-col">

          <input
            type='text'
            name='username'
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-[600px] mb-5 bg-transparent border-2
                 border-[#FFFFFF] border-solid font-poppins px-3 py-auto rounded-lg h-10 text-white outline-none'
          />

          <input
            type={type}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className='w-[600px] bg-transparent border-2 font-poppins
                 border-[#FFFFFF] border-solid px-3 py-auto rounded-lg h-10 text-white outline-none'
          />
          <span className="flex justify-around items-center" onClick={handleToggle}>
            <Icon className="absolute ml-[550px] mb-12 text-white" icon={icon} size={18} />
          </span>

        </div>
        <button
          type='button'
          onClick={handleLogin}
          className='w-[600px] bg-[#6741D9] h-10 rounded-lg
             font-poppins text-[#FFFFFF] text-[16px] hover:border-2 hover:border-solid hover:border-[#F0C3F1] 
             active:border-2 active:border-solid active: border-[#F0C3F1] font-bold'
        >Sign In</button>
        <h3 className='text-[#FFFFFF] font-poppins text-[16px] cursor-pointer'>New Registration ?</h3>
      </div>
    </div>
  );
}

export default Login;
