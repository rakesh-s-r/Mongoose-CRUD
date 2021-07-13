const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/upload", multer({dest: "./uploads/"}).array("uploads", 12), function(req, res) {
    let file = req.files[0];
    res.send({
        url: new Buffer(fs.readFileSync(file.path)).toString("base64")
    })
});


app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/user', UserRoutes);
app.use('/', (req, res) => {
    res.send('Server init');
})
mongoose.connect('mongodb://localhost/userLocalDb', {
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connection successfully');
})

connection.once('error', () => {
    console.log('Database connection Failed');
})

app.listen(3000, () => {
    console.log('Server is running...');
})