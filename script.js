const cards = document.querySelectorAll(".memory-card");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const revealBtn = document.querySelector(".reveal-btn");

let hasFlippedCard = false,
  lockBoard = false,
  firstCard,
  secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? match() : notMatch();
  }
}

function match() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
}

function notMatch() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
}

function show() {
  resetBoard();
  shuffle();
  cards.forEach(card => {
    card.classList.add("flip");
    setTimeout(() => {
      card.classList.remove("flip");
    }, 2000);
    card.addEventListener("click", flipCard);
  });
}

startBtn.addEventListener("click", show);

resetBtn.addEventListener("click", () => {
  cards.forEach(card => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });
  setTimeout(shuffle(), 1000);
});

revealBtn.addEventListener("click", () => {
  cards.forEach(card => {
    card.classList.add("flip");
  });
});

// cards.forEach(card => card.addEventListener("click", flipCard));
