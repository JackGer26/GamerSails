# GamerSails

This code fetches discounted game data from an API, displays a sorted list of game titles, and shows detailed information about a selected game when clicked.

![GamerSails Home Page](https://github.com/JackGer26/GamerSails/blob/main/GamerSails.PNG?raw=true)

**Link to project:** https://gamersails.netlify.app/

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

This code was built to fetch discounted game deals from the CheapShark API, display them in a categorized and interactive list, and show detailed information about a selected game. The key features of this code are its dynamic UI updates, categorization, interactive elements, and reusable data.

Firstly, the getFetch function is called at the start of the script, which sends a fetch request to the CheapShark API to retrieve game deals. The response is converted to JSON and logged to the console for debugging. The game data is stored alphabetically by title using the sort method on the array.

The code iterates through the sorted game data. For each game, the code checks the first letter of the title of the game. If the letter changes, a new subheading (h2) is created and added to the list to group games alphabetically. The object gameData is populated with the fetched game data, using the game title as the key for easy lookup.

An event listener is added to the ul element gameList to detect clicks on li elements. When a game title (li) is clicked, the fetchGameData function retrieves the corresponding game data from the gameData object, then the updateGameData function is called to display the game's details.

The code then focuses on displaying the game details. The updateGameData function dynamically creates a new div element to display the selected game's details. The function will calculate the percentage savings and populate the div element with: the game title, thumbnail image, MetaCritic score, Steam rating, normal price, sale price, and savings percentage. This div is then appended to the clicked li element, replacing any existing game information.

If the fetch request fails, an error message is logged to the console.

## Optimizations

The first issue I encountered when coding this project was that the fetchGameData function assumed that the gameData object was already populated when a game title was clicked. If the fetch call has not completed, this would result in undefined behaviour. To fix this, the gameData object is populated in the same getFetch function as the fetch call. This ensures that the data is available before any user interaction. Additionally, the gameData object is used as a cache to avoid redundant API calls.

Secondly, an interesting incident happened where the updateGameData function dynamically created a new div for game details but did not properly handle cases where multiple games were clicked, which was leading to inconsistent UI behaviour. Now the updateGameData function removes any existing information from the div before appending a new one. This ensures that only one game's details are displayed at a time.

Towards the end of this project, I was implementing the savings percentages calculation logic, which is using the salePrice property of the fetched object and the normalPrice property of the object directly, these are strings, which resulted in NaN values or incorrect calculations. This issue was resolved by converting salePrice and normalPrice to numbers using parseFloat before performing arithmetic operations to ensure accurate calculations.

Upon finishing this code, I noticed an issue with the Hardcoded element selectors, I realized that if the HTML structure changed, then the selectors would likely break. To avoid this issue, I updated the code to dynamically create and populate elements for game details with the updateGameData function. This eliminated the need to rely on hardcoded selectors.

These implementations and optimizations addressed issues related to data synchronizations (ensuring gameData is ready before use), performance, code maintainability (removing hardcoded selectors), and robustness.

## Lessons Learned:

Working on this code emphasized the importance of data organisation in my code, storing detached data in a reusable object allows for efficient lookups without repeated API calls. In this code, the gameData object is populated during the getFetch function and used later in the fetchGameData function. This avoids redundant API calls when a user clicks on a game title, demonstrating the value of caching data for reuse.

Organisation of the data was not the only organisation that was learnt from this project, I also reinforced the point that organizing data in a user-friendly way enhances navigation and usability for the user. In my code here, the code dynamically creates h2 subheadings for each new starting letter of game titles in the getFetch function. This categorization improves the user experience by grouping games alphabetically.

In Summary, this code provided practical insights into efficient data handling through caching and sorting, performance optimization with event delegation and modular functions, and user experience improvements via dynamic UI updates and categorization.
