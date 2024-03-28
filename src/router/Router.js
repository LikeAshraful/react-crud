import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layouts from "../Layouts";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import Home from "../components/Home";
import ListInventory from "../components/inventories/list";
import AddInventory from "../components/inventories/create";
import EditInventory from "../components/inventories/edit";
import AddItem from "../components/items/create";
import Error from "../components/error";

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
                path: '/inventories',
                element: <ListInventory />,
            },
            {
                path: '/inventory/create',
                element: <AddInventory />,
            },
            {
                path: '/inventory/edit/:id',
                element: <EditInventory />,
            },
            {
                path: 'inventory/add-item/:inventory_id',
                element: <AddItem/>
            },
            {
                path: '*',
                element: <Error/>,
            }
        ]
    }
]);

export default router;