import React, { useState, useEffect, useRef } from "react";
import "./Nav.css";
import { createClient } from "@supabase/supabase-js";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import axios from "axios";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import data from "../Data/MOCK_DATA(1).json";
import { connect } from "react-redux";
import CollectionPreview from "../CollectionPreview/CollectionPreview";

const Nav = (props) => {
  const SUPABASE_URL = "https://kfvonrpponseevqsueft.supabase.co";
  const { REACT_APP_SUPABASE_KEY } = process.env;
  const supabase = createClient(SUPABASE_URL, REACT_APP_SUPABASE_KEY);
  const classes = useStyles();
  const classesLight = useStylesLight();
  let menuSlide = useRef(null);
  const [collections, setCollections] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [chosen, setChosen] = useState("");
  const { toggleDark, toggleMenu } = props;

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    axios
      .get("/api/collections")
      .then((res) => {
        setCollections(res.data);
      })
      .catch((err) => console.log(err));
  };

  let randomName;
  if (name === "") {
    randomName = data[Math.floor(Math.random() * data.length)];
    setName(randomName.word);
  }


  const createCollection = async () => {
    axios.post(`/api/collections`, { name }).then((res) => {
      getCollections();
      setIsAdding(false);
      setName("");
    });
  };

  const collectionsMap = collections.map((e) => {
    return (
      <CollectionPreview
        key={e.id}
        onClick={() => setChosen(e)}
        collection={e}
        active={e === chosen}
        getCollections={getCollections}
      />
    );
  });

  return (
    <div>
      {toggleMenu === true ? (
        <div
          // ref={(el) => (menuSlide = el)}
          className={
            toggleDark === true
              ? "nav-container-light-toggle"
              : "nav-container-toggle"
          }
        >
          <div className='nav-input-container'>
            {isAdding === false ? (
              <Button
                onClick={() => setIsAdding(true)}
                disabled={true}
                className={
                  toggleDark === true
                    ? classesLight.topButton
                    : classes.topButton
                }
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                ></span>
              </Button>
            ) : (
              <div
                className='toggled-nav-input-container'
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => setIsAdding(false)}
                  className={
                    toggleDark === true
                      ? classesLight.topButton
                      : classes.topButton
                  }
                  variant='outlined'
                >
                  {" "}
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 8,
                    }}
                  >
                    <RemoveIcon />
                  </span>
                </Button>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  className={
                    toggleDark === true ? classesLight.input : classes.input
                  }
                  id='standard-basic'
                  label='Collection Name'
                  placeholder='Name'
                  disableUnderline={true}
                />
                <div className='add-collection-form-p'>
                  <p onClick={() => createCollection()}>Add</p>
                </div>
              </div>
            )}
          </div>
          {/* <div className='nav-seperator'>
            <div></div>
          </div> */}
          <div className='nav-collections-container'>{collectionsMap}</div>
        </div>
      ) : (
        <div
          ref={(el) => (menuSlide = el)}
          className={
            toggleDark === true ? "nav-container-light" : "nav-container"
          }
        >
          <div className='nav-input-container'>
            {isAdding === false ? (
              <Button
                onClick={() => setIsAdding(true)}
                className={
                  toggleDark === true
                    ? classesLight.topButton
                    : classes.topButton
                }
                variant='outlined'
              >
                Collection{" "}
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: 8,
                  }}
                >
                  <AddIcon />
                </span>
              </Button>
            ) : (
              <div
                className='toggled-nav-input-container'
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => setIsAdding(false)}
                  className={
                    toggleDark === true
                      ? classesLight.topButton
                      : classes.topButton
                  }
                  variant='outlined'
                >
                  Collection{" "}
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 8,
                    }}
                  >
                    <RemoveIcon />
                  </span>
                </Button>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  className={
                    toggleDark === true ? classesLight.input : classes.input
                  }
                  id='standard-basic'
                  label='Collection Name'
                  placeholder='Name'
                  disableUnderline={true}
                />
                <div className='add-collection-form-p'>
                  <p onClick={() => createCollection()}>Add</p>
                </div>
              </div>
            )}
          </div>
          {/* <div className='nav-seperator'>
            {collections.length === 1 ? (
              <p>{collections.length} collection</p>
            ) : (
              <p>{collections.length} collections</p>
            )}
            <div></div>
          </div> */}
          <div className='nav-collections-container'>{collectionsMap}</div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, null)(Nav);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 60,
    color: "#ffffff",
    border: "none",
    borderRadius: 0,
    margin: "0",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    "&:hover": {
      backgroundColor: "#7289da73",
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
    },
  },
  topButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 60,
    color: "#ffffff",
    border: "none",
    borderRadius: 0,
    margin: "0",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  input: {
    width: "70%",
    margin: "auto",
    color: "#ffffff",
    marginTop: 10,
    borderBottom: "1px solid #ffffff",
  },
  nav: {
    color: "#7289da",
    height: 10,
    width: 10,
  },
  navActive: {
    color: "#86FFCE",
  },
}));

const useStylesLight = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 60,
    color: "#2c2f33",
    border: "none",
    borderRadius: 0,
    margin: "0",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    "&:hover": {
      backgroundColor: "#7289da73",
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
    },
  },
  topButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 60,
    color: "#2c2f33",
    border: "none",
    borderRadius: 0,
    margin: "0",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  input: {
    width: "70%",
    margin: "auto",
    color: "#2c2f33",
    marginTop: 10,
    borderBottom: "1px solid #2c2f33",
  },
  nav: {
    color: "#7289da",
    height: 10,
    width: 10,
  },
  navActive: {
    color: "#86FFCE",
  },
}));
