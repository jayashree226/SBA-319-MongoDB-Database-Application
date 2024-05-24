import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET route========================================

router.get("/", (req, res) => {
    res.send("Hello from posts router").status(200);
  });

  //Create a new post ==============================
 //POST /posts/

router.post('/' , async(req, res) =>{
    const collection = await db.collection("posts");
    const newDocument = req.body;

    const result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


//Get all posts
//GET /posts/
 
router.get("/alt", async (req, res) => {
    const collection = await db.collection("posts");
   const posts = await collection.find({}).toArray();
   res.status(200).json(posts);  //(convert to json)
  });


  //Get a single post by the id
 // GET /posts/:id
 
router.get("/:id", async (req, res) => {
    const collection = await db.collection("posts");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);
  
    if (!result) res.send('Not Found').status(404);
    else res.send(result).status(200);
  });

  //PATCH/posts/:id
  
  router.patch("/:id", async(req, res) =>{
    const collection = await db.collection("posts");
    const query = {_id: Number(req.params.id) };

    const result = await collection.updateOne(query)

    if(!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

//Delete an user by the id
  //DELETE /users/:id
  
  router.delete("/:id", async (req, res) => {
    let collection = await db.collection("posts");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.deleteOne(query);
  
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });


  export default router;