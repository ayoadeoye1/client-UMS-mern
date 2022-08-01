import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch } from 'react-redux'
// import { isLog } from '../features/logSlice'


const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    // const dispatch = useDispatch()
    // const local = localStorage.getItem('token')

    const navigate = useNavigate();
  
    const body = {
        email: email,
        password: password
    }
    // console.log(local)

    const RegUser = (e) => {
        e.preventDefault();
        setEmail(e.target.email.value);
        setPassword(e.target.password.value);

        const fetchDat = async () =>{
            setLoading((prev) => !prev)
            try {
                const response = await axios.post('https://ums-mern.herokuapp.com/api/signin', body); //, {withCredentials: true}
                setLoading((prev) => !prev)
                toast.success('login success')
                localStorage.setItem('token', response.data.success) 
                // dispatch({ type: isLog, payload: local });
                setTimeout(() =>{
                    navigate('/home')
                }, 1000)        
            } catch (error) {
                console.log({err: error})
                setLoading((prev) => !prev)
                if(error.message === "Network Error"){
                    toast.error("Network Error") 
                }else{
                    toast.error(error.response.data.error)
                }
                
            }            
        }

        fetchDat();

    }


    return (
        <div style={{ textAlign: 'center', marginRight: 'auto', marginLeft: 'auto' }} >
            <ToastContainer />
            {
                loading
                && 
                <div style={{ position: 'fixed', backgroundColor: 'rgba(0,0,0,0.8)', top: 0, bottom: 0, left: 0, right: 0, height: '100%', width: '100%', display: 'block' }}>
                    <p style={{ color: 'white', marginTop: '45%', textAlign: 'center' }}>loading...</p>
                </div>
            }
            <h2>Sign-In</h2>
            <form onSubmit={(e) => RegUser(e)}>
                <input style={{ margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }} type='email'  name='email' placeholder='Email' /><br />
                <input style={{ margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }} type='password' name='password'  placeholder='Password' /><br /> 
                <input style={{ margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }} type='submit' value='sign in' />
            </form>
            <i>don't have an account <Link to='/signup'>sign up</Link>!</i>
        </div>
    );
}
 
export default SignIn;