const game = () => {
  let pScore = 0;
  let cScore = 0;

  // Start the Game
  const startGame = () => {
    const playBtn = document.querySelector('.intro button');
    const introScreen = document.querySelector('.intro');
    const gameScreen = document.querySelector('.game');

    playBtn.addEventListener('click', () => {
      introScreen.classList.add('fadeOut');
      gameScreen.classList.add('fadeIn');
    });
  };

  // Play Match
  const playMatch = () => {
    const options = document.querySelectorAll('.options button');
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    const hands = document.querySelectorAll('.hands img');

    hands.forEach(hand => {
      hand.style.opacity = 0.5;

      hand.addEventListener('animationend', function() {
        this.style.animation = '';
      });
    });

    // Computer Options
    const computerOptions = ['rock', 'paper', 'scissors'];

    options.forEach(option => {
      option.style.opacity = 1;

      option.addEventListener('click', function() {
        // Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        hands.forEach(hand => {
          hand.style.opacity = 1;
        });

        options.forEach(option => {
          option.style.opacity = 0.5;
          option.disabled = true;
        });

        playerHand.src = './assets/hands/rock.png';
        computerHand.src = './assets/hands/rock.png';

        setTimeout(() => {
          compareHands(this.className, computerChoice);
          // Update Images
          playerHand.src =
            `./assets/hands/${this.className}.png`;
          computerHand.src =
            `./assets/hands/${computerChoice}.png`;
        }, 2000);

        // Animation
        playerHand.style.animation = 'shakePlayer 2s ease';
        computerHand.style.animation = 'shakeComputer 2s ease';
      });
    });
  };

  const compareHands = (playerChoice, computerChoice) => {
    const pWinner = document.querySelector('.wrapper-player-score .winner');
    const pLoser = document.querySelector('.wrapper-player-score .loser');
    const pTie = document.querySelector('.wrapper-player-score .tie');
    const pText = document.querySelector(
      '.wrapper-player-score .score-text');
    const cWinner = document.querySelector(
      '.wrapper-computer-score .winner');
    const cLoser = document.querySelector('.wrapper-computer-score .loser');
    const cTie = document.querySelector('.wrapper-computer-score .tie');
    const cText = document.querySelector(
      '.wrapper-computer-score .score-text');

    pText.classList.add('fadeOut');
    cText.classList.add('fadeOut');

    // Checking for a tie
    if (playerChoice === computerChoice) {
      pTie.classList.add('fadeIn');
      cTie.classList.add('fadeIn');

      updateScore();
      return;
    }

    // Check for Rock
    if (playerChoice === 'rock') {
      if (computerChoice === 'scissors') {
        pWinner.classList.add('fadeIn');
        cLoser.classList.add('fadeIn');
        pScore++;
        updateScore();
        return;
      } else {
        cWinner.classList.add('fadeIn');
        pLoser.classList.add('fadeIn');
        cScore++;
        updateScore();
        return;
      }
    }

    // Check for Paper
    if (playerChoice === 'paper') {
      if (computerChoice === 'scissors') {
        cWinner.classList.add('fadeIn');
        pLoser.classList.add('fadeIn');
        cScore++;
        updateScore();
        return;
      } else {
        pWinner.classList.add('fadeIn');
        cLoser.classList.add('fadeIn');
        pScore++;
        updateScore();
        return;
      }
    }

    // Check for Scissors
    if (playerChoice === 'scissors') {
      if (computerChoice === 'rock') {
        cWinner.classList.add('fadeIn');
        pLoser.classList.add('fadeIn');
        cScore++;
        updateScore();
        return;
      } else {
        pWinner.classList.add('fadeIn');
        cLoser.classList.add('fadeIn');
        pScore++;
        updateScore();
        return;
      }
    }
  };

  const updateScore = () => {
    const playerActionsScore = document.querySelectorAll(
      '.wrapper-player-score p');
    const computerActionsScore = document.querySelectorAll(
      '.wrapper-computer-score p');
    const playerScore = document.querySelector(
      '.wrapper-player-score p.score-text');
    const computerScore = document.querySelector(
      '.wrapper-computer-score p.score-text');
    const options = document.querySelectorAll('.options button');

    playerScore.textContent = pScore;
    computerScore.textContent = cScore;

    setTimeout(() => {
      playerActionsScore.forEach(score => {
        if (score.classList.contains('fadeIn')) {
          score.classList.remove('fadeIn');
        }
      });

      computerActionsScore.forEach(score => {
        if (score.classList.contains('fadeIn')) {
          score.classList.remove('fadeIn');
        }
      });

      playerScore.classList.add('fadeIn');
      computerScore.classList.add('fadeIn');

      options.forEach(option => {
        option.style.opacity = 1;
        option.disabled = false;
      });
    }, 2000);
  };

  // Call all the inner functions
  startGame();
  playMatch();
};

// Start the game function
game();
