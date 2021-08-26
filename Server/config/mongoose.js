const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chatting',{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;

db.on("error", (err) => {
    console.log("error in connecting to the MongoDB");
});

db.once('open', () => {
    console.log("Connected to the MongoDb Successfully!");
})
