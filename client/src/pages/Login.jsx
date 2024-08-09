import FormLogin from "../components/form/FormLogin";
import Header from "../components/header/Header";


function Login() {
    return (
    <div className="container">
        <Header title={`Welcome to World Wide of Football`} />

        <FormLogin />
    </div>
    )
}

export default Login;