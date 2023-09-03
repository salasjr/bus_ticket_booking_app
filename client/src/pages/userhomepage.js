/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../forms/formstyle.css'

function Userhomepage() {
    const location = useLocation();
    const { token, user } = location.state;
    const [fetcheduser, Setfetcheduser] = useState(user)
    const navigate = useNavigate();
    const handleprofileClick = () => {
        navigate('/userprofile',{
            state:{
                token:token,
                user:fetcheduser,
            } 
        });}

      const handlebookClick = () => {
        navigate('/userbookdetail',{
            state:{
                token:token,
                user:user,
              }  
          });
  
        }
    const handlelogout = () => {
      navigate('/userlogin',{replace:true})
    }
    const [users, setUsers] = useState([]);
    const fetchService = () => {
        fetch('http://localhost:8000/bus/getalluser', {
          method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
          setUsers(data.alluser);
        })
          .catch(err => console.log(err))
      }
    
      useEffect(() => {
        fetchService()
      }, [])

      const getdetailService = (userid,busname) => {
        fetch(`http://localhost:8000/service/getservice/${userid}`, {
          method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
          if(data.message){
            navigate('/userbusdetail',{
              state:{
                findservices: data.findservice,
                token: token,
                user:user,
                busname: busname,
                busid: userid
              }
            })

          } 
        })
          .catch(err => console.log(err))
      }
       
      const fetchuser = () => {
        fetch('http://localhost:8000/user/', {
          method: 'GET',
          headers:{
            Authorization: `${token}`
          }
        })
        .then(res => res.json())
        .then(data => {
          Setfetcheduser(data.getuser)
        })
          .catch(err => console.log(err))
      }
    
      useEffect(() => {
        fetchuser()
      },)

  return (
    <div>
      <div>
      <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"/>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                              <div className="flex space-x-4">
                              
                        <a  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">User home page</a>

                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button className= 'text-white m-2' onClick={handleprofileClick}>my profile</button>
                  <button className= 'text-white m-2' onClick={handlebookClick}>my book list</button>
                      <button className='text-white m-2' onClick={handlelogout}>sing out</button>
                    <div className="relative ml-3">
                      <div>
                        <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                          <span className="absolute -inset-1.5"></span>
                          <span className="sr-only">Open user menu</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

      </nav>
      </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 m-4">
                    {users.length > 0 ? (
                      users.map((user, index) => (
                        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg p-4">
                          <img
                            className="w-full h-52 mb-2"
                            src={`${user.photo}`}
                            alt="bus"
                          />
                          <h3 className="font-bold text-xl mb-2">Bus Name: {user.name}</h3>
                          <h3 className="font-bold text-xl mb-2">Phone: {user.phonenumber}</h3>

                          <p className="text-gray-700 text-base">
                            To see the available destination, hit the detail button and book the ticket
                          </p>
                          <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                              <button onClick={() => getdetailService(user._id,user.name)}>
                                view detail
                              </button>
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No BUS found</p>
                    )}      
            </div>
            </div>

  )
}

export default Userhomepage