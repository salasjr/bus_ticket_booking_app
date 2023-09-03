/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Bushomepage() {
    const location = useLocation();
    const { user,token} = location.state;
    const [busowner,setBusowner] = useState(user)
    const [photo,setphoto] = useState("no photo")
    const [flag,setFlage] = useState(true)
    const navigate = useNavigate()
    const handleseriveclick = ()=>{
      navigate("/service",{
      state : {
        token:token
      }})
    }

    const busbookclick = ()=>{
      navigate("/busbooked",{
      state : {
        token:token
      }})
    }

    const handlelogout = () => {
      navigate('/buslogin',{replace:true})
    }    

  const getbusowner = () => {
    fetch(`http://localhost:8000/bus/`, {
        method: 'GET',
        headers: {
            Authorization: `${token}`, 
        },
    })
    .then(res => res.json())
    .then(data => {
      setBusowner(data.getuser)
    })
      .catch(err => console.log(err))
  }  
  useEffect(() => {
    getbusowner()
  },[])

  const handleImageUpload = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.onchange = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('myimage', file);

        fetch('http://localhost:8000/busimage/upload', {
            method: 'POST',
            headers: {
                Authorization: `${token}`, 
            },
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {
            setphoto(data.photo)
            setFlage(false)            
        })
        .catch((err) => {
            console.error('Error uploading image', err);
        });
    };

    inputElement.click();
};
const fetchuser = () => {
    fetch('http://localhost:8000/bus/getbususer', {
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
  },[])

  const [updatepro,setUpdatepro] = useState(false)
  const [updatedata, setupdateData] = useState({
      email: '',
      name: '',
      phonenumber: ''
  });
  const [status, setStatus] = useState('Not updated yet');
  const [fetcheduser, Setfetcheduser] = useState(user)
  const handleupdate = () => {
    if (!updatedata.name) {
        updatedata.name = fetcheduser.name; 
    } else if (typeof updatedata.name !== 'string') {
        setStatus('Invalid input: Name must be a string');
        return;
    }

    if (!updatedata.phonenumber) {
        updatedata.phonenumber = fetcheduser.phonenumber; 
    } else if (!updatedata.phonenumber.startsWith('2519')) {
        setStatus('Invalid input: Phone number must start with 2519');
        return;
    }

    if (!updatedata.email) {
      updatedata.email = user.email; 
  } else if (!/^\S+@\S+\.\S+$/.test(updatedata.email)) {
      setStatus('Invalid input: Email is not valid');
      return;
  }
    fetch(`http://localhost:8000/bus/${user._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `${token}`
        },
        body: JSON.stringify(updatedata)
    })
        .then(res => res.json())
        .then(data => {
            setStatus(data.message);
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
                        <a  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">{busowner.name} homepage page</a>
                      </div> 
                    </div> 
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div>
                      <button className='text-white  mr-8' onClick={handleseriveclick}>my service</button>
                    </div>
                      <button className='text-white m-2' onClick={busbookclick}>my book list</button>
                      <button className='text-white ml-8 m-2' onClick={handlelogout}>sing out</button>
                  </div>
                </div>
              </div>
              <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  <a  className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">User home page</a>
                </div>
              </div>
      </nav>
      </div>
          <div>
            <p className="m-6 shadow-md p-7">
            {busowner.name} is a reputable bus company that offers 
            reliable and efficient transportation services. With a strong commitment to 
            passenger safety and comfort, they operate a modern fleet of buses equipped with the 
            latest amenities. Whether it's daily commutes, group outings, or long-distance travel,
             TransitEase ensures a seamless and enjoyable journey for all passengers. Their experienced 
             drivers and customer-focused approach make them a preferred choice for convenient and hassle-free travel
            </p>
           <div>
            <div className="bg-white shadow-lg rounded-lg p-6  m-5">
                <div>
            <p  className="bg-amber-50 shadow-2xl m-6 p-4 font-medium  text-xl font-sans w-1/2">Company:Name {busowner.name}</p>
            <p className="bg-amber-50  shadow-2xl m-6 p-4 font-medium  text-xl font-sans w-1/2">Email {busowner.email}</p>
            <p className="bg-amber-50  shadow-2xl m-6 p-4 font-medium  text-xl font-sans w-1/2"> Phone number : {busowner.phonenumber}</p>
                </div>
            </div> 
              </div>
              <div>
              <div>
                { flag && 
                <button className='m-5 py-2 px-4 bg-green-950 text-white font-semibold rounded-lg shadow-m focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75' onClick={handleImageUpload}>
                  Upload Photo</button>
                  }
              </div>
              </div>
              <div>
              <div className='mt-10'>
                  <img src={`${busowner.photo?? photo}`} alt='profile
                  'style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    }}/> 
              </div>
               </div>    
          </div>
          <div className='m-10 '>
                <button onClick={()=>setUpdatepro(true)} className='py-2 px-4 bg-gray-800 text-white font-semibold rounded-lg shadow-m focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>update profile</button>
                
            </div>
            <div>

            <div className='m-10 '>
                {
                    updatepro&& 
                    <div>
            <h1 className='m-5 p-4 font-medium  text-xl font-sans'>update Form</h1>
            <input
                type="text"
                placeholder="Name"
                className='m-2  bg-gray-800 p-2 rounded-xl'
                onChange={e => {
                    setupdateData({ ...updatedata, name: e.target.value });
                }}
            />
            <input
                type="text"
                placeholder="Email"
                className='m-2  bg-gray-800 p-2 rounded-xl'
                onChange={e => {
                    setupdateData({ ...updatedata, email: e.target.value });
                }}
            />
            <input
                type="text"
                placeholder="Phone number"
                className='m-2  bg-gray-800 p-2 rounded-xl'
                onChange={e => {
                    setupdateData({ ...updatedata, phonenumber: e.target.value });
                }}
            />
            <button onClick={handleupdate} className='mt-5 py-2 px-4 bg-gray-800 text-white font-semibold rounded-lg shadow-m focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>update</button>
            <h4 className='m-5 p-4 font-medium  text-xl font-sans'>{status}</h4>    
            </div>
                }
            </div>
            </div>
    </div>
  )
}

export default Bushomepage