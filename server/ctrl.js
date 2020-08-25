require("dotenv").config();
const { REACT_APP_SUPABASE_KEY, SUPABASE_URL } = process.env;
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(SUPABASE_URL, REACT_APP_SUPABASE_KEY);

module.exports = {
  getCollectionNotes: async (req, res) => {
    const { collectionid } = req.params;
    let { body: notes } = await supabase
      .from("notes")
      .filter("collection_id", "eq", `${collectionid}`)
      .order("id", true)
      .select("*");
    res.status(200).send(notes);
  },
  getCollections: async (req, res) => {
    let { body: collections } = await supabase
      .from("collections")
      .order("id", true)
      .select("*");
    res.status(200).send(collections);
  },
  getCollectionsSearch: async (req, res) => {
    const { searchParamAlt } = req.params;
    let { body: notes } = await supabase
      .from("notes")
      .like("note_title", `%${searchParamAlt}%`)
      .select("*");
    res.status(200).send(notes);
  },
  createCollectionNote: async (req, res) => {
    const { collectionid } = req.params;
    const { title, content } = req.body;
    await supabase.from("notes").insert([
      {
        note_title: title,
        note_content: content,
        collection_id: collectionid,
      },
    ]);
    res.sendStatus(200);
  },
  createCollection: async (req, res) => {
    const { name } = req.body;
    await supabase.from("collections").insert([{ collection_name: name }]);
    res.sendStatus(200);
  },
  editCollection: async (req, res) => {
    const { id, editName } = req.body;
    await supabase
      .from("collections")
      .eq("id", `${id}`)
      .update({ collection_name: editName });
    res.sendStatus(200);
  },
  editCollectionNote: async (req, res) => {
    const { id, title, content } = req.body;
    await supabase
      .from("notes")
      .eq("id", `${id}`)
      .update({ note_title: title, note_content: content });
    res.sendStatus(200);
  },
  deleteCollection: async (req, res) => {
    const { collectionid } = req.params;
    try {
      await supabase
        .from("notes")
        .eq("collection_id", `${collectionid}`)
        .delete();
      await supabase.from("collections").eq("id", `${collectionid}`).delete();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  deleteCollectionNote: async (req, res) => {
    const { noteid } = req.params;
    await supabase.from("notes").eq("id", `${noteid}`).delete();
    res.sendStatus(200);
  },
};
