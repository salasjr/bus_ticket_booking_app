/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function Busbooked() {
    const location = useLocation()
    const {token} = location.state
    const [booked,setBooked] = useState('')
    const getmybook = () => {
        fetch(`http://localhost:8000/book/`, {
            method: 'GET',
            headers: {
                Authorization: `${token}`, 
            },
        })
        .then(res => res.json())
        .then(data => {
          setBooked(data.getbook)
         
        })
          .catch(err => console.log(err))
      }     
      useEffect(() => {
        getmybook()
      },[])
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
                        <h4  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Book List page</h4>
                      </div> 
                    </div> 
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                 
                  </div>
                </div>
              </div>
              <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  <h4  className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">User home page</h4>
                </div>
              </div>
      </nav>
      </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 m-4">
                    {booked.length > 0 ? (
                      booked.map((bookedservice, index) => (
                        <div key={bookedservice._id} className="max-w-sm rounded overflow-hidden shadow-lg p-4">
                          <h3 className="font-bold text-xl mb-2">User name : {bookedservice.username}</h3>
                          <h3 className="font-bold text-xl mb-2">Bus intail point: {bookedservice.starting}</h3>
                          <h3 className="font-bold text-xl mb-2">Destination: {bookedservice.ending}</h3>
                          <h3 className="font-bold text-xl mb-2">Price: {bookedservice.price}</h3>
                          <h3 className="font-bold text-xl mb-2">Total distance: {bookedservice.distance}</h3>
                          <div className="px-6 pt-4 pb-2">
                            </div>
                          </div> 
                      ))
                    ) : (
                      <p>no current service added yet</p>
                    )}      
            </div>
    </div>
  )
}

export default Busbooked