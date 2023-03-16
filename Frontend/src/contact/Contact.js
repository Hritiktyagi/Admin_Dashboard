import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

const Contact = () => {
  const _useNavigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("user_key"))
    {
     // console.log("if part")
    }
    else
    {
     // console.log("else part")
     _useNavigate("/login");
    }
 },[])
  return (
    <div>Contact</div>
  )
}

export default Contact