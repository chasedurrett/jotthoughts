import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CheckIcon from "@material-ui/icons/Check";
import Input from "@material-ui/core/Input";

const EditModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { handleEditClose, open, editCollection, collectionName } = props;
  const [name, setName] = useState("");

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
      <div
        style={{
          margin: "auto",
          display: "flex",
          width: "70%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input
          onChange={(e) => setName(e.target.value)}
          id='simple-modal-title1'
          defaultValue={collectionName}
          disableUnderline={true}
          className={classes.input}
          label='Collection name'
        />
        <CheckIcon
          variant='outlined'
          className={classes.button}
          onClick={() => editCollection(name)}
        />
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleEditClose}
        aria-labelledby='simple-modal-title1'
      >
        {body}
      </Modal>
    </div>
  );
};

export default EditModal;

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
    margin: "12px 0 0 10px",
    "&:hover": {
      color: "#86ffce",
      cursor: "pointer",
    },
  },
  input: {
    color: "#ffffff",
    borderBottom: "1px solid #ffffff",
  },
}));
