import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import {login , logout} from './store/authSlice'
import  Header  from './components/Header/Header.jsx'
import Footer  from './components/Footer/Footer.jsx'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
        
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false);
    })
  },[])
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-slate-600'>
      <div className='w-full block'>
        <Header/>
        <main>
        Test{/* <Outlet/>*/} 
        </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App
