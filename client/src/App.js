
import './App.css';
import Landingpage from './pages/landingpage';
import Userlogin from './forms/userlogin';
import Usersignup from './forms/usersignup';
import Userhomepage from './pages/userhomepage';
import Userprofile from './pages/userprofile';
import Userbusdetail from './pages/userbusdetail';
import Userbookdetail from './pages/userbookdetail';
import Bussignup from './forms/bussignup';
import Bushomepage from './pages/bushomepage';
import Service from './pages/service';
import Busbooked from './pages/busbooked';
import Buslogin from './forms/buslogin';

import {BrowserRouter,Routes, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path= '/' element = {<Landingpage/>}/>
      <Route path= '/userlogin' element = {<Userlogin/>}/>
      <Route path= '/usersignup' element = {<Usersignup/>}/>
      <Route path= '/userhomepage' element = {<Userhomepage/>}/>
      <Route path= '/userprofile' element = {<Userprofile/>}/>
      <Route path= '/userbusdetail' element = {<Userbusdetail/>}/>
      <Route path= '/userbookdetail' element = {<Userbookdetail/>}/>
      <Route path= '/bussingup' element = {<Bussignup/>}/>
      <Route path= '/buslogin' element = {<Buslogin/>}/>
      <Route path= '/bushome' element = {<Bushomepage/>}/>
      <Route path= '/service' element = {<Service/>}/>
      <Route path= '/busbooked' element = {<Busbooked/>}/>
    </Routes>
     </BrowserRouter> 
  );
}

export default App;
