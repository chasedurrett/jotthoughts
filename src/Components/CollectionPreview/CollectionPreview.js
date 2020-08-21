import React, { useState, useEffect } from "react";
import Input from "@material-ui/core/Input";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./CollectionPreview.css";

const CollectionPreview = (props) => {
  const classes = useStyles();
  const { id, collection_name } = props.collection;
  const { active, onClick } = props;
  return (
    <div onClick={onClick} className='collection-preview-container'>
      <Link className='collection-name-link' to={`/collections/${id}`}>
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
            <FiberManualRecordIcon
              className={active ? classes.navActive : classes.nav}
            />
          </span>{" "}
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
        </Button>
      </Link>
    </div>
  );
};

export default CollectionPreview;

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
    width: 10,
  },
  navActive: {
    color: "#86FFCE",
    height: 10,
    width: 10,
  },
}));
