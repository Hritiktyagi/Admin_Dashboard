import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = (props) => {
  
    const params = useParams();
    console.log(params)
    const user = JSON.parse(localStorage.getItem("user")) || {
        id: '',
        Name: '',
        Email: '',
        mobno: '',
        pass: '',
    };

    // console.log('>>>>>>>>>>>>>', typeof     user);
    
    const [state, setState] = useState(
        user
    )



    // console.log(props.location.state)
    useEffect(() => {
        console.log('stae>>>>>>>>> ', state)
        axios.get("http://localhost:4004/sign-up/"+state._id, state)
            .then((res) => {
                // setState(res.data)
                console.log(res)
            })
            .then((err) => {
                console.log(err)
            })
    }, [])

    const handler = (event) => {
        const { name, value } = event.target;
        setState({ ...state, [name]: value })
    }
    const navigate = useNavigate()
    const signup = (event) => {
        event.preventDefault();
        console.log(state)
        axios.put("http://localhost:4004/sign-up/"+state._id, state)
            .then((res) => {
                setState(res.data)
             
                navigate("/userlist")
            })
           

            .then((err) => {
                console.log(err)
            })
    }



    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="head">
                            Update User
                        </div>
                    </div>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <form action="" onSubmit={signup} method="POST">
                        <div className="row">

                            <div className="col">
                                <input type="text" name="name" value={state.name} className="form-control" onChange={handler} placeholder="First name" />
                            </div>
                      

                        </div>

                        <div className="row" style={{ marginTop: "2%" }}>

                      



                            <div className="row" style={{ marginTop: "2%" }}>

                                <div className="col">
                                    <input type="text" name="email" value={state.email} className="form-control" placeholder="Mobile NUmber" onChange={handler} />
                                </div>
                                <div className="col">
                                    <input type="text" name="mobno" value={state.mobno} className="form-control" placeholder="Email_Id" onChange={handler} />
                                </div>

                            </div>
                           

                            <br />

                            <div className="col">
                                <input type="submit" className="btn btn-success" value="update user" />
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </form>
                </div>
                <div className="col-md-2"></div>
            </div>
        </>
    )
}

export default Update