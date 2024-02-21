const express = require('express');
const app = express(); 

app.get('/' , (req , res) => {
    res.send('Hello World!');
})

app.get('/oi' , (req , res) => {
    res.send('Nova mensagem!');
})

app.listen(3000); 