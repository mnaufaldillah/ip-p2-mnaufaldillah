import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '../App';
import MainLayout from '../pages/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ArticleList from '../pages/ArticleList';
import ArticleDetail from '../pages/ArticleDetail';
import UploadImage from '../pages/UploadImage';
import BookmarkList from '../pages/BookmarkList';

const router = createBrowserRouter([
    {
        path: `/login`,
        element: <Login />,
        loader: () => {
            if(localStorage.access_token) {
                return redirect(`/`);
            }

            return null;
        }
    },
    {
        path: `/register`,
        element: <Register />
    },
    {
        path: `/`,
        element: <MainLayout />,
        loader: () => {
            if(!localStorage.access_token) {
                return redirect(`/login`);
            }

            return null;
        },
        children: [
            {
                path: ``,
                element: <ArticleList />
            },
            {
                path: `article/:ArticleId`,
                element: <ArticleDetail />

            },
            {
                path: 'user-upload',
                element: <UploadImage />
            },
            {
                path: `bookmark`,
                element: <BookmarkList />
            }
        ]
    }
]);

export default router;