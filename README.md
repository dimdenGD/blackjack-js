# Blackjack.js

Library for Blackjack and Deck generation. Package on NPM: [blackjack-n-deck](https://www.npmjs.com/package/blackjack-n-deck).

[Discord server](https://discord.gg/5jm5P3SJF3)

## Blackjack

***`new Blackjack(bet, amount)`***  
Class for Blackjack game. Requires `bet` (default=100) argument for money and `amount` (default=1) argument for more than 52 cards.  
*Example:*
```js
let bj = new Blackjack(100, 1);
// this function will be called every time something happens
bj.event = event => {
	switch(event) {
		case "init": console.log(`Game started!`); break;
		case "hit": console.log(`You hit.`); break;
		case "win": console.log(`You won ${bj.bet}$!`); break;
		case "bust": console.log(`You lost.`); break;
		case "push": console.log(`Push.`); break;
		case "blackjack": console.log(`BLACKJACK!!! +${bj.bet}$!`); break;
	}
	if(event === "win" || event === "push") console.log(`Your cards: ${bj.player.cards.map(i => i.image).join(", ")} (${bj.player.score})\nDealer cards: ${bj.dealer.cards.map(i => i.image).join(", ")} (${bj.dealer.score})`);
	else console.log(`Your cards: ${bj.player.cards.map(i => i.image).join(", ")} (${bj.player.score})\nDealer cards: ${bj.dealer.cards[0].image}, ? (${bj.dealer.score})`);
};
bj.init();
// playing
bj.hit();
bj.stand();
```

#### Blackjack.deck

Game deck (Deck object).

#### Blackjack.bet

Bet of game. Might change on blackjack or double down. Use it to get win currency amount.

#### Blackjack.amount

Amount of decks (from argument).

#### Blackjack.status

0 - playing, 1 - win, 2 - bust, 3 - push.

#### Blackjack.player

Game player, has `.score` and `.cards` properties.

#### Blackjack.dealer

Game dealer, has `.score` and `.cards` properties.

### Blackjack.init()

Init game. Should be called after setting up `event` function.

### Blackjack.hit(noEvent)

Hit. `noEvent` to not get "hit" event.

### Blackjack.stand()

Stand.

### Blackjack.doubleDown()

Double down. Will affect `.bet`.

## Deck

***`new Deck(amount)`***  
Class for generating deck of cards. Has `amount` (default=1) argument for generating more than 52 cards.  
*Example:*
```js
let deck = new Deck();
console.log(deck.cards);
```

#### Deck.cards

Shuffled card array.  
Every card is an object like this:
```js
{
	full: "Spades Jack"
	image: "♠️J"
	name: "Jack"
	short: "J"
	suit: "♠️"
	suitname: "Spades"
	value: 10
}
```

#### Deck.defaultCards

Array used for generating full deck.

#### Deck.suits

Array with suit symbols.

#### Deck.amount

Amount of decks (from argument).

### Deck.getRandomCard()

Get first card from array.

### Deck.getPair()

Get array with 2 cards and their value.  
`[card1, card2, totalvalue]`  
If both cards are aces then totalvalue becomes 2 instead of 22.

# License

MIT, created by [dimden](https://dimden.dev/).
