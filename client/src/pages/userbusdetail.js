/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Userbusdetail() {
  const location = useLocation();
  const { findservices,token,user,busname,busid} = location.state;
  const [bookitem, setBookitem]= useState({
    username: user.name,
    busname:busname,
    busid:busid,
    starting:"",
    ending :"",
    price:"",
    distance:"",
  })
  const book = (serviceid) => {
    const requestData = {
      ...bookitem,
      starting: serviceid.starting,
      ending: serviceid.ending,
      price: serviceid.price,
      distance: serviceid.killometer
    };
    fetch(`http://localhost:8000/book/${serviceid._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`, 
        },
        body: JSON.stringify(requestData),
       
    })

    .then(res => res.json())
    .then(data => {
      alert(data.message);
    })
      .catch(err => console.log(err))
  }

  if (!findservices || findservices.length === 0) {
    return <p>No services available.</p>; 
  }

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
                        <h4  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">bus book list page</h4>
                      </div> 
                    </div> 
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                </div>
              </div>
              <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  <h4  className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">User home page</h4>
                </div>
              </div>
            </div>
      </nav>
      </div>
      <div className="flex  m-4">
      {findservices.map(service => (
        <div key={service._id} className="w-96 rounded overflow-hidden shadow-lg p-4 m-2">
          <h3 className="font-bold text-xl mb-2">myname : {user.name}</h3>
          <h3 className="font-bold text-xl mb-2">Bus name : {busname}</h3>
          <h3 className="font-bold text-xl mb-2">Ending : {service.starting}</h3>
          <h3 className="font-bold text-xl mb-2">Starting :{service.ending}</h3>
          <h3 className="font-bold text-xl mb-2">Price : {service.price}</h3>
          <h3 className="font-bold text-xl mb-2">Distance : {service.killometer}</h3>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-4 mb-2">
          <button onClick={()=>book(service)} className="m-2">book</button>
          </span>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Userbusdetail;
