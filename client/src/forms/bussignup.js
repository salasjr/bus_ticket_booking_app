import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formstyle.css'
function Bussignup() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/buslogin');
    }
    const [registerdata, setRegisterData] = useState({
        password: '',
        email: '',
        name: '',
        phonenumber: ''
    });
    const [status, setStatus] = useState('Not registered yet');
    const handleRegister = () => {
        if (!registerdata.name || typeof registerdata.name !== 'string') {
            setStatus('Invalid input: Name required and Name must be a string');
            return;
        }

        if (!registerdata.phonenumber || !registerdata.phonenumber.startsWith('2519')) {
            setStatus('Invalid input:phone number required and Phone number must start with 2519');
            return;
        }

        if (!registerdata.email || !/^\S+@\S+\.\S+$/.test(registerdata.email)) {
            setStatus('Invalid input:Email required and Email must be in valid fomat');
            return;
        }

        if (!registerdata.password || registerdata.password.length < 4) {
            setStatus('Invalid input:Passowrd requried and Password must be at least 4 characters');
            return;
        }
        fetch('http://localhost:8000/bus/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerdata)
        })
            .then(res => res.json())
            .then(data => {
                setStatus(data.message);
            })
            .catch(err => console.log(err));
    };
  return (
    <div>
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     <div className="w-full bg-white rounded-lg shadow dark:border md:mt-4 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
     <div className=" flex flex-col items-center justify-center px-6 py-10 lg:py-0 ">
        <div className='main'>
     <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mt-4 mb-4">Bus owner Register Form</h1>
     <div className="space-y-4 md:space-y-6 ">
     <input
         type="text"
         placeholder="BUS companay Name"
         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         onChange={e => {
             setRegisterData({ ...registerdata, name: e.target.value });
         }}
     />
     <input
         type="text"
         placeholder="Email"
         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         onChange={e => {
             setRegisterData({ ...registerdata, email: e.target.value });
         }}
     />
     <input
         type="password"
         placeholder="Password"
         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         onChange={e => {
             setRegisterData({ ...registerdata, password: e.target.value });
         }}
     />
     <input
         type="text"
         placeholder="company Phone number"
         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
         onChange={e => {
             setRegisterData({ ...registerdata, phonenumber: e.target.value });
         }}
     />
     <button onClick={handleRegister}  className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">Register</button>
     <h4 className='status'>{status}</h4>
     <button onClick={handleLoginClick} className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">Login</button>
     </div>
     </div>
     </div>
     </div>
     </div>
     </section>
 </div>
  )
}

export default Bussignup