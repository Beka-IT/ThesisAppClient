 import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Header from './components/Header';

function App() {
  return (
   <div className='App'>
    <Header/>
    <BrowserRouter>
     <Routes>
      <Route path="/" Component={SignIn} ></Route>
      <Route path="/sign-up" Component={SignUp} ></Route>
     </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
