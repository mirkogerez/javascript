function startGame() {
  let randomNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  let gameActive = true;

  while (gameActive) {
      let userGuess = getUserGuess();

      if (userGuess === null) {
          alert("Juego cancelado.");
          break;
      }

      attempts++;

      if (userGuess === randomNumber) {
          alert(`¡Felicidades! Adivinaste el número en ${attempts} intentos.`);
          gameActive = false;
      } else if (userGuess < randomNumber) {
          alert("El número es más alto. Inténtalo de nuevo.");
      } else {
          alert("El número es más bajo. Inténtalo de nuevo.");
      }
  }
}

function getUserGuess() {
  while (true) {
      let userGuess = prompt("Introduce un número entre 1 y 100:");

      if (userGuess === null) {
          return null;
      }

      userGuess = parseInt(userGuess);

      if (!isNaN(userGuess) && userGuess >= 1 && userGuess <= 100) {
          return userGuess;
      } else {
          alert("Por favor, introduce un número válido entre 1 y 100.");
      }
  }
}