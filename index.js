
const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 3500;

const app = express();
app.use(cors());
app.use(bodyParser.json());
const uri = 'mongodb://testUser:testUser@cluster0-shard-00-00-bgklk.mongodb.net:27017,cluster0-shard-00-01-bgklk.mongodb.net:27017,cluster0-shard-00-02-bgklk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
let client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology:true});
const user=[]
app.get('/', (req, res) => {
  res.send({message:"ok"})
})
app.get("/regi-form", (req,res) => {
    //res.send(user)
    client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology:true});
    client.connect(err =>{
        const collection = client.db("stdInformation").collection("student");

        collection.find().toArray((err,document) => {
            if(err){
                console.log(err);
            } else {
              res.send(document);
            }
      
          });
    }) 
});

//database connection:

app.post("/regi-form", (req,res) => {
    const studentInfo=req.body;
    // perform actions on the collection object
    client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology:true});
    client.connect(err =>{
        const collection = client.db("stdInformation").collection("student");

        collection.insertOne(studentInfo, (err,result) => {
            if(err){
                console.log(err);
            } else {
              res.send(result.ops[0]);
            }
      
          }); 
          //client.close();     
    });
});
         
     //console.log("deliver to server",req.body);
     //user.push(req.body)
   


app.listen(PORT, () => console.log("listening from port 3000"));


