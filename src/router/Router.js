import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "../Layouts";
import RegistrationForm from "../components/RegistrationForm";
import LoginForm from "../components/LoginForm";
import Home from "../components/Home";
import ListInventory from "../components/inventories/list";
import AddInventory from "../components/inventories/create";
import EditInventory from "../components/inventories/edit";
import AddItem from "../components/items/create";
import Error from "../components/error";
import ListItem from "../components/items/list";
import EditItem from "../components/items/edit";

const RouterConfig = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('token'));

    const handleLogin = () => {
        setIsAuthenticated(true);
    }

    return(
        <Router>
        <Routes>
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/sign-up" element={<RegistrationForm />} />
            <Route path="*" element={<Error />} />
            <Route element={<Layouts isAuthenticated={isAuthenticated} />}>
                <Route path="/" element={<Home />} />
                {isAuthenticated && (
                    <>
                    <Route path="/inventories" element={<ListInventory />} />
                    <Route path="/inventory/create" element={<AddInventory />} />
                    <Route path="/inventory/edit/:id" element={<EditInventory />} />
                    <Route path="/inventory/items/:inventory_id" element={<ListItem />} />
                    <Route path="/inventory/add-item/:inventory_id" element={<AddItem />} />
                    <Route path="/inventory/:inventory_id/edit-item/:item_id" element={<EditItem />} />
                    </>
                )}
            
            </Route>
        </Routes>
        </Router>
    );
};

export default RouterConfig;
