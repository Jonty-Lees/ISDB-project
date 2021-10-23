const express = require ('express');

const app = express()
const path = 3000;

// app.get('/', function (req, res){
//     res.send("HELLO WORLD!")
// })


app.listen(path, ()=>{
    console.log(`You are listening on server path: ${path}`)
})
