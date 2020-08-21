import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import { createClient } from "@supabase/supabase-js";
import Note from "../Note/Note.js";
import { connect } from "react-redux";

import "./Search.css";

const Search = (props) => {
  const SUPABASE_URL = "https://kfvonrpponseevqsueft.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTU5Nzk0NTgzOSwiZXhwIjoxOTEzNTIxODM5fQ.zOLyrCMW80rcc9zwiPdCDbJa0bdbPztAzusEM9vsSiI";
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const location = useLocation();
  let searchParam = location.search;
  const classes = useStyles();
  const [loading, setLoading] = useState("");
  const [collectionNotes, setCollectionNotes] = useState([]);

  useEffect(() => {
    getCollectionNotes();
  }, [searchParam]);

  let searchParamAlt = searchParam.replace("?input=", "");

  const getCollectionNotes = async () => {
    setLoading(true);
    try {
      let { body: notes } = await supabase
        .from("notes")
        .like("note_title", `%${searchParamAlt}%`)
        .select("*");
      setCollectionNotes(notes);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await supabase.from("notes").eq("id", `${noteId}`).delete();
      let { body: notes } = await supabase
        .from("notes")
        .filter("collection_id", "eq", `${props.match.params.collectionid}`)
        .select("*");
      setCollectionNotes(notes);
    } catch (err) {
      console.log(err);
    }
  };

  const notesMap = collectionNotes.map((e) => {
    return <Note deleteNote={deleteNote} key={e.id} note={e} />;
  });

  return (
    <div className='search-container'>
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
