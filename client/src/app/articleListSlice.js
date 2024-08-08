import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "../config/axiosInstance";

export const articleListSlice = createSlice({
    name: `articleList`,
    initialState: {
        value: [],
        loading: false,
        error: ''
    },
    reducers: {
        setArticles(state, action) {
            state.value = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    }
});

export const { setArticles, setLoading, setError } = articleListSlice.actions;

export const fetchArticles = function () {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            
            const { data } = await axios({
                url: `/articles`,
                method: `GET`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            // console.log(data);
            

            dispatch(setArticles(data.results))
        } catch (error) {
            console.log(error);

            dispatch(setError('Failed to Fetch data'))

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

export default articleListSlice.reducer;