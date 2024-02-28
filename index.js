const express = require("express");
const { MongoClient , ObjectId } = require("mongodb");

const dbURL = "mongodb+srv://admin:AUwvkLdL85UEqEVV@cluster0.s5s27mc.mongodb.net";
const dbName = "OceanDatabase2024";

const main = async () => {
    const client = new MongoClient(dbURL);
    console.log("Conectando banco de dados");
    await client.connect();

    const app = express();

    /* const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"]; */

    const db = client.db(dbName)
    const collection = db.collection('items')

    app.get('/item' , async (req, res) => {
        const items = await collection.find().toArray()

        res.send(items)
    })  

    /*    
        app.get("/item",  (req, res) => {
        res.send(lista);
    }); */

    app.get("/item/:id", async (req, res) => {
    
        const id = req.params.id;
        const item = await collection.findOne({
            _id : new ObjectId(id)
        }); 
        res.send(item);
    });

    app.use(express.json());

    app.post("/item", (req, res) => {
        const body = req.body;
        const item = body.nome;
        lista.push(item);
        res.send("Item adicionado com sucesso!");
    });

    app.listen(3000);
};

main(); 