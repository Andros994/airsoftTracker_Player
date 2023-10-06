const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
var mongoUrl = "mongodb+srv://sandriandrea:Arcipippolo01@cluster0.wnnzlci.mongodb.net/?retryWrites=true&w=majority"

app.listen(3000, () => console.log("Server attivo sulla porta 3000"))

async function connect() {
    try {
        await mongoose.connect(mongoUrl)
        console.log("Connected to DB")
    } catch (error){
        console.error(error);
    }
}

connect();

app.use(cors('*'));    // Allow requests from any IP

app.use(express.urlencoded({ extended: false }))

app.post('/upload', function(req, res) {
    var json = JSON.parse(Object.keys(req.body)[0]);
    console.log('request: ', json);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', function(){
        //define schema
        var locationSchema = mongoose.Schema({
            nick: String,
            asd: String,
            fazione: String,
            ruolo: String,
            coords: Object
                // latitude: Number,
                // longitude: Number,
                // accuracy: Number
            // }
        })

        // compile schema to model
        var location = mongoose.model('location', locationSchema, 'geoData');

        var locationInsert = new location({
            nick: json.nick,
            asd: json.asd,
            fazione: json.fazione,
            ruolo: json.ruolo,
            coords: json.coords 
        })

        locationInsert.save(function (err, location) {
            if (err) return console.error(err);
            console.log(location.nick + "saved to geoData collection.")
        })
    })
})



