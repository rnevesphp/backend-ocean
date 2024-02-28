require('dotenv').config();

const express = require("express");
const { MongoClient , ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

// credenciais do Mongo Db 
const dbURL = process.env.DB_URL; 
const dbName = "OceanDatabase2024";


const main = async () => {
    const client = new MongoClient(dbURL);
    const db = client.db(dbName)
    const collection = db.collection('items')
    await client.connect();

    console.log("DB CONECTADO"); 

    app.get('/', (req , res) => {
        res.send('Hello World')
    })

    // get all items from db
    app.get('/item' , async (req, res) => {
        const items = await collection.find().toArray()
        res.send(items)
    })  

    // get by id from db 
    app.get("/item/:id", async (req, res) => {
        const id = req.params.id;
        const item = await collection.findOne({
            _id : new ObjectId(id)
        }); 
        res.send(item);
    });

    // insert into the db 
    app.post("/item", async (req, res) => {
        const item = req.body;
        await collection.insertOne(item); 
        res.send(
            item
        );
    });

    // update by id from db 
    app.put('/item/:id' , async (req , res ) => {
        const id = req.params.id; 
        const novoItem = req.body;
        
        await collection.updateOne(

            { _id : new ObjectId(id)}, 
            { $set : novoItem }
        )
        res.send(`item ${id} atualizado com sucesso`);
    })


    app.delete('/item/:id' , async (req , res) => {
        const id = req.params.id ;
        await collection.deleteOne(
            {
                _id:new ObjectId(id)
            })
        res.send('item removido com  sucesso'); 
    })
};

app.listen(3000);

main(); 