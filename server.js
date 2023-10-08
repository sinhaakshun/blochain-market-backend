const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const { config } = require('dotenv');

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(process.env.CONNECTION_URL)
.then(()=>{
    console.log('connection established');
}).catch(err => {
    console.log('failed to connect')
})


app.use('/api', routes)

app.listen(4000, ()=>{
    console.log('listening on port 4000')
})