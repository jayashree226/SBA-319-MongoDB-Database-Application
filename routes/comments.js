import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET route========================================

router.get("/", (req, res) => {
    res.send("Hello from comments router").status(200);
  });

  //Create a new comments ==============================
 //POST /users/

router.post('/' , async(req, res) =>{
    const collection = await db.collection("comments");
    const newDocument = req.body;

    const result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


//Get all comments
//GET /comments/
 
router.get("/alt", async (req, res) => {
    const collection = await db.collection("comments");
   const posts = await collection.find({}).toArray();
   res.status(200).json(posts);  //(convert to json)
  });


  //Get a single comment by the id
 // GET /comments/:id
 
router.get("/:id", async (req, res) => {
    const collection = await db.collection("comments");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);
  
    if (!result) res.send('Not Found').status(404);
    else res.send(result).status(200);
  });

  //PATCH/comments/:id
  
  router.patch("/:id", async(req, res) =>{
    const collection = await db.collection("comments");
    const query = {_id: Number(req.params.id) };

    const result = await collection.updateOne(query)

    if(!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

//Delete an comments by the id
  //DELETE /comments/:id
  
  router.delete("/:id", async (req, res) => {
    let collection = await db.collection("comments");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.deleteOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });


  export default router;
