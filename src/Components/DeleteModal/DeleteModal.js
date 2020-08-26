import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

const DeleteModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { handleClose, open, deleteCollection } = props;

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>Are you sure?</h2>
      <p id='simple-modal-description'>
        Deleting a collection will delete all of its data
      </p>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          width: "90%",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant='outlined'
          className={classes.button}
          onClick={() => deleteCollection()}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  );
};

export default DeleteModal;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    color: "#ffffff",
    borderRadius: 8,
    backgroundColor: "#23272a",
    border: "2px solid #7289da",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    color: "#ffffff",
    outlineColor: "#ffffff",
    borderColor: "#ffffff",
    "&:hover": {
      backgroundColor: "#ffffff4d",
    },
  },
}));
