class Deck {
	constructor(amount = 1) {
		this.defaultCards = [
			{ name: "2", short: "2", value: 2 },
			{ name: "3", short: "3", value: 3 },
			{ name: "4", short: "4", value: 4 },
			{ name: "5", short: "5", value: 5 },
			{ name: "6", short: "6", value: 6 },
			{ name: "7", short: "7", value: 7 },
			{ name: "8", short: "8", value: 8 },
			{ name: "9", short: "9", value: 9 },
			{ name: "10", short: "10", value: 10 },
			{ name: "Jack", short: "J", value: 10 },
			{ name: "Queen", short: "Q", value: 10 },
			{ name: "King", short: "K", value: 10 },
			{ name: "Ace", short: "A", value: 11 }
		];
		this.suits = ["♠️", "♣️", "♥️", "♦️"];
		this.cards = [];
        this.amount = amount;
        for(let i = 0; i < amount; i++)
            for(let suit of this.suits) {
                let cards = JSON.parse(JSON.stringify(this.defaultCards));
                for(let card of cards) {
                    card.suit = suit;
                    card.suitname = suit == "♠️" ? "Spades" : suit == "♣️" ? "Clubs" : suit == "♥️" ? "Hearts" : "Diamonds";
                    card.image = card.suit + card.short;
                    card.full = `${card.suitname} ${card.name}`;
                }
                this.cards = this.cards.concat(cards);
            }

		this.cards = this.cards.sort(() => Math.random() - 0.5);
	}
	getRandomCard() {
		return this.cards.shift();
	}
	getPair() {
		let card1 = this.getRandomCard();
		let card2 = this.getRandomCard();

		if(card1.short === "A" && card2.short === "A") {
			card1.value = 1;
			card2.value = 1;
		}
		return [card1, card2, card1.value + card2.value];
	}
};

class Blackjack {
	constructor(bet = 100, amount = 1) {
		this.deck = new Deck(amount);
		this.bet = bet;
		this.amount = amount;
		this.status = 0; // 0 - playing, 1 - win, 2 - bust, 3 - push
		this.player = {
			score: 0,
			cards: []
		}
		this.dealer = {
			score: 0,
			cards: []
		}
	}
	init() {
		let playerCards = this.deck.getPair(this.type);
		let dealerCard = this.deck.getRandomCard();

		this.player.score += playerCards[2];
		this.dealer.score += dealerCard.value;
		
		this.player.cards.push(playerCards[0], playerCards[1]);
		this.dealer.cards.push(dealerCard);
		if(this.player.score === 21) {
			this.status = 1;
			this.bet *= 1.5;
			this.event("blackjack");
		} else this.event("init");
	}
	hit(noEvent) {
		if(this.status !== 0) return;
		if(this.player.score <= 11) this.player.cards.push(this.deck.getRandomCard());
		this.player.score += this.player.cards.reverse()[0].value;
		if(this.player.score === 21) {
			let dcard = this.deck.getRandomCard();
			this.dealer.cards.push(dcard);
			this.dealer.score += dcard.value;

			if(this.dealer.score === 21) {
				this.status = 3;
				this.event("push");
			} else {
				this.status = 1;
				this.event("win");
			}
		} else if(this.player.score > 21) {
			if(this.player.cards.find(card => card.short === "A" && card.value === 11)) {
				let card = this.player.cards.find(card => card.short === "A" && card.value === 11);
				card.value = 1;
				this.player.score -= 10;
				if(!noEvent) this.event("hit");
			} else {
				this.status = 2;
				this.event("bust");
			}
		} else if(!noEvent) this.event("hit");
	}
	stand() {
		if(this.status !== 0) return;

		while(this.dealer.score < 17) {
			this.dealer.cards.push(this.deck.getRandomCard());
			let val = this.dealer.cards.reverse()[0].value;
			this.dealer.score += val
		}
		if(this.player.score === this.dealer.score) {
			this.status = 3;
			this.event("push");
		} else if(this.player.score > 21 || (this.dealer.score === 21 && this.player.score !== 21) || (this.dealer.score > this.player.score && this.dealer.score <= 21)) {
			this.status = 2;
			this.event("bust");
		} else if(this.player.score === 21 || this.player.score > this.dealer.score || this.dealer.score > 21) {
			this.status = 1;
			this.event("win");
		}
	}
	doubleDown() {
		this.bet *= 2;
		this.hit(true);
		this.stand();
	}
	event(name) {} // init, hit, win, bust, push, blackjack
};

module.exports = {
	Blackjack,
	Deck
};
