import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'react-moment'

const AllPost = () => {

  // const [title2, setTitle2] = useState('')
  // const [body2, setBody2] = useState('')
  // const [image2, setImage2] = useState('')

  // const [user, setUser] = useState('')
  // const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)

  const [obj, setObj] = useState([]);


    useEffect(()=>{
      setLoading(true)
      const fetchData = async() =>{
        const response = await axios.get('https://ums-mern.herokuapp.com/api/getposts');
        try {
          setLoading(false)
          console.log(response)
          // setTitle2(response.data.title)
          // setBody2(response.data.body)
          // setImage2(response.data.image)
          // setUser(response.data.author)
          // setDate(response.data.created)
          setObj([...response.data])
          toast.success('post created')
        } catch (error) {
          setLoading(false)
          console.log(error)
          toast.error(error.response.data.error)
        }
      }

      fetchData();
    }, []);

  return (
    <div>
      {
        loading ? 
        <div style={{ marginTop: '40%', position: 'fixed', backgroundColor: 'rgba(0,0,0,0.8)', top: 0, bottom: 0, left: 0, right: 0, height: '100%', width: '100%', display: 'block' }}>
          <p style={{ color: 'white', marginTop: 30, textAlign: 'center' }}>posts loading...</p>
        </div>

        :

        (!obj) ? <p>no post</p>
        :
        <div>
          {
            obj.map((el)=>
            <div key={el._id} style={{ margin: 30, marginRight: 'auto', marginLeft: 'auto', border: '4px solid white', borderRadius: 20, width: 600, boxShadow: '0px 6px 10px rgb(0 0 0 / 0.2), 0px -6px 10px rgb(230 240 240 / 0.2)', backgroundColor: 'rgba(240 255 255,0)' }}>
              <p><b style={{ textTransform: 'capitalize' }}>{el.author}</b>  <Moment fromNow>{ el.created }</Moment></p>
              <div style={{ border: '2px solid black', borderRadius: 20, textAlign: 'center', margin: 30, }}>
                <h3>{el.title}</h3>
                {
                  el.image ?                 
                    <img alt='post' height = '220' width = '300' src={el.image} />
                  :
                  ''
                }
                <p>{el.body}</p>
              </div>
              {/* <button onClick={() =>  }>like {el.like}</button> */}
            </div>
            )
          }
        </div>
      }
    </div>
  )
}

export default AllPost