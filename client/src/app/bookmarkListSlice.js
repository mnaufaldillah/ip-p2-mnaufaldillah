import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "../config/axiosInstance";

export const bookmarkListSlice = createSlice({
    name: `bookmarkList`,
    initialState: {
        value: [],
        userBookmark: [],
        loading: false,
        error: ''
    },
    reducers: {
        setBookmarks(state, action) {
            state.value = action.payload
        },
        setBookmarksForUser(state, action) {
            state.userBookmark = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    }
});

export const { setBookmarks, setBookmarksForUser, setLoading, setError } = bookmarkListSlice.actions;

export const addBookmark = function (ArticleId) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            
            await axios({
                url: `/bookmarks`,
                method: `POST`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                },
                data: {
                    ArticleId
                }
            });

            // console.log(data);
            

            dispatch(fetchBookmarksForUser());
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

export const fetchBookmarksForUser = function () {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            
            const { data } = await axios({
                url: `/bookmarks/user`,
                method: `GET`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            // console.log(data);
            

            dispatch(setBookmarksForUser(data));
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

export const deleteBookmark = function (ArticleId) {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            
            await axios({
                url: `/bookmarks/${ArticleId}`,
                method: `DELETE`,
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });

            // console.log(data);
            

            dispatch(fetchBookmarksForUser());
            // dispatch(fetchBookmarks())
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