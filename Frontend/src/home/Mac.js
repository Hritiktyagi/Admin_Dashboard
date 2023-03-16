import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../home/Mac.css';
export const Mac = () => {



     const navigate = useNavigate();
     function handleClick() {
          navigate('/mac_product')
     }
     function handleEvent() {
          navigate('/macbook_pro_product')
     }


     const _useNavigate = useNavigate();
     useEffect(() => {
          if (localStorage.getItem("user_key")) {
               // console.log("if part")
          }
          else {
               _useNavigate("/login")
          }
     }, []);


     return (
        
      <>
              
      <div className="container">
           <div className="row">
                <div className="col-md-12">
                     <div className="typography-body">
                          <label className='section-content-label'>New</label>
                          <h1 className='product-headline'>MacBook Air</h1>
                          <p className='product-price'>From ₹119900.00*</p>
                          <div className='cta-links'>
                               <div className="link-container">
                                    <a href='' className='btn btn-primary' onClick={handleClick}>Buy</a>
                               </div>
                               <div className="link-container">
                                    <a href=' ' className='button'>Learn more </a><span className='arrow-after-more'>&rarr;</span>
                               </div>
                          </div>
                     </div>
                     <div className="container p-5" >
                          <div className="image-wrapper">
                               <figure className='macbook-air-image' >
                                    <img src='	https://www.apple.com/v/mac/home/br/images/overview/hero/macbook_air_m2__r1jrymq4ftea_medium.jpg' alt='macbook-air'></img>
                               </figure>
                          </div>
                     </div>
                </div>
           </div>
      </div>

      <div className="container-fluid">
           <div className="row">
                <div className="col-md-12 p-0">
                     <div className="section-content-macbook-pro">
                          <div className="typography-body body-margin-man">
                               <div className="section-content-label">New</div>
                               <h1 className='product-headline'>MacBook Pro 13”</h1>
                               <p className='product-price'>From ₹129900.00*</p>
                               <div className='cta-links'>
                                    <div className="link-container">
                                         <a href=' ' className='btn btn-primary' onClick={handleEvent}>Buy</a>
                                    </div>
                                    <div className="link-container">
                                         <a href=' ' className='button'>Learn more </a><span className='arrow-after-more'>&rarr;</span>
                                    </div>
                               </div>
                          </div>
                          <div className="image-wrapper">
                               <figure className='macbook-air-image'>
                                    <img src='https://www.apple.com/v/mac/home/br/images/overview/hero/macbook_pro_13__e3r46kd69eoi_large.jpg' alt='macbook-air'></img>
                               </figure>
                          </div>
                     </div>
                </div>
           </div>
      </div>



 </>
          
     );
};