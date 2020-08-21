import React from "react";
import "./TopNav.css";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";

const TopNav = () => {
  const classes = useStyles();
  return (
    <div className='top-nav-container'>
      <div></div>
      <div className='search-bar-container'>
        <Input
          placeholder='Search'
          disableUnderline={true}
          className={classes.input}
        />
      </div>
      <div></div>
    </div>
  );
};

export default TopNav;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    margin: "auto",
    padding: '0 10px',
    color: "#ffffff",
    height: 40,
    fontSize: 17,
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.274)",
    borderRadius: 8,
  },
}));
