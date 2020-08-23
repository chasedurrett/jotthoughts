import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./TopNav.css";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import DnsIcon from "@material-ui/icons/Dns";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MenuIcon from "@material-ui/icons/Menu";
import LanguageIcon from "@material-ui/icons/Language";
import InputAdornment from "@material-ui/core/InputAdornment";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import SearchIcon from "@material-ui/icons/Search";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import Switch from "@material-ui/core/Switch";
import NoteOutlinedIcon from "@material-ui/icons/NoteOutlined";
import { toggledView, toggledDarkTheme } from "../../redux/reducer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { connect } from "react-redux";

const TopNav = (props) => {
  const { toggleView, toggleDark } = props;
  const { toggledDarkTheme } = props;
  const [searchInput, setSearchInput] = useState("");
  const classes = useStyles();
  const classesLight = useStylesLight();

  const history = useHistory();
  const location = useLocation();

  const handleSearch = (e) => {
    if (e.key === "Enter" && location.pathname != "/search") {
      history.push({
        pathname: "/search/",
        search: `input=${searchInput}`,
      });
    } else if (e.key === "Enter" && location.pathname === "/search") {
      const searchParam = searchInput;
    }
  };

  return (
    <div
      className={
        toggleDark === true ? "top-nav-container-light" : "top-nav-container"
      }
    >
      <MenuIcon
        className={toggleDark === true ? classesLight.menu : classes.menu}
      />
      <div className='logo-container'>
        <NoteOutlinedIcon className={classes.note} />
        <h1>jotthoughts</h1>
      </div>
      <div className='search-bar-container'>
        <Input
          placeholder='Search'
          disableUnderline={true}
          className={toggleDark === true ? classesLight.input : classes.input}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleSearch}
          startAdornment={
            <InputAdornment>
              <SearchIcon className={classes.search} />
            </InputAdornment>
          }
        />
      </div>
      <div className='icons-container'>
        {toggleDark === true ? (
          <Brightness2Icon
            className={classesLight.listIcon}
            onClick={() => toggledDarkTheme(false)}
          />
        ) : (
          <BrightnessHighIcon
            onClick={() => toggledDarkTheme(true)}
            className={classes.listIcon}
          />
        )}
        {toggleView === false || toggleView === undefined ? (
          <div className='icon-link-background'>
            <DnsIcon
              onClick={() => props.toggledView(true)}
              className={
                toggleDark === true ? classesLight.listIcon : classes.listIcon
              }
            />
          </div>
        ) : (
          <div className='icon-link-background'>
            <ViewCompactIcon
              onClick={() => props.toggledView(false)}
              className={
                toggleDark === true ? classesLight.listIcon : classes.listIcon
              }
            />
          </div>
        )}
        <div className='social-links-container'>
          <a
            className='icon-link-background'
            rel='noopener noreferrer'
            target='_blank'
            href='https://github.com/chasedurrett'
          >
            <GitHubIcon
              className={
                toggleDark === true ? classesLight.listIcon : classes.listIcon
              }
            />
          </a>
          <a
            className='icon-link-background'
            rel='noopener noreferrer'
            target='_blank'
            href='https://www.linkedin.com/in/chasedurrett/'
          >
            <LinkedInIcon
              style={{ height: 28, width: 28 }}
              className={
                toggleDark === true ? classesLight.listIcon : classes.listIcon
              }
            />
          </a>
          <a
            className='icon-link-background'
            target='_blank'
            rel='noopener noreferrer'
            href='http://www.chasedurrett.com'
          >
            <LanguageIcon
              className={
                toggleDark === true ? classesLight.listIcon : classes.listIcon
              }
            />
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { toggledView, toggledDarkTheme })(
  TopNav
);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    margin: "auto",
    padding: "0 10px",
    color: "#ffffff",
    height: 40,
    fontSize: 19,
    width: "90%",
    backgroundColor: "#2c2f33",
    borderRadius: 8,
  },
  menu: {
    transition: "all ease 300ms",
    color: "#ffffff",
    "&:hover": {
      color: "#7289da",
      cursor: "pointer",
    },
  },
  listIcon: {
    color: "#ffffffab",
    margin: "auto",
    transition: "all ease 300ms",
    "&:hover": {
      cursor: "pointer",
      color: "#7289da",
    },
  },
  switch: {
    color: "#ffffff",
  },
  search: {
    paddingRight: 10,
  },
  note: {
    color: "#7289da",
  },
}));

const useStylesLight = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    margin: "auto",
    padding: "0 10px",
    color: "#2c2f33",
    height: 40,
    fontSize: 19,
    width: "90%",
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
  },
  listIcon: {
    color: "#2c2f33",
    margin: "auto",
    transition: "all ease 300ms",
    "&:hover": {
      cursor: "pointer",
      color: "#7289da",
    },
  },
  menu: {
    transition: "all ease 300ms",
    "&:hover": {
      color: "#7289da",
      cursor: "pointer",
    },
  },
  switch: {
    color: "#ffffff",
  },
  search: {
    paddingRight: 10,
  },
  note: {
    color: "#7289da",
  },
}));
