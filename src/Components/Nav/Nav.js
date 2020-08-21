import React, { useState, useEffect } from "react";
import "./Nav.css";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
// require("dotenv").config();

const Nav = () => {
  const SUPABASE_URL = "https://kfvonrpponseevqsueft.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTU5Nzk0NTgzOSwiZXhwIjoxOTEzNTIxODM5fQ.zOLyrCMW80rcc9zwiPdCDbJa0bdbPztAzusEM9vsSiI";
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const classes = useStyles();

  const [collections, setCollections] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    try {
      let res = await supabase.from("collections").select("*");
      setCollections(res.body);
    } catch (err) {
      console.log(err);
    }
  };

  const createCollection = async () => {
    try {
      await supabase.from("collections").insert([{ collection_name: name }]);
      let res = await supabase.from("collections").select("*");
      await setIsAdding(false);
      setCollections(res.body);
    } catch (err) {
      console.log(err);
    }
  };

  const collectionsMap = collections.map((e) => {
    return (
      <Link
        key={e.id}
        className='collection-name-link'
        to={`/collections/${e.id}`}
      >
        <Button variant='outlined' className={classes.button}>
          <span
            style={{
              width: 85,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {" "}
            <FiberManualRecordIcon className={classes.nav} />
          </span>{" "}
          <span
            style={{
              width: 85,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {e.collection_name}
          </span>
        </Button>
      </Link>
    );
  });

  return (
    <div className='nav-container'>
      <div className='nav-input-container'>
        {isAdding === false ? (
          <Button
            onClick={() => setIsAdding(true)}
            className={classes.topButton}
            variant='outlined'
          >
            Collection{" "}
            <span
              style={{ display: "flex", alignItems: "center", paddingLeft: 8 }}
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
              className={classes.topButton}
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
              className={classes.input}
              id='standard-basic'
              label='Collection Name'
              placeholder='Name'
            />
            <div className='add-collection-form-p'>
              <p onClick={() => createCollection()}>Add</p>
            </div>
          </div>
        )}
      </div>
      <div className='nav-seperator'>
        {collections.length === 1 ? (
          <p>{collections.length} collection</p>
        ) : (
          <p>{collections.length} collections</p>
        )}
        <div></div>
      </div>
      <div className='nav-collections-container'>{collectionsMap}</div>
    </div>
  );
};

export default Nav;

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
      backgroundColor: "rgba(255, 255, 255, 0.044)",
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
    },
    "&:focus": {
      borderColor: "#07c537",
      border: "solid 1px",
      borderLeft: "none",
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
  },
  nav: {
    color: "#7289da",
    height: 10,
    width: 10,
  },
}));
