const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;

//midalware
app.use(cors());
app.use(express.json());  

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bhafc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// 
async function run() {
  try {
    await client.connect();
    const database = client.db("allevents");
    const allEventsCollection = database.collection("events");
    const allOrdersCollection = database.collection("orders");
   
   
      // GET API ORDERS
      app.get('/all-events', async (req,res)=>{
        const cursor = allEventsCollection.find({})
        const events = await cursor.toArray();
        res.send(events);
  
       });

       app.get('/all-orders', async(req,res)=>{
         const cursor = allOrdersCollection.find({})
         const orders = await cursor.toArray();
         res.send(orders)
       })
      
       // GET SINGLE PRODUCT
   app.get('/booking/:id', async (req,res)=>{
    const id = req.params.id;
    const query = {_id: ObjectId(id)};
    const booking = await allEventsCollection.findOne(query)
  res.json(booking);
  });

 
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);
// 
app.get('/', (req, res) => {
  res.send('Hello World! MyTicket')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})