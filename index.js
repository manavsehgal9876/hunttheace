const cardImages = ['AceSpades.png', 'card-JackClubs.png', 'card-KingHearts.png', 'card-QueenDiamonds.png'];
const defaultImage = 'card-back-Blue.png';
const path = './images/';
const aceCard = 'AceSpades.png';
let points = 0;
const pointsToBeAlloted = 15;
const winningTemplate = `<p class="fw-bold text-success">Yay! You have found the ACE and won 15 points. <a class="btn btn-sm btn-success replay" href="javascript:;" onclick="replay()">Replay</a></p>`;
const losingTemplate = `<p class="fw-bold text-danger">Uh! You have found the wrong card and lost 15 points. <a class="btn btn-sm btn-danger replay" href="javascript:;" onclick="replay()">Replay</a></p>`;

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

function setDefaultImage() {
  document.querySelectorAll('.play-card').forEach(card => {
    card.setAttribute('src', `${path}${defaultImage}`);
  });
}

function revealCard(card) {
  const hiddenCard = card.dataset.card;
  card.setAttribute('src', `${path}${hiddenCard}`);
  return hiddenCard;
}

function blockCard() {
  document.querySelectorAll('.play-card').forEach(card => {
    card.classList.remove('pointer');
  });
}

function pauseGame() {
  document.querySelectorAll('.play-card').forEach(card => {
    card.dataset.status = 'stopped';
  });
}

function revealAce() {
  document.querySelectorAll('.play-card').forEach(card => {
    if (card.dataset.card === aceCard) {
      revealCard(card);
    }
  });
}

function resetCardsPositions(cardsList) {
  document.querySelectorAll('.play-card').forEach(card => {
    const randomSelectedCard = shuffle(cardsList)[0];
    card.dataset.card = randomSelectedCard;
    card.dataset.status = 'playing';
    card.classList.add('pointer');
    cardsList.splice(0, 1);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  let cardList = [...cardImages];
  resetCardsPositions(cardList);
  setDefaultImage();
});

function replay() {
  document.querySelector('.result').innerHTML = '';
  let cardList = [...cardImages];
  resetCardsPositions(cardList);
  setDefaultImage();
}

document.querySelectorAll('.play-card').forEach(card => {
  card.addEventListener('click', currentCard => {
    const status = currentCard.target.dataset.status;
    console.log(status);
    if (status === 'playing') {
      const revealedCard = revealCard(currentCard.target);
      blockCard();
      pauseGame();

      if (revealedCard === aceCard) {
        points += pointsToBeAlloted;
        document.querySelector('.result').innerHTML = winningTemplate;
      } else {
        navigator.vibrate(200);
        points -= pointsToBeAlloted;
        document.querySelector('.result').innerHTML = losingTemplate;
        revealAce();
      }
      if (points < 0) {
        document.querySelector('.points').classList.add('text-danger');
        document.querySelector('.points').classList.remove('text-success');
      } else {
        document.querySelector('.points').classList.add('text-success');
        document.querySelector('.points').classList.remove('text-danger');
      }
      document.querySelector('.points').textContent = points;
    }
  })
});

