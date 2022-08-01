import React, { useState, } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadIt } from '../features/logSlice';


const SignUp = () => {

    // const [body, setBody] = useState({
    //     username: '',
    //     email: '',
    //     password: ''
    // })

    const navigate = useNavigate();


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const body = {
        username: username,
        email: email,
        password: password
    }

    // const dispatch = useDispatch();
    // const loadingVal = useSelector((state) => state.loading);

    const RegUser = (e) => {
        e.preventDefault();
        // 

        // (e.target.password.value !== e.target.confPassword.value) && toast.error('password and confirm password do not match')
        
        
        if(e.target.password.value === e.target.confPassword.value){
            setUsername(e.target.username.value)
            setEmail(e.target.email.value)
            setPassword(e.target.password.value)
        }else {
            toast.error('passwords does not match!')
        }

        const fetchData = async () =>{
            setLoading((prev) => !prev);
            try {
                const response = await axios.post("https://ums-mern.herokuapp.com/api/signup", body);
                    console.log(response);
                    // dispatch({type: loadIt})
                    setLoading((prev) => !prev);
                    toast.success('account created') //response.data.success
                    setTimeout(()=>{
                        navigate('/signin')
                    }, 3000)
            } catch (error) {
                
                // dispatch({type: loadIt})
                setLoading((prev) => !prev);

                (error.message === "Network Error") ?
                toast.error("Network Error") 
                :
                toast.error(error.response.data.error)
            }        
        };

        fetchData()
    }


    return (
        <div style={{ textAlign: 'center', marginRight: 'auto', marginLeft: 'auto' }} >
            <h2>Sign-Up</h2>
            {
                loading
                && 
                <div style={{ position: 'fixed', backgroundColor: 'rgba(0,0,0,0.8)', top: 0, bottom: 0, left: 0, right: 0, height: '100%', width: '100%', display: 'block' }}>
                    <p style={{ color: 'white', marginTop: '45%', textAlign: 'center' }}>loading...</p>
                </div>
            }
            <ToastContainer />
            <form onSubmit={(e) => RegUser(e)}>
                <input style={{ margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }} type='text' name='username' placeholder='Username' /><br />
                <input style={{ margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }} type='email'  name='email'  placeholder='Email' /><br />
                <input style={{ margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }} type='password' name='password' placeholder='Password' /><br /> 
                <input style={{ margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }} type='password' name='confPassword' placeholder='Confirm Password' /><br /> 
                <input style={{ margin: 10, height: 35, width: 250, borderRadius: 20, textAlign: 'center' }} type='submit' value='sign up' />
            </form>
            <i>already have an account <Link to='/signin'>sign in</Link>!</i>
            {/* <button onClick={ }>ppp</button> */}
        </div>
    );
}

// onChange={ (e) => { e.preventDefault(); setUserData({ ...userData, username: e.target.value})}}
 
export default SignUp;