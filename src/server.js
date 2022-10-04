const express = require('express')

const app = express()

app.listen(process.env.PORT || 3000, (erro) => {
    if (erro) {
        return console.log(erro)
    }
    console.log("tudo funcionando")
}) 