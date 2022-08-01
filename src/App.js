import React, {  } from 'react';
import LandingPg from './auth/landingpg';
import SignUp from './auth/signUp';
import SignIn from './auth/signIn';
import UsrLandingPg from './user/usrLandingPg';
import Posts from './user/posts';
import Dashboard from './user/dashboard';

import { Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';



const App = () => {

    // const isLog = useSelector((state) => state.isLoggedIn );

    const local = localStorage.getItem('token')


    // (!isLog) && console.log('not logged in');

    return (
       <div>
           {/* {
               local ?
                <Routes>
                    <Route path='/home' element={<UsrLandingPg />} />
                </Routes>
               
               :
        
               <div>
               <LandingPg />
               <Routes>
                   <Route path='/signup' element={<SignUp />} />
                   <Route path='/signin' element={<SignIn />} />
                   <Route path='/home' element={<UsrLandingPg />} />
               </Routes>
              </div>
           } */}

            <div>
            <LandingPg />
            <Routes>
                <Route path='/' element={<Navigate to = '/signup' />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/signin' element={<SignIn />} />
                {
                local && 
                <Route path='/home/*' element={<UsrLandingPg />} >
                    <Route path='posts' element={<Posts />} />
                    <Route path='dashboard' element={<Dashboard />} />
                </Route>
                }
            </Routes>
            </div>
       </div>
    );
}
 
export default App;