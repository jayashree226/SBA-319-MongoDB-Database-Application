import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET route========================================

router.get("/", (req, res) => {
    res.send("Hello from users router").status(200);
  });

  //Create a new user==============================
 //POST /users/

router.post('/' , async(req, res) =>{
    const collection = await db.collection("users");
    const newDocument = req.body;

    const result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});


//Get all users
//GET /users/
 
router.get("/alt", async (req, res) => {
    const collection = await db.collection("users");
   const users = await collection.find({}).toArray();
   res.status(200).json(users);//(convert to json)
  });


  // Routes==============
  // For single user
// app.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


 //Get a single user by the id
 // GET /users/:id
 
router.get("/:id", async (req, res) => {
    const collection = await db.collection("users");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);
  
    if (!result) res.send('Not Found').status(404);
    else res.send(result).status(200);
  });


  //Update an user by the id
 //PUT /users/:id 

  router.put("/:id", async(req, res) =>{
    const collection = await db.collection("users");
    const query = {_id:new ObjectId(req.params.id)};

    const result = await collection.updateOne(query ,{$set: {username: req.body.username}})

    if(!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });


  //PATCH/users/:id
  
  router.patch("/:id", async(req, res) =>{
    const collection = await db.collection("users");
    const query = {_id: Number(req.params.id) };

    const result = await collection.updateOne(query)

    if(!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

  //Delete an user by the id
  //DELETE /users/:id
  
 router.delete("/:id", async (req, res) => {
     let collection = await db.collection("users");
     let query = { _id: new ObjectId(req.params.id) };
     let result = await collection.deleteOne(query);
   
     if (!result) res.send("Not found").status(404);
     else res.send(result).status(200);
   });



  router.post('/reviews', async (req, res) => {
    
    const newReview = {
        user_id: req.body.userId, 
        text: req.body.text
    }

    const review = await collection.insertOne(newReview);
});

export default router;