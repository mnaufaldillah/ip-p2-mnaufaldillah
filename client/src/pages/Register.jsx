import FormRegister from "../components/form/FormRegister";
import Header from "../components/header/Header";

function Register() {
    return (
    <div className="container">
        <Header title={`User Registration`} />

        <FormRegister />
    </div>
    )
}

export default Register;