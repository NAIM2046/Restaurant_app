const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require('jsonwebtoken');
const stripe = require('stripe')('sk_test_51QNsOTF9vXHEmaiAtGxIu8nxwx6c9E6cExveBV07dGOU994AJUfGPDQrPllMNjx4ywvEI8sfYskIkq76GSPmkb4I00MZhppYQv') ;
require('dotenv').config();
const port = process.env.PORT || 5000;

//console.log("DB_PASS:", process.env.DB_PASS);
//console.log("DB_USER:", process.env.DB_USER);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("boss is running");
});

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nwqos.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();


    const menuCollection = client.db("boss").collection("menu");
    const cardsCollection = client.db("boss").collection("cards") ;
    const userCollection = client.db("boss").collection("users") ;
    const paymentCollection = client.db("boss").collection("payments") ;

   
    //jwt api 

 app.post("/jwt" , async(req , res)=>{
     const user = req.body ; 
     const token = jwt.sign(user , process.env.ACCESS_TOKEN , {
      expiresIn: '1h'
     }) 
     res.send({token}) ;
 })
  //middleware 
  const verifyToken = (req , res , next)=>{
    //console.log("inside verify token" , req.headers.authorization) ;
    if(!req.headers.authorization){
      return res.status(401).send({message : "unauthorized access "}) ;
    }
    const token =  req.headers.authorization.split(" ")[1] ;
   // console.log(token) ;
   jwt.verify(token , process.env.ACCESS_TOKEN , (err , decode)=>{
    if(err){
      return res.status(401).send({message : "unauthorized access "}) ;
    }
    req.decoded =  decode ;
    next() ;
   })

    
  }

  const verifyAdmin = async (req , res , next) =>{
    const email = req.decoded.email ;
    const query = {email : email} ;
    const user = await userCollection.findOne(query) ; 
    const isAdmin =  user?.role === 'admin' ; 
    if(!isAdmin){
      return res.status(403).send({message : "unauthorized accesss"}) ;
    }
    next() ;
  }




   //menu api
   app.get("/menu" , async (req , res)=>{
    const result =  await menuCollection.find().toArray() ;
    res.send(result) ;
  })

  app.get("/menu/:id" , async(req , res)=>{
    const id = req.params.id ; 
    //console.log(id) ;
    if (!ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ObjectId format" });
    }
    const query = {_id : new ObjectId(id)} 
    const result = await menuCollection.findOne(query) ;
    res.send(result) ;
  })

  app.post("/menu" , verifyToken , verifyAdmin , async(req , res)=>{
    const item = req.body ; 
    const result =  await menuCollection.insertOne(item) ;
    res.send(result) ;
  })
   
  app.patch("/menu/:id" , async(req , res)=>{
    const item = req.body;
    const id =  req.params.id ; 
    const filter =  {_id: new ObjectId(id)} ;
    const updatedDoc = {
      $set:{
        name: item.name ,
        category: item.category,
        price: item.price ,
        recipe: item.recipe , 
        image: item.image
      }
    }
    const result =  await menuCollection.updateOne(filter , updatedDoc) ;
    res.send(result) ;
   })
  app.delete("/menu/:id" , async(req , res)=>{
    const id =  req.params.id  ;
   // console.log(id) ; 
    const query =  { _id: new ObjectId(id)} 
    const result = await menuCollection.deleteOne(query) ;
    res.send(result) ;
  })

    //cardsCollection 

    app.get("/cards" ,  async(req , res)=>{
      const email = req.query.email ;
      const query =  {email: email}  ;
      const result = await cardsCollection.find(query).toArray() ;
      res.send(result) ;
    })

    app.post("/card" , async(req , res)=>{
      const cardItam =  req.body ;
      const result =  await cardsCollection.insertOne(cardItam) ;
      res.send(result) ;
    })

    app.delete("/cards/:id" , async(req , res)=>{
        const id =  req.params.id ;
        const query = {_id : new ObjectId(id)} 
        const result = await cardsCollection.deleteOne(query) ;
        res.send(result) ;
     })

     // user Api 
     app.get("/users" ,verifyToken , verifyAdmin, async(req ,res)=>{
     // console.log(req.headers) ;
      const result = await userCollection.find().toArray() ;
      res.send(result);
     })


     app.get("/users/admin/:email" ,verifyToken , async(req , res)=>{
         const email = req.params.email ;
         if(email !== req.decoded.email){
              return res.status(403).send({message : "unauthorized accesss"}) ;
         }
         const query = {email: email} ;
         const user = await userCollection.findOne(query) ;
         let admin = false ;
         if(user){
          admin = user?.role === "admin" ;
         }
         res.send({admin}) ;
     })
     app.post("/users" , async(req , res)=>{
      const user = req.body ; 
      const query = {email : user.email} ;
      const existingUser = await userCollection.findOne(query) ;
      if(existingUser){
        return res.send({message : "User already exists" ,  }) ; 
      }
      const result = await userCollection.insertOne(user) ;
      res.send(result) ; 
     })
         app.patch('/users/admin/:id' , async(req , res)=>{
          const id = req.params.id ;
          const filter = {_id: new ObjectId(id)} ;
          const updatedDoc ={
            $set: {
              role: "admin"
            }
          }

          const result = await userCollection.updateOne(filter , updatedDoc) ;
          res.send(result) ;
          })


     
     app.delete("/users/:id" , async(req , res)=>{
      const id = req.params.id ;
      const query = {_id : new ObjectId(id)};
      const result =  await userCollection.deleteOne(query) ;
      res.send(result) ; 
     })
      // payment api 

      app.post("/create-payment-intent" , async(req , res)=>{
               const {price} = req.body ; 
               const amount = parseInt(price*100) ; 
               const paymentIntent = await stripe.paymentIntents.create({
                amount: amount, 
                currency: "usd" , 
                payment_method_types: ['card']
               })
               res.send({
                clientSecret: paymentIntent.client_secret
               })

      })
      app.post('/payments', async (req, res) => {
        const payment = req.body;
        const paymentResult = await paymentCollection.insertOne(payment);
  
        //  carefully delete each item from the cart
        console.log('payment info', payment);
        const query = {
          _id: {
            $in: payment.cartIds.map((id) => new ObjectId(id)) // Correctly map to ObjectId
          }
        };
  
        const deleteResult = await cardsCollection.deleteMany(query);
  
        res.send({ paymentResult, deleteResult });
      })
  
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Uncomment this if you want to close the client connection after the test
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
    console.log(`boss is running on port ${port}`);
});
