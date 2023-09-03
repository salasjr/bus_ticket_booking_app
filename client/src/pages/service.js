/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
function Service() {
    const location = useLocation()
    const {token} = location.state
    const [service,setService] = useState([])
    const [flag, setFlag] = useState(false)
    const [status,setStatus] = useState('no service added')
    const [servicestatus,setServicestatus] = useState('service not updated')
    const [servicedata, setServicedata] = useState({
        starting: '',
        ending: '',
        price: '',
        killometer: ''
    });
    const [editFlag, setEditFlag] = useState(false);
    const [editServiceData, setEditServiceData] = useState({
        starting: '',
        ending: '',
        price: '',
        killometer: ''
    });
    const [editedServiceId, setEditedServiceId] = useState('');
        const getbusowner = () => {
        fetch(`http://localhost:8000/service/`, {
            method: 'GET',
            headers: {
                Authorization: `${token}`, 
            },
        })
        .then(res => res.json())
        .then(data => {
          setService(data.getservice)
        })
          .catch(err => console.log(err))
      }
      
      useEffect(() => {
        getbusowner()
      },[service,])


      const handleaddservice = () => {
        if (!servicedata.starting || typeof servicedata['starting'] !== 'string') {
          setStatus('Invalid input: starting required and starting must be a string');
          return;
      }
      
      if (!servicedata.ending || typeof servicedata['ending'] !== 'string') {
          setStatus('Invalid input: ending required and ending must be a string');
          return;
      }
      
        if (!servicedata.price ||  isNaN(servicedata['price'])) {
            setStatus('Invalid input:price requried and must be a number');
            return;
        }

        if (!servicedata.killometer || isNaN(servicedata['killometer'])) {
            setStatus('distance required and must be a number');
            return;
        }
        fetch('http://localhost:8000/service/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            },
            body: JSON.stringify(servicedata)
        })
            .then(res => res.json())
            .then(data => {
                setStatus(data.message)
                setServicedata({
                  starting: '',
                  ending: '',
                  price: '',
                  killometer: ''
              });
            })
            .catch(err => console.log(err));
    };
    
    const deleteservice = (deleteid) => {
        fetch(`http://localhost:8000/service/${deleteid}`, {
            method: 'DELETE',
            headers: {
                Authorization: `${token}`, 
            },
        })
        .then(res => res.json())
        .then(data => {
          setService(prevService => prevService.filter(service => service._id !== deleteid));
        })
          .catch(err => console.log(err))
      }
   

    const [editFormDisplay, setEditFormDisplay] = useState({});

     const toggleEditFormDisplay = (serviceId) => {
        setEditFormDisplay((prevDisplay) => ({
          ...prevDisplay,
          [serviceId]: prevDisplay[serviceId] === 'block' ? 'none' : 'block',
        }));
      };


      const handleupdateservice = (serviceid) => {
        if (!editServiceData['starting'] || typeof editServiceData['starting'] !== 'string') {
          setServicestatus('starting required and must be a valid city name');
          return;
      }
      
      if (!editServiceData['ending'] || typeof editServiceData['ending'] !== 'string') {
          setServicestatus('ending required and must be a valid city name');
          return;
      }
      
      if (!editServiceData['price'] || isNaN(editServiceData['price'])) {
          setServicestatus('price required and must be a number');
          return;
      }
      
      if (!editServiceData['killometer'] || isNaN(editServiceData['killometer'])) {
          setServicestatus('distance required and must be a number');
          return;
      }
      

  
        fetch(`http://localhost:8000/service/${serviceid}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `${token}`
            },
            body: JSON.stringify(editServiceData),
          
        })
            .then(res => res.json())
            .then(data => {
                setServicestatus(data.message);
            })
            .catch(err => console.log(err));
    };

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
                        <a  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">service page</a>
                      </div> 
                    </div> 
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
                </div>
              </div>


              <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  <a  className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">User home page</a>
                </div>
              </div>
              </div>
      </nav>
        </div>
       <h3><button onClick={()=>setFlag(true)} className='m-6 p-2.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add service </button></h3>
       {  flag &&
           <div>

            <input
                type="text"
                placeholder="starting"
                className="m-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={e => {
                    setServicedata({ ...servicedata, starting: e.target.value });
                }}
            />
            <input
                type="text"
                placeholder="ending"
                className="m-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={e => {
                    setServicedata({ ...servicedata, ending: e.target.value });
                }}
            />
            <input
                type="text"
                placeholder="price"
                className=" m-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={e => {
                    setServicedata({ ...servicedata, price: e.target.value });
                }}
            />
            <input
                type="text"
                placeholder="distance"
                className="m-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={e => {
                    setServicedata({ ...servicedata, killometer: e.target.value });
                }}

            />
            <div className='m-5 p-2.5'>
               {status}
            </div>
            

            <div>
                <button className='m-6 p-2.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  onClick={handleaddservice}>add</button>
                <button className='m-5 p-2.5  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  onClick={()=>{setFlag(false); setStatus("no service added")}}>cancel</button>
            </div>
            </div>
          
       }
         <div>

         </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 m-4">
                    {service.length > 0 ? (
                      service.map((user, index) => (
                        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg p-4">
                          <h3 className="font-bold text-xl mb-2">Bus intail point: {user.starting}</h3>
                          <h3 className="font-bold text-xl mb-2">Destination: {user.ending}</h3>
                          <h3 className="font-bold text-xl mb-2">Price: {user.price}</h3>
                          <h3 className="font-bold text-xl mb-2">Total distance: {user.killometer}</h3>
                          <div className="px-6 pt-4 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-4 mb-2">
                            <button className='m-2' onClick={() => {
                                toggleEditFormDisplay(user._id)
                                setEditedServiceId(user._id);
                                setEditFlag(true);
                            }}>
                                edit service
                            </button>
                            </span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                              <button className='m-2' onClick={()=>deleteservice(user._id)}>
                                delete service
                              </button>
                            </span>
                       <div >
                               <div   className={`edit-form`}
                                      style={{ display: editFormDisplay[user._id] || 'none' }}>
                                    {editFlag &&  editedServiceId === user._id && (
                                  <div className='editform'>
                                                                  
                                      <input
                                          type="text"
                                          placeholder="starting"
                                          className="m-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          onChange={e => {
                                              setEditServiceData({ ...editServiceData, starting: e.target.value });
                                          }}
                                      />
                                      <input
                                          type="text"
                                          placeholder="ending"
                                          className="m-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          onChange={e => {
                                              setEditServiceData({ ...editServiceData, ending: e.target.value });
                                          }}
                                      />
                                      <input
                                          type="text"
                                          placeholder="price"
                                          className=" m-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          onChange={e => {
                                              setEditServiceData({ ...editServiceData, price: e.target.value });
                                          }}
                                      />
                                      <input
                                          type="text"
                                          placeholder="distance"
                                          className="m-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                          onChange={e => {
                                              setEditServiceData({ ...editServiceData, killometer: e.target.value });
                                          }}
                                                              />
                                    <div className='m-5 p-2.5'>
                                      {servicestatus}
                                    </div>
            
                                              <div>
                                          <button className='m-6 p-2.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={()=>handleupdateservice(user._id)}>
                                              Update
                                          </button>
                                          <button className='m-5 p-2.5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setEditFlag(false)}>
                                              Cancel
                                          </button>
                                        </div>
                                 </div>
                            )}
                </div>
                            </div>
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

export default Service