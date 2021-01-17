import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import Login from "./auth/Login";
import Products from "./products/Products";
import NotFound from "./utils/not_found/NotFound";

const Pages = () => (
    <Switch>
        <Route path="/" exact component={Products} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/cart" exact component={Cart} />


        <Route path="/*" exact component={NotFound} />
    </Switch>
);

export default Pages;