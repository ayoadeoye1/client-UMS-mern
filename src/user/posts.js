import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Moment from 'react-moment';
import FileBase from 'react-file-base64'

import AllPost from './allPost';



const Posts = () => {

  const [post, setPost] = useState({
    title: '',
    article: ''
  });

  const [image, setImage] = useState({})

  const [title2, setTitle2] = useState('')
  const [body2, setBody2] = useState('')
  const [image2, setImage2] = useState('')

  const { title, article} = post;

  const [create, setCreate] = useState(false);

  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('token')

  const body = {
    token,
    ...post,
    image
  }

  const handlePost = (e) =>{
    e.preventDefault();

    setLoading((prev) => !prev )

    const fetchData = async() =>{
      const response = await axios.post('https://ums-mern.herokuapp.com/api/createpost/:id', body);
      try {
        setLoading((prev) => !prev )
        console.log(response)
        setTitle2(response.data.title)
        setBody2(response.data.body)
        setImage2(response.data.image)
      } catch (error) {
        setLoading((prev) => !prev )
        console.log(error)
        toast.error(error.message)
      }
    }

    fetchData()

    setCreate((prev) => !prev)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 30 }}>
        <button onClick={() => setCreate((prev) => !prev)}>create post</button>
      {  
        create && 
        <div style={{ position: 'fixed', backgroundColor: 'rgba(0,0,0,0.8)', top: 0, bottom: 0, left: 0, right: 0, height: '100%', width: '100%', display: 'block' }}>
          <button style={{ float: 'right',  }} onClick={() => setCreate((prev) => !prev)} >X</button>
          <div style={{ color: 'white'}}>
            <h2>{title}</h2>
            <img alt='post img' height="150" width="200" src={image} />
            <p>{article}</p>
          </div>
          <form style={{ margin: 100, textAlign: 'center' }} onSubmit={(e) =>{ handlePost(e) }} >
            <input style={{ margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }} type='text' name='title' value={title} onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value})}  placeholder='Post Title' /><br />
            <input style={{ margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }} type='text' name='article' value={article} onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value})} placeholder='Post Body' /><br />
            <div style={{ marginLeft: 'auto', marginRight: 'auto', color: 'red', margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }}>
              <FileBase type='file' multiple={false} onDone={({base64}) => { setImage(base64) }} />
            </div>
            <input style={{ margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }} type='submit' placeholder='submit' />
          </form>
        </div>
      }
        <div>
          <h2>Posts</h2>
          <div>
            {
            loading? 
              <div style={{ position: 'fixed', backgroundColor: 'rgba(0,0,0,0.8)', top: 0, bottom: 0, left: 0, right: 0, height: '100%', width: '100%', display: 'block' }}>
                <p style={{ color: 'white', marginTop: '45%', textAlign: 'center' }}>loading...</p>
              </div>
            :
              (title2 || body2 || image2) && <div>
                <div style={{ border: '4px solid black', width: 600, borderRadius: 20 }}>
                  <p>{}  <Moment fromNow>{ Date.now() }</Moment></p>
                  <div style={{ border: '2px solid black', borderRadius: 20, textAlign: 'center', margin: 30, }}>
                    <h3>{title2}</h3>
                    <img alt='post' height="220" width="300" src={image2} />
                    <p>{body2}</p>
                  </div>
                </div>
              </div>
            }
          </div>
          <div>
            <AllPost />
          </div>
        </div>
    </div>
  )
}

export default Posts