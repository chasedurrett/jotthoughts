import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import "./TopNav.css";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import DnsIcon from "@material-ui/icons/Dns";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";
import Switch from "@material-ui/core/Switch";
import { toggledView, toggledTheme } from "../../redux/reducer";
import { connect } from "react-redux";

const TopNav = (props) => {
  const classes = useStyles();
  const { toggleView } = props;
  const { toggleTheme } = props;
  const [searchInput, setSearchInput] = useState("");

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
    <div className='top-nav-container'>
      <div></div>
      <div className='search-bar-container'>
        <Input
          placeholder='Search'
          disableUnderline={true}
          className={classes.input}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleSearch}
        />
      </div>
      <div className='icons-container'>
        <Switch color='primary' className={classes.switch} />
        {toggleView === false || toggleView === undefined ? (
          <div className='icon-link-background'>
            <DnsIcon
              onClick={() => props.toggledView(true)}
              className={classes.listIcon}
            />
          </div>
        ) : (
          <div className='icon-link-background'>
            <ViewCompactIcon
              onClick={() => props.toggledView(false)}
              className={classes.listIcon}
            />
          </div>
        )}
        <a
          className='icon-link-background'
          rel='noopener noreferrer'
          target='_blank'
          href='https://github.com/chasedurrett'
        >
          <GitHubIcon className={classes.listIcon} />
        </a>
        <a
          className='icon-link-background'
          rel='noopener noreferrer'
          target='_blank'
          href='https://www.linkedin.com/in/chasedurrett/'
        >
          <LinkedInIcon
            style={{ height: 28, width: 28 }}
            className={classes.listIcon}
          />
        </a>
        <a
          className='icon-link-background'
          target='_blank'
          rel='noopener noreferrer'
          href='http://www.chasedurrett.com'
        >
          <LanguageIcon className={classes.listIcon} />
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, { toggledView, toggledTheme })(TopNav);

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
    fontSize: 17,
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.274)",
    borderRadius: 8,
  },
  listIcon: {
    color: "#ffffffab",
    margin: "auto",
    transition: "all ease 300ms",
    "&:hover": {
      cursor: "pointer",
      color: "#ffffff",
    },
  },
  switch: {
    color: "#ffffff",
  },
}));
