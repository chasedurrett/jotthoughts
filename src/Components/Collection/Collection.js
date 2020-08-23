import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Collection.css";
import Input from "@material-ui/core/Input";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Note from "../Note/Note";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";

const Collection = (props) => {
  const SUPABASE_URL = "https://kfvonrpponseevqsueft.supabase.co";
  const { REACT_APP_SUPABASE_KEY } = process.env;
  const supabase = createClient(SUPABASE_URL, REACT_APP_SUPABASE_KEY);
  const [collectionNotes, setCollectionNotes] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState("");
  const classes = useStyles();
  const classesLight = useStylesLight();
  const { toggleDark } = props;

  useEffect(() => {
    getCollectionNotes();
  }, [props.match.params.collectionid]);

  const getCollectionNotes = async () => {
    setLoading(true);
    try {
      let { body: notes } = await supabase
        .from("notes")
        .filter("collection_id", "eq", `${props.match.params.collectionid}`)
        .order("id")
        .select("*");
      setCollectionNotes(notes);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const reset = () => {
    setIsCreating(false);
    setTitle("");
    setContent("");
  };

  const createCollectionNote = async () => {
    try {
      await supabase.from("notes").insert([
        {
          note_title: title,
          note_content: content,
          collection_id: props.match.params.collectionid,
        },
      ]);
      let { body: notes } = await supabase
        .from("notes")
        .filter("collection_id", "eq", `${props.match.params.collectionid}`)
        .select("*");
      setCollectionNotes(notes);
      setIsCreating(false);
      setTitle("");
      setContent("");
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
    <div
      className={
        toggleDark === true
          ? "collection-container-light"
          : "collection-container"
      }
    >
      <div className='collection-top-bar'>
        {isCreating === true ? (
          <div className='create-note-container'>
            <div className='note-title-container'>
              <Input
                className={
                  toggleDark === true ? classesLight.topInput : classes.topInput
                }
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                disableUnderline={true}
              />
            </div>
            <div className='note-content-container'>
              <Input
                onChange={(e) => setContent(e.target.value)}
                disableUnderline={true}
                multiline
                className={
                  toggleDark === true
                    ? classesLight.bottomInput
                    : classes.bottomInput
                }
                placeholder='Content'
                fullWidth={true}
                maxLength='5000'
              />
            </div>
            <div className='add-button-container'>
              <RemoveCircleIcon
                onClick={() => reset()}
                className={
                  toggleDark === true ? classesLight.buttons : classes.buttons
                }
              />
              <AddCircleIcon
                onClick={() => createCollectionNote()}
                className={
                  toggleDark === true ? classesLight.buttons : classes.buttons
                }
              />
            </div>
          </div>
        ) : (
          <div className='create-note-container'>
            <div
              className='note-title-container'
              onClick={() => setIsCreating(true)}
            >
              <Input
                className={
                  toggleDark === true ? classesLight.topInput : classes.topInput
                }
                placeholder='Title'
                disableUnderline={true}
                fullWidth={true}
              />
            </div>
          </div>
        )}
      </div>
      {loading === true ? (
        <div className='loading-container'>
          <CircularProgress />
        </div>
      ) : notesMap.length === 0 ? (
        <div className='empty-collection-container'>
          <SpeakerNotesIcon
            className={
              toggleDark === true ? classesLight.draftIcon : classes.draftIcon
            }
          />
          <h3>No notes in this collection</h3>
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

export default withRouter(connect(mapStateToProps, null)(Collection));

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

const useStylesLight = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  topInput: {
    margin: "auto",
    color: "#2c2f33",
    height: 40,
    fontSize: 20,
  },
  bottomInput: {
    margin: "auto",
    color: "#2c2f33",
  },
  buttons: {
    color: "#2c2f33",
  },
  draftIcon: {
    color: "#2c2f3393",
    height: 100,
    width: 200,
  },
}));
