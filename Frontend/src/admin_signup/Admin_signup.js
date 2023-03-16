import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
const Admin_signup = () => {
    const [userType, setUserType] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [state,setState]=useState({
          f_name:'',
          email:'',
          mobno:'',
          pass:''
          
      })
  
      const [data,setdata]= useState("")
  
      // const uploadData = (event) => {
      //   // console.log(event.target)
      //   // console.log(event.target.files[0])
      //   setState({...state,picture:event.target.files[0]});   
      // }
  
      const handler=(event)=>{
        if (userType === "Admin" && secretKey !== "Hritik") {
          event.preventDefault();
          alert("Invalid Admin");
        }
        else
        {
          // const signup=(event)=>{
            event.preventDefault();
            console.log(state);
          //   const formData = new FormData();
          //   formData.append('f_name',state.f_name);
          //   formData.append('email',state.email);
          //   formData.append('mobno',state.mobno);
          //   formData.append('pass',state.pass);
          //   formData.append('attach',state.picture);
          let url = "http://localhost:4004/";

          if(userType === "Admin" && secretKey !== "Hritik") {
            url = url + "admin_signup"
          } else {
            url = url + "sign-up"
          }
           axios.post(url,state)
         .then((res)=>{
          console.log(res);
          debugger
          setdata(data.res)
          _useNavigate('/login')
         })
         .then((err)=>{
          console.log(err.response.data)
         })
    
        // }
        }
      
          const {name,value}=event.target;
  
          setState({...state,[name]:value})
      }
  
      const _useNavigate = useNavigate();
     
    
      
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
                <div className='head'>Signup</div>

            <form action="" onSubmit={handler}>
                <div className="mb-3">
                        <label  className="form-label">Full Name</label>
                        <div>
            Register As
            &nbsp;
            &nbsp;

            <input
              type="radio"
              name="UserType"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />
            User
            &nbsp; &nbsp;

            <input
              type="radio"
              name="UserType"
              value="Admin"
              onChange={(e) => setUserType(e.target.value)}
            />
            
            Admin
          </div>
          {userType === "Admin"?  <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text" 
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div> : null}

            <br/>
         
                        <input type="text" name='f_name' onChange={handler} className="form-control" placeholder="Full Name" />
                </div>
                {/* <div className="mb-3">
                        <label  className="form-label">Email Id</label>
                        <input type="text" name='email'  onChange={handler} className="form-control" placeholder="Email Id" />
                </div> */}
                <div className="mb-3">
                        <label  className="form-label">Mobile Number</label>
                        <input type="text" name='mobno'  onChange={handler} className="form-control" placeholder="Mobile Number" />
                </div>
                <div className="mb-3">
                        <label  className="form-label">Password</label>
                        <input type="text" name='pass'  onChange={handler} className="form-control" placeholder="Password" />
                </div>
                {/* <div className="mb-3">
                        <label  className="form-label">Upload Profile Picture</label>
                        <input type="file" name ='file' onChange={uploadData} className="form-control"  />
                </div> */}
                <div className="mb-3">
                       
                        <input type="submit" to="/signup" className="form-control btn btn-primary" value="Sign Up"/>
                </div>
            </form>    
            </div>
            <div className="col-md-3"></div>
        </div>
    </div>
  )
}

export default Admin_signup