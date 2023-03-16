import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


export const Login = () => {
    const [state,setState]=useState({
        username:'',
        password:''
    })
    
    const _useNavigate=useNavigate();

    const handler=(event)=>{
        const {name,value}=event.target;
        setState({...state,[name]:value})
    }
    const login=(event)=>{
        event.preventDefault();
        console.log(state);
        axios.post("http://localhost:4004/login",state)
        .then((res)=>{
            console.log(res);
            console.log(res.data.token)
            // token
            // console.log('data ->>>>> ', res.data.user);
            if(res.data.user) {

                localStorage.setItem("user_key",res.data.token);
                localStorage.setItem("user",JSON.stringify(res.data));
                Swal.fire({
                    position:'between',
                    icon:'success',
                    title:'You have logged In Succesfullyy',
                    showConfirmButton:false,
                    timer: 1500
                })
                _useNavigate("/userlist");
            } else {
                alert("email or password incorrect")
            }

        })
        .catch((err)=>{
            console.log(err);
        })
 }

 const redirecting = useNavigate();
 const navigateTo = () => {
    redirecting('/sign_up')
 }

  return (
    <>
        <div className="container">
            <div className="row">
            <div className="col-md-3"></div>
               <div className="col-md-6">
               <div className='head'>Login</div>
                        <form action='' onSubmit={login}>
                            <div className="mb-3">
                                <lable className="form-label">Username</lable>
                                <input type="text"  className='form-control' name="username" onChange={handler} placeholder='Username'></input>
                            </div>
                            <div className="mb-3">
                                <lable className="form-label">password</lable>
                                <input type="text" name='password'  onChange={handler} className="form-control" placeholder="Password" />
                            </div>
                            <div className="mb-3">



                          
                                <input type="submit" className='form-control btn btn-primary' value="Log In"/>
                          

                                

                                Not a Memeber Yet ? <br/> <input type="submit" className='form-control btn btn-primary' value="Sign In" onClick={navigateTo}/>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6"></div>
               </div>
                </div>
            
        
    </>
  )
}
