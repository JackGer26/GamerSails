getFetch()

let gameList = document.querySelector('ul')

gameList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const gameTitle = event.target.innerText
    const gameData = fetchGameData(gameTitle) // Fetch the game data using the game title

    // Update the HTML elements with the desired information
    document.querySelector('img').src = gameData.thumb
    document.querySelector('#meta-critic-score').innerText = gameData.metacriticScore
    document.querySelector('#steam-rating').innerText = gameData.steamRatingPercent
    document.querySelector('#normal-price').innerText = gameData.normalPrice
    document.querySelector('#sale-price').innerText = gameData.salePrice
    document.querySelector('#savings').innerText = gameData.savings
  }
})

let gameData = {};

function getFetch() {
  const url = "https://www.cheapshark.com/api/1.0/deals?storeID=1";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // Sort the game titles in alphabetical order
      data.sort((a, b) => a.title.localeCompare(b.title));

      let currentLetter = '';
      data.forEach((element, index) => {
        const firstLetter = data[index].title[0].toUpperCase();

        // Create a new subheading for each new letter
        if (firstLetter !== currentLetter) {
          const subheading = document.createElement('h2');
          subheading.innerText = firstLetter;
          gameList.appendChild(subheading);
          currentLetter = firstLetter;
        }

        let gameTitle = document.createElement('li');
        gameTitle.innerText = data[index].title;
        gameTitle.addEventListener('click', () => {
          updateGameData(data[index].title, data[index]);
        });
        gameList.appendChild(gameTitle);

        // Populate the gameData object with the fetched game data
        gameData[data[index].title] = data[index];
      });
    })
    .catch(err => {
      console.log(`Error fetching game data: ${err}`);
    });
} 

function updateGameData(gameTitle, gameData) {
  // Remove any existing game information div
  const gameInfoDiv = document.getElementById('game-info');
  if (gameInfoDiv) {
    gameInfoDiv.remove();
  }

  // Find the clicked list item
  const clickedListItem = event.target;

  // Create a new div element to display the game information
  const newGameInfoDiv = document.createElement('div');
  newGameInfoDiv.id = 'game-info';

  // Calculate the percentage saved without decimal places
  const savingsPercentage = Math.round((1 - gameData.salePrice / gameData.normalPrice) * 100);

  // Populate the new div element with the game data and image
  newGameInfoDiv.innerHTML = `
    <h2>${gameTitle}</h2>
    <img src="${gameData.thumb}">
    <p>Meta Critic Score: <span id="meta-critic-score">${gameData.metacriticScore}%</span></p>
    <p>Steam Rating: <span id="steam-rating">${gameData.steamRatingPercent}%</span></p>
    <p>Normal Price: <span id="normal-price">£${gameData.normalPrice}</span></p>
    <p>Sale Price (On Steam): <span id="sale-price">£${gameData.salePrice}</span></p>
    <p>Savings: <span id="savings">${savingsPercentage}%</span></p>
  `;

  // Append the new div element to the clicked list item
  clickedListItem.appendChild(newGameInfoDiv);
}

function fetchGameData(gameTitle) {
  return gameData[gameTitle];
}