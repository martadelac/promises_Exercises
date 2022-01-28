//PART 1. NUMBER FACTS

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about
// your favorite number. (Make sure you get back JSON by including the json query key,
// specific to this API. Details.

// let numFact;
// $.getJSON("http://numbersapi.com/28?json", (response) => {
//   numFact = response;
//   console.log("La historia de tu número es :", numFact);
// });

//------Versión mejorada as in SOLUTION:

// let fav_num = 331;
// let base_url = "http://numbersapi.com";

// $.getJSON(`{base_url}/${fav_num}/?json`).then(data=> {
//     console.log(data)
// })
//-----------------------------------------------------------------------------------------------

// //2. Figure out how to get data on multiple numbers in a single request.
// //   Make that request and when you get the data back, put all of the number
// //    facts on the page.

// let numsFacts;
// $.getJSON("http://numbersapi.com/1..10?json", (response) => {
//   numsFacts = response;
//   console.log("Los facts de tus números son:", numsFacts);

// });

// //--------Versión mejorada as in SOLUTION:
// let fav_nums = [1,2,3,4,5]

// $.getJSON(`${base_url}/${fav_nums}?json`).then(data =>
//     console.log(data))

//-----------------------------------------------------------------------------------------------

// 3. Use the API to get 4 facts on your favorite number. Once you have them all,
// put them on the page. It’s okay if some of the facts are repeats.
//(Note: You’ll need to make multiple requests for this.)

// Promise.all(
//   Array.from({ length: 4 }, () => {
//     return $.getJSON(`${base_url}/${fav_num}?json`);
//   })
// ).then((facts) => {
//   facts.forEach((data) => $("body").append(`<p>${data.text}</p>`));
// });

//*****************************************************************************************

//PART 2: DECK OF CARDS

// let base_url = "http://deckofcardsapi.com/api/deck";

//1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
//Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// $.getJSON(`${base_url}/new/draw`).then((data) => {
//   let { suit, value } = data.cards[0];
//   console.log(`${value} of ${suit}`);
// });

//2. Make a request to the deck of cards API to request a single card from a newly shuffled deck.
//Once you have the card, make a request to the same API to get one more card from the same deck.

//Once you have both cards, console.log the values and suits of both cards.

// let firstCard = null;
// $.getJSON(`${base_url}/new/draw`)
//   .then((data) => {
//     firstCard = data.cards[0];
//     let deckId = data.deck_id;
//     return $.getJSON(`${base_url}/${deckId}/draw/`);
//   })
//   .then((data) => {
//     let secondCard = data.cards[0];
//     [firstCard, secondCard].forEach(function (card) {
//       console.log
//       (`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
//       ); });
//     });

//3. Build an HTML page that lets you draw cards from a deck.
//When the page loads, go to the Deck of Cards API to create
//a new deck, and show a button on the page that will let you
//draw a card. Every time you click the button, display a new
//card, until there are no cards left in the deck.

let base_url = "http://deckofcardsapi.com/api/deck";

let deckId = null;
let $btn = $("button");
let $cardArea = $("#card-area");

$.getJSON(`${base_url}/new/shuffle/`).then((data) => {
  deckId = data.deck_id;
  $btn.show();
});

$btn.on("click", function () {
  $.getJSON(`${base_url}/${deckId}/draw/`).then((data) => {
    let cardSrc = data.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
      $("<img>", {
        src: cardSrc,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
        },
      })
    );
    if (data.remaining === 0) $btn.remove();
  });
});
