import { writeFile, readFile } from 'fs';

// The following code builds on the imports, write and read functions above.
// We omit the above code here for brevity.


// Get a random index ranging from 0 (inclusive) to max (exclusive).
    var getRandomIndex = function (max) {
      return Math.floor(Math.random() * max);
    };

    // Shuffle the elements in the cardDeck array
    var shuffleCards = function (cardDeck) {
      // Loop over the card deck array once
      var currentIndex = 0;
      while (currentIndex < cardDeck.length) {
        // Select a random index in the deck
        var randomIndex = getRandomIndex(cardDeck.length);
        // Select the card that corresponds to randomIndex
        var randomCard = cardDeck[randomIndex];
        // Select the card that corresponds to currentIndex
        var currentCard = cardDeck[currentIndex];
        // Swap positions of randomCard and currentCard in the deck
        cardDeck[currentIndex] = randomCard;
        cardDeck[randomIndex] = currentCard;
        // Increment currentIndex
        currentIndex = currentIndex + 1;
      }
      // Return the shuffled deck
      return cardDeck;
    };


/**
 * Add a key-value pair to the JSON object in the relevant file
 * @param {string} filename - The name of the target JSON file
 * @param {string} key - The name of the key we wish to add
 * @param {*} value - The data that corresponds to the given key
 * @returns undefined
 */
export function add(filename, key, value) {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.error('Reading error', readErr);
      return;
    }

    // Parse the JSON string from the file into a JS Object.
    const jsonContentObj = JSON.parse(jsonContentStr);

    // Add the new key and value to the content object.
    jsonContentObj[key] = value;

    // Transform the updated content object back into a JSON string.
    const updatedJsonContentStr = JSON.stringify(jsonContentObj);

    // Write updated JSON to original file, overwriting original contents.
    writeFile(filename, updatedJsonContentStr, (writeErr) => {
      if (writeErr) {
        console.error('Writing error', writeErr);
        return;
      }
      console.log('Success!');
    });
  };

  // Read the file called filename and call handleFileRead on its contents.
  readFile(filename, 'utf-8', handleFileRead);
}


/**
 * Read and log the contents of the target JSON file
 * @param {string} filename - The name of the target JSON file
 * @returns undefined
 */
export function read(filename) {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.error('Reading error', readErr);
      return;
    }
    // We only log the value of jsonContentStr. We could also parse it
    // into a JS Object to access specific keys and values.
    console.log(jsonContentStr);
  };

  readFile(filename, 'utf-8', handleFileRead);
}

export const remove5 = (filename) => {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.log('Reading error', readErr);
    }

    // Convert data from string to Object
    const jsonContentObj = JSON.parse(jsonContentStr);

    // TODO: Modify the data however we would like
    // remove 5 cards from the deck
    for (let i = 0; i < 5; i += 1) {
      const deckMinus5Cards = jsonContentObj.deckName.pop();
      console.log(deckMinus5Cards);
    }
   
    // Convert data from Object to string
    const updatedJsonContentStr = JSON.stringify(jsonContentObj);

    // Write updated data to file
    writeFile(filename, updatedJsonContentStr, (writeErr) => {
      if (writeErr) {
        console.log('writing error', writeErr);
      }
    });
  };

  // Read original data from file
  readFile(filename, 'utf-8', handleFileRead);
};

export const shuffle = (filename) => {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.log('Reading error', readErr);
    }

    // Convert data from string to Object
    const jsonContentObj = JSON.parse(jsonContentStr);

    // TODO: Modify the data however we would like
    // shuffle
    jsonContentObj.deckName = shuffleCards(jsonContentObj.deckName)
     
    // console.log(shuffledDeck)
    // Convert data from Object to string
    const updatedJsonContentStr = JSON.stringify(jsonContentObj);

    // Write updated data to file
    writeFile(filename, updatedJsonContentStr, (writeErr) => {
      if (writeErr) {
        console.log('writing error', writeErr);
      }
    });
  };

  // Read original data from file
  readFile(filename, 'utf-8', handleFileRead);
};