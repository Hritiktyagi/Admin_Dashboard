
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './header/Header';

import Contact from './contact/Contact';
import Pagenotfound from './pagenotfound/Pagenotfound';

import Userlist from './userlist.js/Userlist';
import Update from './update/Update';
import  { Sign_up } from './sign_up/Sign_up';
import  { Login } from './login/Login';
import { Mac } from './home/Mac';
import Admin from './admin/Admin';
import Admin_signup from './admin_signup/Admin_signup';




function App() {
  return (
   <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Mac />} />
          <Route path="contact" element={<Contact />} />
          <Route path="update/:id" element={<Update />} />
          <Route path="userlist" element={<Userlist  />} />
          <Route path="sign_up" element={<Sign_up />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />} />
          <Route path="admin_signup" element={<Admin_signup />} />
        
          <Route path="*" element={<Pagenotfound />} />
          
        </Routes>
    
      </BrowserRouter>
   </>
  );
}

export default App;
