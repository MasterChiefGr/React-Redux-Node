const classes = require('../behavior/Poker')

const exchangeCards = (state,deck) => {
    let cards = state[0].cards.slice();
  
    cards = cards.map((card)=>{
      if(card.pick == true){
        const newCard = deck.deck.splice(Math.floor(Math.random()*deck.deck.length),1);
        card.rank = newCard[0].rank;
        card.suit = newCard[0].suit;
        card.weight = newCard[0].weight;
        card.pick = false;
      }
      return card;
    });
  
    let player =  new classes.Player(state[0].name,cards)
  
    return { name:player.name,
             cards:player.cards,
             combination:player.combination,
             score:player.score }
}

const generatePlayer = (name,deck,num) => {
    let id = 10*num

    let player = new classes.Player(name,deck.deal())
    let cards = player.cards

    cards = cards.map((card) =>{
      return {rank:card.rank, 
              suit:card.suit, 
              weight:card.weight, 
              id:id++, 
              pick:false}
    })

    return {name:player.name,
            cards,
            combination:player.combination,
            score:player.score}      
}

module.exports = {
    exchangeCards,
    generatePlayer
  }
  