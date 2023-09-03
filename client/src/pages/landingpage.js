import React from 'react'
import { useNavigate } from 'react-router-dom';

function Landingpage() {

  const navigate = useNavigate();

  const handleuserLoginClick = () => {
      navigate('/userlogin');
  }
  const handleusersingupClick = () => {
      navigate('/usersignup');
  }

  const handlebusSignupClick = () => {
      navigate('/bussingup');
  }
  const handlebusloginClick = () => {
      navigate('/buslogin');
  }
  
  return (   
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
       <div class="w-full bg-white rounded-lg shadow dark:border md:mt-4 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
        <div class=" flex flex-col items-center justify-center px-6 py-10 lg:py-0 " className='main'>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mt-4 mb-4">Ethopian Bus Ticket booking website</h1>
              <div className="space-y-4 md:space-y-6 ">
                <button onClick={handleuserLoginClick} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" className='register1'>Login as a user</button>
                <button onClick={handleusersingupClick} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" className='register1'>Singup as a user </button>
                <button onClick={handlebusloginClick} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" className='register1'>Login as a bus owner</button>
                <button onClick={handlebusSignupClick} class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" className='register1'>Singup as a bus owner</button>
             </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landingpage;