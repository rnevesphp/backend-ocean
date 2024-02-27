const express = require("express");
const { MongoClient } = require("mongodb");

const dbURL = "mongodb+srv://admin:AUwvkLdL85UEqEVV@cluster0.s5s27mc.mongodb.net";
const dbName = "OceanDatabase2024";

const main = async () => {
    const client = new MongoClient(dbURL);
    console.log("Conectando banco de dados");
    await client.connect();

    const app = express();

    app.get("/", function (req, res) {
        res.send("Hello, World!");
    });

    app.get("/oi", function (req, res) {
        res.send("Olá, mundo!");
    });

    const lista = ["Rick Sanchez", "Morty Smith", "Summer Smith"];

    app.get("/item", function (req, res) {
        res.send(lista);
    });

    app.get("/item/:id", function (req, res) {
    
        const id = req.params.id;
        const item = lista[id];
        res.send(item);
    });

    app.use(express.json());

    app.post("/item", function (req, res) {
        const body = req.body;
        const item = body.nome;
        lista.push(item);
        res.send("Item adicionado com sucesso!");
    });

    app.listen(3000);
};

main(); 