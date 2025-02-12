

import Signup from './Components/Signup'
import Login from './Components/Login'
import PrivateRoute from './Routes/PrivateRoutes';
import Dashboard from './Components/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer} from "react-toastify";
import Guestmode from './Components/Guestmode';
function App() {
  

  return (
   
    <>
        <ToastContainer/>
     <BrowserRouter>
   <Routes>
    
   <Route path='/' element={<Signup/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path="/dashboard"  element={<PrivateRoute element={<Dashboard />} />}  />
   <Route path='/guestmode' element={<Guestmode/>}/>
  
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
