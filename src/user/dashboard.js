import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {

  const [loading, setLoading] = useState(false)
  const [obj, setObj] = useState([]);
  const [nul, setNul] = useState(false)
  const token = localStorage.getItem('token')

  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true)
    const fetchData = async() =>{
      const response = await axios.post('http://localhost:8000/api/getpost/:id', {token: token});
      try {
        setLoading(false)
        if(response.data === null){
          setNul(true)
        }else{
          setObj([...response.data])
        }
      } catch (error) {
        setLoading(false)
        console.log(error)
        toast.error(error.response.data)
      }
    }

    fetchData();
  }, [token, setNul]);

  const [delSus, setDelSus] = useState(false)
  const body = {
    token: token
  }

  const delUser = () =>{
    setDelSus(true)
    const del = async() =>{
      const res = axios.post('http://localhost:8000/api/delacc/:id', body)
      try {
        setDelSus(false)
        console.log(res)
        toast.success(res.data);
        navigate('/signup')
      } catch (error) {
        setDelSus(false)
        console.log(error)
        toast.error(error.response.data.error)
      }
    }

    del();
  }

  return (
    <div>
      {
        loading ? 
        <div style={{ marginTop: '40%', position: 'fixed', backgroundColor: 'rgba(0,0,0,0.8)', top: 0, bottom: 0, left: 0, right: 0, height: '100%', width: '100%', display: 'block' }}>
          <p style={{ color: 'white', marginTop: 30, textAlign: 'center' }}>posts loading...</p>
        </div>
        :
        <div>
          <div>
            <button style={{ float: 'right', color: 'red', borderRadius: 25, height: 40, width: 150, textAlign: 'center' }} onClick={() => delUser()} >Delete Account</button>
          </div>
          
          {
            delSus
            && 
            <div style={{ position: 'fixed', backgroundColor: 'rgba(0,0,0,0.8)', top: 0, bottom: 0, left: 0, right: 0, height: '100%', width: '100%', display: 'block' }}>
                <p style={{ color: 'white', marginTop: '45%', textAlign: 'center' }}>loading...</p>
            </div>
          }

          <h3>Your Posts</h3>
          {
            nul && 
            <div>
              <p style={{ textAlign: 'center', marginTop: 40 }}>No Post</p>
            </div>
          }
          {
            obj.map((el)=>
            <div key={ Date.now() } style={{ margin: 30, marginRight: 'auto', marginLeft: 'auto', border: '4px solid white', borderRadius: 20, width: 600, boxShadow: '0px 6px 10px rgb(0 0 0 / 0.2), 0px -6px 10px rgb(230 240 240 / 0.2)', backgroundColor: 'rgba(240 255 255,0)' }}>
              <p><b style={{ textTransform: 'capitalize' }}>{el.author}</b>  <Moment fromNow>{ el.created }</Moment></p>
              <div style={{ border: '2px solid black', borderRadius: 20, textAlign: 'center', margin: 30, }}>
                <h3>{el.title}</h3>
                <img alt='post' style={{ height: 220, width: 300 }} src={el.image} />
                <p>{el.body}</p>
              </div>
            </div>
            )
          }
        
        </div>
      }
    </div>
  )
}

export default Dashboard