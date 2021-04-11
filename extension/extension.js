/* New News Extension
A Cypher VI project
By Alex and Brandon Fantine 
*/

let gameButton = document.getElementById("gameButton");

let wordOne = document.getElementById("wordOne");
let wordTwo = document.getElementById("wordTwo");
let wordThree = document.getElementById("wordThree");

let  resetWords = document.getElementById("resetWords");
let buttonCount = document.getElementById("buttonCount");
let articleButton = document.getElementById("article");

//use the storage api to retrieve the stored words
chrome.storage.sync.get("wordOne", function(result){
  wordOne.innerHTML = result.wordOne
});
chrome.storage.sync.get("wordTwo", function(result){
  wordTwo.innerHTML = result.wordTwo
});
chrome.storage.sync.get("wordThree", function(result){
  wordThree.innerHTML = result.wordThree
});

//perform some checks using the button count, i.e. should the words show
chrome.storage.sync.get("buttonCount", function(result){
  buttonCount.innerHTML = result.buttonCount
  //if at least one button has been pressed, the first clue shows
  if (result.buttonCount >= 1){
    wordOne.hidden = false;
  }
  //same for second clue, etc.
  if (result.buttonCount >= 2){
    wordTwo.hidden = false;
  }
  if (result.buttonCount >= 3){
    wordThree.hidden = false;
    articleButton.hidden = false;
  }
});

//upon loading the extension, the script begins to add buttons to the page
document.addEventListener("DOMContentLoaded", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addButton,
  });
}, false);

//when the article button is clicked, open the new tab
articleButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: articleTravel,
  });
});

//when the reset button is pressed, reset the words and the button counter
resetWords.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: handleWordReset,
  });
});

//function to open the news article
function articleTravel(){
  chrome.storage.sync.get("newsURL", function(result){
    console.log("logging article url");
    console.log(result.newsURL);
    window.open(result.newsURL);
  });
}

//funciton to add buttons to the webpage
function addButton(){
  //chrome.storage.sync.set({ buttonPressed : false });
  var button = document.createElement('button');
  button.type = 'button';
  button.innerHTML = 'Hint Word';
  button.id = 'gameButton'
  button.onclick = function() {
    console.log("button pressed");
    //adding this button pressed bool was supposed to fix the issue of extra buttons appearing
    //because you open the extension and press a button, but unfortunately it didn't work
    chrome.storage.sync.set({ buttonPressed : true });
    //document.getElementById("gameButton").innerHTML = "pressed";
    button.remove();
    chrome.storage.sync.get("buttonCount", function(result){
      //updating the button count
      console.log("logging button counter BEFORE");
      console.log(result.buttonCount);
      result.buttonCount = result.buttonCount + 1;
      console.log("logging button counter AFTER");
      console.log(result.buttonCount);
      chrome.storage.sync.set({ buttonCount: result.buttonCount});

    });
    //choose a random paragraph and append the button to it
    var pars = document.getElementsByTagName("p");
    var chosen_par = pars[Math.floor(Math.random() * pars.length)];
    chosen_par.appendChild(button);
  };
  chrome.storage.sync.get("buttonPressed", function(result){
    const buttonPressed = Boolean(result.buttonPressed);
    console.log(buttonPressed);
    if (!buttonPressed){
      console.log("no buttons pressed, is this first button?");
      chrome.storage.sync.get("buttonCount", function(result){
        const buttonPresses = result.buttonCount;
        if (buttonPresses === 0){
          console.log("this is the first button!")
          var pars = document.getElementsByTagName("p");
          var chosen_par = pars[Math.floor(Math.random() * pars.length)];
          chosen_par.appendChild(button);
        }
        else{
          console.log("the button hasn't been pressed, but the counter is not at 0. This shouldn't happen!")
        }
      });
    }
    else{
      console.log("button has been pressed");
    }
  });

}


//resets the entire game, including clue words and button count
function handleWordReset(){

  console.log("made it to handleWordReset");
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  //document.getElementById("wordOne").innerHTML = result["wordOne"];
  fetch("https://270cb53e12d5.ngrok.io" + "/getWords", requestOptions)
    .then((response) => response.json())
    .then(result => {
      chrome.storage.sync.set({ wordOne: result.wordOne });
      chrome.storage.sync.set({ wordTwo: result.wordTwo });
      chrome.storage.sync.set({ wordThree: result.wordThree });
      chrome.storage.sync.set({ newsURL: result.newsURL});
      chrome.storage.sync.set({ buttonCount: 0 });
      chrome.storage.sync.set({ buttonPressed: false });
    })
    .catch(error => console.log('error', error));


}
