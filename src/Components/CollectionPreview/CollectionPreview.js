import React, { useState, useEffect } from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { withRouter } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";
import EditModal from "../EditModal/EditModal";
import { connect } from "react-redux";
import axios from "axios";
import "./CollectionPreview.css";

const CollectionPreview = (props) => {
  const classes = useStyles();
  const classesLight = useStylesLight();
  const { toggleDark, toggleMenu } = props;
  const { id, collection_name } = props.collection;
  const { active, onClick, getCollections } = props;
  const [open, setOpen] = useState(false);
  const [edit, toggleEdit] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditOpen = () => {
    toggleEdit(true);
  };

  const handleEditClose = () => {
    toggleEdit(false);
  };

  const deleteCollection = () => {
    axios
      .delete(`/api/collections/${id}`)
      .then((res) => {
        getCollections();
      })
      .catch((err) => console.log(err));
  };

  const editCollection = (editName) => {
    axios
      .put(`/api/collections`, { id, editName })
      .then((res) => {
        getCollections();
        handleEditClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{width: '100%'}}>
      {toggleMenu === true ? (
        <div onClick={onClick} className='collection-preview-container'>
          <Link className='collection-name-link' to={`/collections/${id}`}>
            <Button
              variant='outlined'
              className={
                toggleDark === true
                  ? active
                    ? classesLight.buttonActive
                    : classesLight.button
                  : active
                  ? classes.buttonActive
                  : classes.button
              }
            >
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FiberManualRecordIcon
                  style={{ marginRight: 5 }}
                  className={active ? classes.navActive : classes.nav}
                />
              </span>
            </Button>
          </Link>
        </div>
      ) : (
        <div onClick={onClick} className='collection-preview-container'>
          <Link className='collection-name-link' to={`/collections/${id}`}>
            <Button
              variant='outlined'
              className={
                toggleDark === true
                  ? active
                    ? classesLight.buttonActive
                    : classesLight.button
                  : active
                  ? classes.buttonActive
                  : classes.button
              }
            >
              <div className='secondary-links'>
                <span
                  className={
                    active ? "delete-container-active" : "delete-container"
                  }
                >
                  <DeleteOutlineIcon
                    onClick={() => handleOpen()}
                    className={
                      toggleDark === true
                        ? active
                          ? classesLight.deleteActive
                          : classesLight.delete
                        : active
                        ? classes.deleteActive
                        : classes.delete
                    }
                  />{" "}
                </span>
                <span
                  className={
                    active ? "delete-container-active" : "delete-container"
                  }
                >
                  <EditIcon
                    onClick={() => handleEditOpen()}
                    className={
                      toggleDark === true
                        ? active
                          ? classesLight.deleteActive
                          : classesLight.delete
                        : active
                        ? classes.deleteActive
                        : classes.delete
                    }
                  />{" "}
                </span>
              </div>
              <div className='main-links'>
                <span
                  style={{
                    width: 85,
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  {collection_name}
                </span>
              </div>
              <span
                style={{
                  width: 55,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <FiberManualRecordIcon
                  className={active ? classes.navActive : classes.nav}
                />
              </span>
            </Button>
          </Link>
          <DeleteModal
            deleteCollection={deleteCollection}
            open={open}
            handleClose={handleClose}
          ></DeleteModal>
          <EditModal
            open={edit}
            collectionName={collection_name}
            handleEditClose={handleEditClose}
            editCollection={editCollection}
          ></EditModal>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (reduxState) => reduxState;

export default withRouter(connect(mapStateToProps, null)(CollectionPreview));

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
    color: "#ffffff54",
    border: "none",
    borderRadius: 0,
    margin: "0",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    transition: "all ease 300ms",
    "&:hover": {
      backgroundColor: "#7289da73",
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
      color: "#ffffff",
    },
  },
  buttonActive: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 60,
    color: "#ffffff",
    border: "none",
    borderRadius: 0,
    backgroundColor: "#ffffff2f",
    margin: "0",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    transition: "all ease 300ms",
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
    transition: "all ease 300ms",
    width: 10,
  },
  navActive: {
    color: "#86FFCE",
    transition: "all ease 300ms",
    height: 10,
    width: 10,
  },
  delete: {
    display: "none",
  },
  deleteActive: {
    height: 18,
    width: 18,
    transition: "all ease 300ms",
    color: "#ffffff54",
    "&:hover": {
      color: "#86FFCE",
      transform: "scale(1.2)",
    },
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
    color: "#2c2f3393",
    border: "none",
    borderRadius: 0,
    margin: "0",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    transition: "all ease 300ms",
    "&:hover": {
      backgroundColor: "#7289da73",
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
      color: "#2c2f33",
    },
  },
  buttonActive: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: 60,
    color: "#2c2f33",
    border: "none",
    borderRadius: 0,
    backgroundColor: "#7289da73",
    margin: "0",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    transition: "all ease 300ms",
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
    transition: "all ease 300ms",
    width: 10,
  },
  navActive: {
    color: "#75dbb2",
    transition: "all ease 300ms",
    height: 10,
    width: 10,
  },
  delete: {
    display: "none",
  },
  deleteActive: {
    height: 18,
    width: 18,
    transition: "all ease 300ms",
    color: "#2c2f3393",
    "&:hover": {
      color: "#86FFCE",
      transform: "scale(1.2)",
    },
  },
}));
