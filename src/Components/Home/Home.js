import React from "react";
import "./Home.css";
import { connect } from "react-redux";

const Home = (props) => {
  const { toggleDark } = props;

  return (
    <div
      className={
        toggleDark === true ? "home-container-light" : "home-container"
      }
    >
      <h2>Create a collection to get started</h2>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, null)(Home);
