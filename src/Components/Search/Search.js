import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Note from "../Note/Note.js";
import { connect } from "react-redux";

import "./Search.css";

const Search = (props) => {
  const location = useLocation();
  let searchParam = location.search;
  const classes = useStyles();
  const [loading, setLoading] = useState("");
  const [collectionNotes, setCollectionNotes] = useState([]);
  const { toggleDark } = props;

  useEffect(() => {
    getCollectionNotes();
  }, [searchParam]);

  let searchParamAlt = searchParam.replace("?input=", "");
  const getCollectionNotes = () => {
    setLoading(true);
    axios
      .get(`/api/collections/search/${searchParamAlt}`)
      .then((res) => {
        setCollectionNotes(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteNote = (noteid) => {
    axios
      .delete(`/api/collections/notes/${noteid}`)
      .then((res) => {
        getCollectionNotes();
      })
      .catch((err) => console.log(err));
  };

  const notesMap = collectionNotes.map((e) => {
    return <Note deleteNote={deleteNote} key={e.id} note={e} />;
  });

  return (
    <div
      className={
        toggleDark === true ? "search-container-light" : "search-container"
      }
    >
      {loading === true ? (
        <div className='loading-container-2'>
          <CircularProgress />
        </div>
      ) : notesMap.length === 0 ? (
        <div className='empty-collection-container-2'>
          {/* <HourglassEmptyIcon className={classes.draftIcon} /> */}
          <h3>No results</h3>
        </div>
      ) : (
        <div
          className={
            props.toggleView === true
              ? "notes-container-list"
              : "notes-container"
          }
        >
          {notesMap}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, null)(Search);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  topInput: {
    margin: "auto",
    color: "#ffffff",
    height: 40,
    fontSize: 20,
  },
  bottomInput: {
    margin: "auto",
    color: "#ffffff",
  },
  buttons: {
    color: "#ffffff",
  },
  draftIcon: {
    color: "#2c2f33",
    height: 100,
    width: 200,
  },
}));
