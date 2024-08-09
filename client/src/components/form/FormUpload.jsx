import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../config/axiosInstance";

function FormUpload() {
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handlerUpload(event) {
        try {
            event.preventDefault();
            setLoading(true);

            const dataUpload = new FormData();
            dataUpload.append(`image`, image);

            const { data } = await axios({
                url: `/user-upload`,
                method: `PATCH`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                },
                data: dataUpload
            });

            localStorage.setItem(`imageUrl`, data.uploadedImage)
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
            <div className="mb-3 p-3 rounded formula1-regular w-50 bg-light-subtle">
                <form onSubmit={handlerUpload}>
                    <div className="mb-3">
                        <label htmlFor="image">Upload Image</label>
                        <input
                        type="file"
                        name="image"
                        id="image"
                        className="form-control form-control-lg" 
                        accept="image/*" 
                        onChange={(event) => setImage(event.target.files[0])}
                        />
                    </div>
                    <div className="mb-3 text-center">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormUpload;