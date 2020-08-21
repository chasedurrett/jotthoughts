import React, { useEffect, useState, useRef } from "react";
import "./Note.css";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { createClient } from "@supabase/supabase-js";

const Note = (props) => {
  const SUPABASE_URL = "https://kfvonrpponseevqsueft.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTU5Nzk0NTgzOSwiZXhwIjoxOTEzNTIxODM5fQ.zOLyrCMW80rcc9zwiPdCDbJa0bdbPztAzusEM9vsSiI";
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const { id, note_title, note_content } = props.note;
  const { deleteNote } = props;
  const classes = useStyles();
  const [title, setTitle] = useState(note_title);
  const [content, setContent] = useState(note_content);
  const [isEditing, setIsEditing] = useState(false);
  const within = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const editNote = async () => {
    try {
      await supabase
        .from("notes")
        .eq("id", `${id}`)
        .update({ note_title: title, note_content: content });
    } catch (err) {
      console.log(err);
    }
    document.removeEventListener("mousedown", handleClick);
  };

  const handleClick = (e) => {
    if (within.current.contains(e.target)) {
      return;
    }

    editNote();
    
  };

  return (
    <div className='note-container' ref={within}>
      <div className='note-title-container'>
        <Input
          className={classes.topInput}
          defaultValue={note_title}
          disableUnderline={true}
          onChange={(e) => setTitle(e.target.value)}
          multiline
        />
      </div>
      <div className='note-content-container'>
        <Input
          disableUnderline={true}
          onChange={(e) => setContent(e.target.value)}
          multiline
          className={classes.bottomInput}
          defaultValue={note_content}
          fullWidth={true}
        />
      </div>
      <div className='delete-icon'>
        <HighlightOffIcon
          onClick={() => deleteNote(id)}
          className={classes.delete}
        />
      </div>
      {/* <HighlightOffIcon className={classes.delete} /> */}
    </div>
  );
};

export default Note;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  topInput: {
    color: "#ffffff",
    fontSize: 20,
    wordBreak: "break-all",
  },
  bottomInput: {
    color: "#ffffff",
  },
  delete: {
    color: "#7289da",
    position: "absolute",
    top: -10,
    right: -10,
  },
}));
