import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "../config/axiosInstance";

export const articleDetailSlice = createSlice({
    name: `articleDetail`,
    initialState: {
        value: {},
        loading: false,
        error: ''
    },
    reducers: {
        setArticle(state, action) {
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

export const { setArticle, setLoading, setError } = articleDetailSlice.actions;

export const fetchArticleDetailyById = function (ArticleId) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));           
            
            const { data } = await axios({
                url: `/articles/${ArticleId}`,
                method: `GET`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            // console.log(data);
            

            dispatch(setArticle(data))
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

export default articleDetailSlice.reducer;