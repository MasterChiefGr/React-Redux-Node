const _ = require('underscore')

class Deck{

  constructor() {
    this.rank = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    this.suit = ['hearts','diams','clubs','spades'];
    this.deck = [];
    this.createDeck();
  }

  createDeck(){
    let weight = 2;
    this.rank.forEach((rank) => {
      this.suit.forEach((suit)=>this.deck.push({rank,suit,weight}))
      weight++;
    });
  }

  deal() {
    //Hand of the player is created
    let cards = [];
    for(let i=1;i<=5;i++){
      let card = this.deck.splice(Math.floor(Math.random()*this.deck.length),1)[0];
      cards.push({rank:card.rank,
      						suit:card.suit,
                  weight:card.weight});
    }
    return cards;
  }


}

class Player{

  constructor(name,cards) {
    this.name = name;
    this.cards = cards;
    this.ranking = null;
    this.combination = null;
    this.score = null;
    this.sortHand();
    this.calculateRanking();
    this.setScore()
  }

  sortHand(){
    this.cards.sort((a,b) => {
      if (Number(a.weight) == Number(b.weight)) {
        return 0;
      }
      else {
        return (Number(a.weight) < Number(b.weight)) ? -1 : 1;
      }
    });
  }

  setScore(){
    let coefficient = 100000000;
    let sum = this.ranking*coefficient;
    let cards = this.cards.slice().reverse();
    cards.forEach((card)=>{
      coefficient/=100
      sum+=coefficient*card.weight;
    });
    this.score = sum
  }

  calculateRanking(){
    let values = _.groupBy(this.cards,'weight');

    let value_group = _.groupBy(values,'length');

    let symbols = _.groupBy(this.cards,'suit');

    let symbol_group = _.groupBy(symbols,'length');

    //We check for straight
    let straight = () => {
      let previous_weight = this.cards[0].weight;
      let counter = 0;

      this.cards.slice(1).forEach((card) =>{
        if(previous_weight+1 === card.weight){
          counter++;
        }
        previous_weight = card.weight;
      });

      if(previous_weight === 14 && this.cards[3].weight !== 13 && this.cards[0].weight === 2){
        counter++;
      }

      return (counter === 4 ? true : false);
    }

    let _set = (string , ranking)=>{
      this.combination = string;
      this.ranking = ranking;
    }

    if(straight() && symbol_group[5])
      _set("Straigt Flush" , 9);

    else if(value_group[4])
      _set("Four of a Kind" , 8);

    else if(value_group[2] && value_group[3])
      _set("Full House" , 7);

    else if(symbol_group[5])
      _set("Flush" , 6);

    else if(straight())
      _set("Straight" , 5);

    else if(value_group[3])
      _set("Three of a Kind" , 4);

    else if(value_group[2] && value_group[2].length == '2')
      _set("Two Pair" , 3);

    else if(value_group[2] && value_group[2].length == '1')
      _set("Pair" , 2);

    else
      _set("High Card" , 1);
  }

}

function default_player(name = null){
  let id = 0
  var deck = new Deck();
 
  let player = new Player(name,deck.deal())

  let cards = player.cards.map((card)=>{
    return {rank:card.rank, 
            suit:card.suit, 
            weight:card.weight, 
            id:id++, 
            pick:false}
  })

  return {name:name,
          cards,
          combination:player.combination,
          score:player.score}       
}

module.exports = {
  Player,
  Deck,
  default_player
}
