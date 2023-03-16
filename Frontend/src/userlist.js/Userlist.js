import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


const Userlist = () => {

  
  const target = useNavigate();
  useEffect(() => {
       if (localStorage.getItem("user_key")) {
            // console.log("if part")
       }
       else {
        target("/login")
       }
  }, []);


  //  useEffect(()=>{
  //   if(localStorage.getItem("user_key")){

  //   }
  //   else{}
  //  })


    
    const [data,SetData]=useState([])
    const [msg,setMsg]=useState("")


    const _useNavigate = useNavigate();
    
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
       if(user.user.isadmin)
       {
       
        const getDataAll = () => {
          axios.get(" http://localhost:4004/sign-up/")
          .then((res)=>{
           
              SetData(res.data)
              console.log(res.data)
          })
          .then((err)=>{
              console.log(err)
          })
         }
        getDataAll();
       } else {
        SetData([user.user]);
       }
    },[]);
    
      
    const deleteRecord = (_id) => {
    Swal.fire({
      title: 'Do you want to Delete these changes '+_id+' ?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then((result) => {  
      if (result.isConfirmed) {
           axios.delete(" http://localhost:4004/sign-up/"+_id)
      .then((res)=>{
        console.log(res)
         Swal.fire('Deleted!', '', 'Deleted')
         setMsg("Deleted")
        
      })
      .then((err)=>{
        console.log(err)
      })
    
      } else if (result.isDenied) {
        Swal.fire('Changes are saved ', '', 'info')
      }
    })
    
     
  }

  const navigate = useNavigate();
  const update_data = (item) => {
    localStorage.setItem("user",JSON.stringify(item));
    navigate("/update/"+item._id)
  }
     


  const redirect = useNavigate();
  const logout = () => {
   localStorage.removeItem("user_key");
   redirect("/login")
  }



  
   
   


  return (
    <>
   <div className="container">
    <div className="row">
        <div className="col-md-12">
            <div className="head">
                User Profile
            </div>
        </div>
    </div>
    <br/>
    <div className="row">
    {/* <div className="col-md-2"></div> */}
    <div className="col-md-12">
        <table border="1" width="100%">
          <thead>
            <tr>
                <th>First Name</th>
                <th>Email ID</th>
                <th>Mobile Number</th>
                <th>Action</th>
               
               
                
            </tr>
          </thead>
          <tbody>
           {data.map((item,index)=>
            <tr key={index}>
                <td>{item.name}</td>   
                <td>{item.email}</td>
                <td>{item.mobno}</td>
                
                <td><button className='btn btn-success' onClick={()=> update_data(item)}>Update</button>
                &nbsp;
                <a href="javascript:void(0)" className='btn btn-danger' onClick={()=>{deleteRecord(item._id)}} >Delete</a>
                </td>
            </tr>
           )}
          </tbody>

         
       
        </table>
        <br/>

        <button className='btn btn-success'><Link className="nav-link" to="/login" onClick={logout}>Log out</Link></button>
        
    </div>
    {/* <div className="col-md-2"></div> */}
    </div>
   </div>
    </>
  )
}


export default Userlist