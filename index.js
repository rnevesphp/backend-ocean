const express = require('express');
const app = express(); 

app.get('/' , (req , res) => {
    res.send('Hello World!');
})

const lista = [ "Romeu", "Carlos", "Juju", "Débora" ]

app.get('/item' , (req , res) => {
    res.send(lista);
})

app.listen(3000);