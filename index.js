const express = require('express');
const app = express(); 

app.get('/' , (req , res) => {
    res.send('Hello World!');
})

const lista = [ "Romeu", "Carlos", "Juju", "Débora" ]

app.get('/item' , (req , res) => {
    res.send(lista);
})

app.get( '/item/:id' , (req, res) => {
    const id = req.params.id ; 

    const itemDaLista = lista[id]

    const numDeElementosNaLista =  lista.length;

    id > numDeElementosNaLista || id < 0 ?  
        res.status(400).send("ID inválido") : 
        res.send(`${itemDaLista}`) 
})


app.post( '/adicionar' , (req , res) => {
    const body = req.body
    
    console.log(body)
    
    res.send(body)
   
   
    /*  !nomeDoItem ? 
        "é preciso inserir um nome" : 
        ((lista.push(nomeDoItem)) , (res.send(`Nome ${nomeDoItem} adicionado`))) */

})

app.listen(3000);