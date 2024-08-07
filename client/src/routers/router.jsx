import { createBrowserRouter, redirect } from 'react-router-dom';
import App from '../App';
import MainLayout from '../pages/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';


const router = createBrowserRouter([
    {
        path: `/login`,
        element: <Login />
    },
    {
        path: `/register`,
        element: <Register />
    },
    {
        path: `/`,
        element: <MainLayout />
    }
]);

export default router;