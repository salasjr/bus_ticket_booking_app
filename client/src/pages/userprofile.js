/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useLocation, useNavigation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../forms/formstyle.css'

function Userprofile() {
    const [photo,setphoto] = useState('no photo')
    const location = useLocation();
    const { user, token } = location.state;
    const [image, setImage] = useState(null);
    const [uploadbutton, setUploadbutton] = useState(false)
    const [fetcheduser, Setfetcheduser] = useState(user)
    const [updatepro,setUpdatepro] = useState(false)
    const [updatedata, setupdateData] = useState({
        email: '',
        name: '',
        phonenumber: ''
    });
    const [status, setStatus] = useState('Not updated yet');

    useEffect(() => {
      fetch('http://localhost:8000/image/getimage', {
          method: 'GET',
          headers: {
              Authorization: `${token}`, 
          },
      })
      .then((res) => res.json())
      .then((data) => {
          if (data.getuserphoto.photo) {
              setphoto(data.getuserphoto.photo);
              setUploadbutton(true);
          }
      })
      .catch((err) => {
          console.error('Error fetching user photo', err);
      });
  }, [token]);

    const handleImageUpload = () => {
        const inputElement = document.createElement('input');
        inputElement.type = 'file';
        inputElement.accept = 'image/*';
        inputElement.onchange = (e) => {
            const file = e.target.files[0];
            setImage(file);

            const formData = new FormData();
            formData.append('myimage', file);

            fetch('http://localhost:8000/image/upload', {
                method: 'POST',
                headers: {
                    Authorization: `${token}`, 
                },
                body: formData,
            })
            .then((res) => res.json())
            .then((data) => {
                setphoto(data.photo)
                setUploadbutton(true)
            })
            .catch((err) => {
                console.error('Error uploading image', err);
            });
        };

        inputElement.click();
    };


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
        fetch(`http://localhost:8000/user/${user._id}`, {
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

    const navigate = useNavigate();
    const handlebookclick = () => {
        navigate('/userbookdetail',{
            state:{
                user:user,
                token:token,
            }
        });
    }
    const handlelogout = () => {
        navigate('/userlogin',{replace:true})
      }
     
    return (

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
                        <a  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">User profile page</a>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div>
                      <button onClick={handlebookclick} className='text-white  mr-8'>my book list</button>
                    </div>
                      <button className='text-white m-2' onClick={handlelogout}>sing out</button>
                    <div className="relative ml-3">
                    </div>
                  </div>
                </div>
              </div>
             </nav>
        <div >
            <div className='profile'>
            <div>
            <p  className="bg-amber-50 shadow-2xl m-6 p-4 font-medium  text-xl font-sans w-1/2">Name {fetcheduser.name}</p>
            <p className="bg-amber-50  shadow-2xl m-6 p-4 font-medium  text-xl font-sans w-1/2">Email {fetcheduser.email}</p>
            <p className="bg-amber-50  shadow-2xl m-6 p-4 font-medium  text-xl font-sans w-1/2"> Phone number : {fetcheduser.phonenumber}</p>
            </div>
             <div className='mt-10'>
              <img src={`${photo}`} alt='profile
              'style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                 }}/>

                <button onClick={handleImageUpload} className='mt-5 py-2 px-4 bg-gray-800 text-white font-semibold rounded-lg shadow-m focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>change profile picture</button>
               </div>
          
             </div>
            <div>
                {!uploadbutton && <button onClick={handleImageUpload} className='py-2 px-4 bg-gray-800 text-white font-semibold rounded-lg shadow-m focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 m-10'>Upload Photo</button>}
            </div>
            <div className='m-10 '>
                <button onClick={()=>setUpdatepro(true)} className='py-2 px-4 bg-gray-800 text-white font-semibold rounded-lg shadow-m focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>update profile</button>
                
            </div>

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
            <button onClick={()=>{setUpdatepro(false);setStatus('not updated')}} className='mt-5 py-2 px-4 bg-gray-800 text-white font-semibold rounded-lg shadow-m focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'>cancle</button>


     
        </div>
                }

            </div>
            
        </div>
        </div>
    );
}

export default Userprofile;
