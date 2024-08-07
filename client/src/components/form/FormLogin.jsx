import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../config/axiosInstance";

function FormLogin() {
    const [loginUser, setLoginUser]  = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
            async function handleCredentialResponse(response) {
                try {
                    setLoading(true);

                    const {data} = await axios({
                        url: `/google-login`,
                        method: `POST`,
                        headers: {
                            google_token: response.credential
                        }
                    });
        
                    localStorage.setItem(`access_token`, data.access_token)
        
                    navigate(`/`);
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

                }
            }
            // window.onload = function () {
                
            // }

            google.accounts.id.initialize({
                client_id: `819254476615-jbpdeo1hlfpb8c41rldcq91bmh6ol8ol.apps.googleusercontent.com`,
                callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }  // customization attributes
            );
            google.accounts.id.prompt(); // also display the One Tap dialog
        }
    )

    async function handlerLogin(event) {
        try {
            event.preventDefault();
            setLoading(true);

            // console.log(loginUser);
            
            
           const {data} = await axios({
                url: `/login`,
                method: `POST`,
                data: {
                    email: loginUser.email,
                    password: loginUser.password
                }
            });

            localStorage.setItem(`access_token`, data.access_token)

            navigate(`/`);
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
                <form onSubmit={handlerLogin}>
                    <div className="mb-3">
                        <input 
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            placeholder="Email"
                            defaultValue={loginUser.email}
                            onChange={(event) => setLoginUser({...loginUser, email: event.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            defaultValue={loginUser.password}
                            onChange={(event) => setLoginUser({...loginUser, password: event.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>

                <div className="mb-3" id="buttonDiv"></div>

                <div className="mb-3">
                    <p>Don't Have a account?  <span><Link to={`/register`}>Sign Up!</Link></span></p>
                </div>
            </div>
        </div>
    )
}

export default FormLogin;