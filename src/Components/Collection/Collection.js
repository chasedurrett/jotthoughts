import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import "./Collection.css";
import Input from "@material-ui/core/Input";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Note from "./Note/Note";
import SpeakerNotesIcon from "@material-ui/icons/SpeakerNotes";

const Collection = (props) => {
  const SUPABASE_URL = "https://kfvonrpponseevqsueft.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTU5Nzk0NTgzOSwiZXhwIjoxOTEzNTIxODM5fQ.zOLyrCMW80rcc9zwiPdCDbJa0bdbPztAzusEM9vsSiI";
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const [collectionNotes, setCollectionNotes] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const classes = useStyles();
  //   const within = useRef()

  useEffect(() => {
    getCollectionNotes();
  }, [props.match.params.collectionid]);

  const getCollectionNotes = async () => {
    try {
      let { body: notes } = await supabase
        .from("notes")
        .filter("collection_id", "eq", `${props.match.params.collectionid}`)
        .order("id")
        .select("*");
      setCollectionNotes(notes);
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

  //   const handleClick = (e) => {
  //     if (within.current.contains(e.target)) {
  //       return;
  //     }

  //     createCollectionNote();
  //   };

  return (
    <div className='collection-container'>
      <div className='collection-top-bar'>
        {isCreating === true ? (
          <div className='create-note-container'>
            <div className='note-title-container'>
              <Input
                className={classes.topInput}
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
                className={classes.bottomInput}
                placeholder='Content'
                fullWidth={true}
              />
            </div>
            <div className='add-button-container'>
              <RemoveCircleIcon
                onClick={() => reset()}
                className={classes.buttons}
              />
              <AddCircleIcon
                onClick={() => createCollectionNote()}
                className={classes.buttons}
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
                className={classes.topInput}
                placeholder='Title'
                disableUnderline={true}
                fullWidth={true}
              />
            </div>
          </div>
        )}
      </div>
      {notesMap.length === 0 ? (
        <div className='empty-collection-container'>
          <SpeakerNotesIcon className={classes.draftIcon} />
          <h3>No notes in this collection</h3>
        </div>
      ) : (
        <div className='notes-container'>{notesMap}</div>
      )}
    </div>
  );
};

export default withRouter(Collection);

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
