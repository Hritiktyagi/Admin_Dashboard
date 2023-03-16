import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = (props) => {
  //   const _useNavigate = useNavigate();
  //  const logout = () => {
  //   localStorage.removeItem("user_key");
  //   _useNavigate("/login")
  //  }
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* <Link className="navbar-brand" href="#">Navbar</Link> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="contact">Contact</Link>
              </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="userlist">User Profile</Link>
                  </li> 
           
                  <li className="nav-item">
                    <Link className="nav-link" to="login" state={{fn:() => setIsLoggedIn()}}>Log In</Link>
                  </li>
              {/* <li className="nav-item ">
          <Link className="nav-link" to="sign_up">Sign Up</Link>
        </li> */}

              <li className="nav-item">
                <Link className="nav-link" to="update"></Link>
              </li>
              {/* <li className="nav-item">
          <Link className="nav-link" to="login" onClick={logout}>Log out</Link>
        </li> */}
              <li className="nav-item">
                <Link className="nav-link" href="*"></Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header