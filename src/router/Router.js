import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import Home from "../components/Home";

const router = createBrowserRouter([
    {
        path : '/',
        element: <Layouts />,
        children : [
            {
                path : '/',
                element : <Home />
            },   
            {
                path: '/sign-up',
                element: <RegistrationForm />,
            },
            {
                path: '/login',
                element: <LoginForm />,
            },
            {
                path: '*',
                element: <h1>Nothing is found </h1>,
            }
        ]
    }
]);

export default router;