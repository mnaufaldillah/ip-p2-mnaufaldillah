import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../config/axiosInstance";

function FormRegister() {
    const [newUser, setNewUser]  = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handlerRegister(event) {
        try {
            event.preventDefault();
            setLoading(true);

            // console.log(loginUser);
            
            
           await axios({
                url: `/add-user`,
                method: `POST`,
                data: {
                    fullName: newUser.fullName,
                    email: newUser.email,
                    password: newUser.password
                }
            });

            navigate(`/login`);
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
            

            console.log(errors);
            

            Swal.fire({
                title: 'Error.',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Lanjut'
            });
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="mb-3 p-3 w-25">
                <form onSubmit={handlerRegister}>
                <div className="mb-3">
                        <input 
                            type="text"
                            name="fullName"
                            id="fullName"
                            className="form-control"
                            placeholder="Full Name"
                            defaultValue={newUser.fullName}
                            onChange={(event) => setNewUser({...newUser, fullName: event.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Email"
                            defaultValue={newUser.email}
                            onChange={(event) => setNewUser({...newUser, email: event.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            defaultValue={newUser.password}
                            onChange={(event) => setNewUser({...newUser, password: event.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Sign Up!</button>
                    </div>
                </form>

                <div className="p-3">
                    <p>Have a account?  <span><Link to={`/register`}>Login.</Link></span></p>
                </div>
            </div>
        </div>
    )
}

export default FormRegister;