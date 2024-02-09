import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import {useContext} from 'react';
import AuthContext from '../store/authContext';

import Header from '../components/Header';
import Home from '../components/Home';
import Auth from '../components/Auth';
import Form from '../components/Form';
import Profile from '../components/Profile';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const {state} = useContext(AuthContext);

  return (
    <div className='app'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={!state.token ? <Auth/> : <Navigate to='/' />}/>
        <Route path='/form' element={state.token ? <Form/> : <Navigate to='/auth' />}/>
        <Route path='/profile' element={state.token ? <Profile/> : <Navigate to='/auth' />}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App