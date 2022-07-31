import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import avater from './image/avater.jpg';

const UsrLandingPg = () => {

  const [username, setUsername] = useState('');
  // const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token')

  // const config = {
  //   'Content-Type': 'application/json',
  //   authorization: 'Bearer ' + local
  // }

  useEffect(()=>{
    axios.post('http://localhost:8000/api/getuser', {token: token})
    .then((response => {
        const { username } = response.data;
        setUsername(username);
    }))
    .catch((error) => {
      console.log(error)
    })
  }, [token])

  const navigate = useNavigate()

  const logOut = () =>{
    localStorage.removeItem('token')
    setTimeout(() =>{
      navigate('/signin')
    }, 1000)
  }

  const profile = avater;

  return (
    <div>
        <div>
          <header style={{ border: '2px solid white', boxShadow: '0px 6px 10px rgb(0 0 0 / 0.2)', backgroundColor: 'rgba(240,255,255,0)', display: 'flex', height: 120, position: 'sticky', justifyContent: 'space-around' }}>
            <img alt='profile' src={profile} style={{ boxShadow: '0px 0px 10px black', border: '4px dotted black', margin: 10, borderRadius: '50%', height: 100, width: 100 }} />
            <h1 style={{ textTransform: 'capitalize', marginTop: 50 }} >welcome {username}</h1>
            <button style={{ height: 20, marginTop: 40 }} onClick={() => logOut() }  >Log Out</button>
          </header>
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-evenly' }}>
              <li style={{color: 'rgb(240, 250,250)', boxShadow: '1px 4px 5px rgb(0 0 0 /0.2)' }} ><Link style={{ textDecoration: 'none', color: 'blue' }} to='/home/posts' >Posts</Link></li>
              <li style={{color: 'rgb(240, 250,250)', boxShadow: '1px 4px 5px rgb(0 0 0 /0.2)' }} ><Link style={{ textDecoration: 'none', color: 'blue' }} to='/home/dashboard' >Dashboard</Link></li>
            </ul>
          </nav>
        </div>
        <Outlet />
        {/* <Routes>
          <Route path='/home/posts' element={<Posts />} />
          <Route path='/home/dashboard' element={<Dashboard />} />
        </Routes> */}
    </div>
  )
}

export default UsrLandingPg