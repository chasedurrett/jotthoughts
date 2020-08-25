require("dotenv").config();
const express = require("express");
const app = express();
const { SERVER_PORT } = process.env;
app.use(express.json());
const ctrl = require("./ctrl.js");

// GET //
app.get("/api/collections/:collectionid/notes", ctrl.getCollectionNotes);
app.get(`/api/collections`, ctrl.getCollections);
app.get(`/api/collections/search/:searchParamAlt`, ctrl.getCollectionsSearch);

// POST //
app.post(`/api/collections/:collectionid/notes`, ctrl.createCollectionNote);
app.post(`/api/collections`, ctrl.createCollection);

// PUT //
app.put(`/api/collections`, ctrl.editCollection);
app.put(`/api/collections/notes`, ctrl.editCollectionNote);

// DELETE //
app.delete(`/api/collections/:collectionid`, ctrl.deleteCollection);
app.delete(`/api/collections/notes/:noteid`, ctrl.deleteCollectionNote);

app.listen(SERVER_PORT, console.log(`server activated port ${SERVER_PORT}`));
