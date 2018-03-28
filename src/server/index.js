const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const classes = require('../behavior/Poker')
const modules = require('./modules')

const Player = classes.Player
const Deck = classes.Deck

let deck = new Deck()

const total_requests = (() => { 
    let count = 0; 
    return () => ++count; 
})();

let clientCards = []

app.use(express.static(__dirname +'./../../build'));


io.on('connection', function(client){
    
    client.on('DEAL_CARDS',  () => {
        const num = total_requests()
        const player = modules.generatePlayer(`player${num}`, deck, num)

        client.emit('NEW_CARDS',player)  
    })

    client.on('EXCHANGE_CARDS', (state) => {
        const hand = modules.exchangeCards(state,deck)
        clientCards.push(hand)
        /*let promise = new Promise((resolve,reject) => {
            resolve(hand)
        })
        console.log(promise)*/
        client.emit('CARDS_EXCHANGED',hand)
        if(clientCards.length == 2) {
            setTimeout(() => {
                io.emit('EXCHANGE_CARDS_OPPONENT',clientCards)
            },3000)
        }
        console.log(clientCards.length) 
    })

});

/*
app.get('/user1/:username1/user2/:username2', (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    let player1 = new_player(req.params.username1)
    let player2 = new_player(req.params.username2)
    let json_data = JSON.stringify([player1,player2])
    res.json(json_data)

})*/

http.listen(3005, () => console.log('Example app listening on port 3005!'))