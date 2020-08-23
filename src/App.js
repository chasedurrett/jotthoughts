import React from "react";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import TopNav from "./Components/TopNav/TopNav";
import routes from "./routes.js";
import { connect } from "react-redux";

function App(props) {
  const { toggleDark } = props;
  return (
    <div className={toggleDark === true ? "App-light" : "App"}>
      <TopNav />
      <Nav />
      {routes}
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, null)(App);
