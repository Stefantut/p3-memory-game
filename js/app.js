 //List with all the cards
      const arrayClassNames = [
       "url('./img/image1.png')",
       "url('./img/image1.png')",
       "url('./img/image2.png')",
       "url('./img/image2.png')",
       "url('./img/image3.png')",
       "url('./img/image3.png')",
       "url('./img/image4.png')",
       "url('./img/image4.png')",
       "url('./img/image5.png')",
       "url('./img/image5.png')",
       "url('./img/image6.png')",
       "url('./img/image6.png')",
       "url('./img/image7.png')",
       "url('./img/image7.png')",
       "url('./img/image8.png')",
       "url('./img/image8.png')",
]
//Create variable deck
      const deck = document.querySelector(".deck");
//Create variable for a new deck
      const newDeck = document.querySelector('.deck');
//Create variable to restart
      const resetEverything = document.getElementsByClassName('fa fa-repeat')[0];

      let timerRunning = false;
      let matchedCount = 0;
      let moveCount = 0;
      let starCount = 3;
      let cardOne = null;
      let cardTwo = null;

//Calling HTML for timer/stopwatch
      let h3 = document.getElementsByTagName('h3')[0],
        seconds = 0,
        minutes = 0,
        hours = 0,
        t;

//Starts timer/stopwatch
      function timer() {
        t = setTimeout(add, 1000);
      }

//Adds more time
      function add() {
      seconds++;
      if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
              minutes = 0;
              hours++;
        }
      }
      h3.textContent = "Stopwatch: " + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
      timer();
      }

// Shuffle function from http://stackoverflow.com/a/2450976
      function shuffle(array) {
          var currentIndex = array.length, temporaryValue, randomIndex;

          while (currentIndex !== 0) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
          }
          return array;
      }

//Calls the shuffle function
      function makeCards() {
          let shuffledArray = shuffle(arrayClassNames);
          deck.innerHTML = "";
          for (let x = 0; x < shuffledArray.length; x++) {
              const newCard = document.createElement('li');
              const newIcon = document.createElement('i');
              newCard.cover = shuffledArray[x];
              newCard.classList.add('card');
              newIcon.classList.add('fa');
              newIcon.classList = shuffledArray[x];
              const newDeck = document.querySelector('.deck');
              newDeck.appendChild(newCard);
              newCard.appendChild(newIcon);
              newCard.addEventListener('click', checkCard);
          }
      }

//Starts timer
      function checkCard() {
          if (timerRunning === false) {
              timer();
              timerRunning = true;
      }

//The clicked card is either cardOne
      if (!cardOne) {
          cardOne = this;
          cardOne.removeEventListener('click', checkCard);
          cardOne.style.backgroundImage = cardOne.cover;
          cardOne.classList.add('open');
          cardOne.classList.add('show');
          return false;

//or is cardTwo
      } else if (!cardTwo) {
          cardTwo = this;
          cardTwo.removeEventListener('click', checkCard);
          cardTwo.style.backgroundImage = cardTwo.cover;
          cardTwo.classList.add('open');
          cardTwo.classList.add('show');
          moveCount += 1;
          console.log('Total moves ' + moveCount);
          document.getElementsByTagName('span')[0].innerHTML = moveCount;

//Denumerates number of stars by how many moves you made
        if (moveCount > 9 && moveCount < 20) {
            document.getElementsByClassName('fa fa-star')[2].style.visibility = 'hidden';
            starCount = 2;
        } else if (moveCount > 19) {
            document.getElementsByClassName('fa fa-star')[1].style.visibility = 'hidden';
            starCount = 1;
        }

//If it is a match
        if (cardOne.firstChild.className === cardTwo.firstChild.className) {
            cardTwo.classList.add('match');
            cardTwo.classList.remove('open');
            cardTwo.classList.remove('show');
            cardOne.classList.add('match');
            cardOne.classList.remove('open');
            cardOne.classList.remove('show');
            cardOne = null;
            cardTwo = null;
            matchedCount += 1;

//Conditions to win
          if (matchedCount === 8) {
              clearTimeout(t);
              for (let s = 0; s < starCount; s++) {
                const modalStar = document.createElement('i');
                modalStar.classList.add('fa', 'fa-star');
                document.getElementsByClassName('modal-stars')[0].appendChild(modalStar);
              }
              document.getElementsByClassName('modal-moves')[0].innerHTML = moveCount;
              document.getElementsByClassName('modal-time')[0].innerHTML = h3.textContent;
              $('#bestModal').modal('show');
              console.log(starCount)
        }
              console.log('Total matches ' + matchedCount)
        } else {
            setTimeout(function() {
                cardTwo.addEventListener('click', checkCard);
                cardTwo.classList.remove('open');
                cardTwo.classList.remove('show');
                cardTwo.style.backgroundImage = 'none';
                cardOne.addEventListener('click', checkCard);
                cardOne.classList.remove('open');
                cardOne.classList.remove('show');
                cardOne.style.backgroundImage = 'none';
                cardOne = null;
                cardTwo = null;
            }, 1000);
        }
    }
}

//Reset the game
          resetEverything.addEventListener('click', resetGame);
          function resetGame() {
            matchedCount = 0;
            moveCount = 0;
            cardOne = null;
            cardTwo = null;
            clearTimeout(t);
            timerRunning = false;
            document.getElementsByTagName('h3')[0],
                seconds = 0,
                minutes = 0,
                hours = 0,
                t;
            h3.textContent = "Stopwatch: " + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
            document.getElementsByTagName('span')[0].innerHTML = moveCount;
            document.getElementsByClassName('fa fa-star')[2].style.visibility = 'visible';
            starCount = 2;
            document.getElementsByClassName('fa fa-star')[1].style.visibility = 'visible';
            starCount = 1;
            shuffledArray = shuffle(arrayClassNames);
            makeCards(shuffledArray);
            console.log('Reloaded page.')
            return false;
          }

makeCards();
