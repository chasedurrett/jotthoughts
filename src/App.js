import React from "react";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import TopNav from "./Components/TopNav/TopNav";
import routes from "./routes.js";

function App() {
  return (
    <div className='App'>
      <TopNav />
      <Nav />
      {routes}
    </div>
  );
}

export default App;
