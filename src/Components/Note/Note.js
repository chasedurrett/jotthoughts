import React, { useEffect, useState, useRef } from "react";
import "./Note.css";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { connect } from "react-redux";

const Note = (props) => {
  const SUPABASE_URL = "https://kfvonrpponseevqsueft.supabase.co";
  const { REACT_APP_SUPABASE_KEY } = process.env;
  const supabase = createClient(SUPABASE_URL, REACT_APP_SUPABASE_KEY);
  const { id, note_title, note_content } = props.note;
  const { deleteNote } = props;
  const classes = useStyles();
  const classesLight = useStylesLight();
  const [title, setTitle] = useState(note_title);
  const [content, setContent] = useState(note_content);
  const { toggleDark } = props;
  const within = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const editNote = () => {
    axios
      .put(`/api/collections/notes`, {
        id,
        title,
        content,
      })
      .then((res) => {
        document.removeEventListener("mousedown", handleClick);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (e) => {
    if (within.current.contains(e.target)) {
      return;
    }
    editNote();
  };


  
  return (
    <div
      className={
        toggleDark === true ? "note-container-light" : "note-container"
      }
      ref={within}
    >
      <div className='note-title-container'>
        <Input
          className={
            toggleDark === true ? classesLight.topInput : classes.topInput
          }
          defaultValue={note_title}
          disableUnderline={true}
          onChange={(e) => setTitle(e.target.value)}
          multiline
          placeholder={
            note_title === "" && note_content === "" ? "Empty Note" : null
          }
        />
      </div>
      <div className='note-content-container'>
        <Input
          disableUnderline={true}
          onChange={(e) => setContent(e.target.value)}
          multiline
          className={
            toggleDark === true ? classesLight.bottomInput : classes.bottomInput
          }
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

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps, null)(Note);

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
const useStylesLight = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  topInput: {
    color: "#2c2f33",
    fontSize: 20,
    wordBreak: "break-all",
  },
  bottomInput: {
    color: "#2c2f33",
  },
  delete: {
    color: "#7289da",
    position: "absolute",
    top: -10,
    right: -10,
  },
}));
