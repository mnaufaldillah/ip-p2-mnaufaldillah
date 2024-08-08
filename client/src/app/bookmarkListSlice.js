import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "../config/axiosInstance";

export const bookmarkListSlice = createSlice({
    name: `bookmarkList`,
    initialState: {
        value: [],
        loading: false,
        error: ''
    },
    reducers: {
        setBookmarks(state, action) {
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

export const { setBookmarks, setLoading, setError } = bookmarkListSlice.actions;

export const addBookmarks = function (articleId) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            
            const { data } = await axios({
                url: `/bookmarks`,
                method: `GET`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            // console.log(data);
            

            dispatch(setBookmarks(data.results))
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

export const fetchBookmarks = function () {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            
            const { data } = await axios({
                url: `/bookmarks`,
                method: `GET`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            // console.log(data);
            

            dispatch(setBookmarks(data.results))
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

export default bookmarkListSlice.reducer;