import React from "react";
import { Switch, Route } from "react-router-dom";
import Collection from "./Components/Collection/Collection";
import Search from "./Components/Search/Search";

export default (
  <Switch>
    <Route path='/collections/:collectionid' component={Collection} />
    <Route path='/search' component={Search} />
  </Switch>
);
