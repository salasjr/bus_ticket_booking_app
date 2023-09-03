import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formstyle.css'

function Userlogin() {
  const [logindata, setLoginData] = useState({
    password: '',
    email: ''
  });
  const navigate = useNavigate();
  const handleLogin = () => {
    fetch('http://localhost:8000/user/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logindata)
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('accessToken', data.token);
          navigate('/userhomepage', {
            state: {
              token: data.token,
              user:data.user,
            }
          });
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(err => {
        console.log(err);
        alert('An error occurred while logging in.');
      });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-4 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          <div className=" flex flex-col items-center justify-center px-6 py-10 lg:py-0 "> 
          <div className='main'>                   
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mt-4 mb-4">Normal user Login Form</h1>
                    <div className="space-y-4 md:space-y-6 ">
                    <input
                      type="text"
                      placeholder="Email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={e => {
                        setLoginData({ ...logindata, email: e.target.value });
                      }}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={e => {
                        setLoginData({ ...logindata, password: e.target.value });
                      }}
                    />
                    <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
                  </div>
                </div>
                </div>
              </div>
        </div>
      </section>
    </div>
  );
}
export default Userlogin;
