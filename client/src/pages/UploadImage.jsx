import FormUpload from "../components/form/FormUpload";
import Header from "../components/header/Header";

function UploadImage() {
    return (
        <div className="container">
            <Header title={`Upload Image`} />
            <FormUpload />
        </div>
    )
}

export default UploadImage