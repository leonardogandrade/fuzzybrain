import React from "react";
import { Route, Switch } from "react-router-dom";

import Bbox from "./components/class-box";
import Main from './components/Main';
import SearchColors from './components/SearchColors'

const Routes = () => {
    return (
        <Switch>
            <Route component={Main} path="/" exact />
            <Route component={Main} path="/action/upload" />
            <Route component={SearchColors} path="/action/search_colors" />
            <Route component={Bbox} path="/image/:filename" />
        </Switch>
    )
}

export default Routes;