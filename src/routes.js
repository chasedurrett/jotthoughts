import React from "react";
import { Switch, Route } from "react-router-dom";
import Collection from "./Components/Collection/Collection";
import Search from "./Components/Search/Search";
import Home from "./Components/Home/Home";

export default (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/collections/:collectionid' component={Collection} />
    <Route path='/search' component={Search} />
  </Switch>
);
