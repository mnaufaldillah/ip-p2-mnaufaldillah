import { createSlice } from `@reduxjs/toolkit`;
import Swal from "sweetalert2";
import axios from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";

export const registerSlice = createSlice({
    name: `register-user`,
    initialState: {
        newUser: {},
        loading: false,
        error: ''
    },
    reducrers: {
        setNewUser(state, action) {
            state.newUser = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    }
});

export const { setNewUser, setLoading, setError } = registerSlice.actions;

export const handlerAddUser = function (payload) {
    const navigate = useNavigate();
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));

            console.log(payload);
            
            await axios({
                url: `add-user`,
                method: `POST`,
                data: payload
            });

            navigate(`/login`);
        } catch (error) {
            console.log(error);

            Swal.fire({
                title: 'Error.',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Lanjut'
            });
        } finally {
            dispatch(setLoading(false));
        }
    }
}