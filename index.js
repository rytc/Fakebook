const express = require('express');
const {join} = require('path')

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(require('./routes'));

app.listen(3000, () => {
    const db = require('./db');
})
