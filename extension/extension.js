let gameButton = document.getElementById("gameButton");

let wordOne = document.getElementById("wordOne");
let wordTwo = document.getElementById("wordTwo");
let wordThree = document.getElementById("wordThree");

const resetWords = document.getElementById("resetWords");
let buttonCount = document.getElementById("buttonCount");
let articleButton = document.getElementById("article");
const TUNNEL = "https://a1b318cf294c.ngrok.io";

chrome.storage.sync.get("wordOne", function(result){
  wordOne.innerHTML = result.wordOne
});
chrome.storage.sync.get("wordTwo", function(result){
  wordTwo.innerHTML = result.wordTwo
});
chrome.storage.sync.get("wordThree", function(result){
  wordThree.innerHTML = result.wordThree
});

chrome.storage.sync.get("buttonCount", function(result){
  buttonCount.innerHTML = result.buttonCount
  if (result.buttonCount >= 1){
    wordOne.hidden = false;
  }
  if (result.buttonCount >= 2){
    wordTwo.hidden = false;
  }
  if (result.buttonCount >= 3){
    wordThree.hidden = false;
    articleButton.hidden = false;
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.sync.get("buttonCount", function(result){
    const buttonPresses = result.buttonCount;
    console.log(buttonPresses);
    if (buttonPresses === 3){
      console.log("button pressed 3 times in listener");
    }
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addButton,
  });
}, false);

articleButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: articleTravel,
  });
});

resetWords.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: handleWordReset,
  });
});
function articleTravel(){
  chrome.storage.sync.get("newsURL", function(result){
    console.log("logging article url");
    console.log(result.newsURL);
    window.open(result.newsURL);
  });
}

function addButton(){
  //chrome.storage.sync.set({ buttonPressed : false });
  var button = document.createElement('button');
  button.type = 'button';
  button.innerHTML = 'Press me';
  button.className = 'btn-styled';
  button.id = 'gameButton'
  button.onclick = function() {
    console.log("button pressed");
    chrome.storage.sync.set({ buttonPressed : true });
    //document.getElementById("gameButton").innerHTML = "pressed";
    button.remove();
    chrome.storage.sync.get("buttonCount", function(result){

      console.log("logging button counter BEFORE");
      console.log(result.buttonCount);
      result.buttonCount = result.buttonCount + 1;
      console.log("logging button counter AFTER");
      console.log(result.buttonCount);
      chrome.storage.sync.set({ buttonCount: result.buttonCount});

    });

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



function handleWordReset(){

  console.log("made it to handleWordReset");
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  //document.getElementById("wordOne").innerHTML = result["wordOne"];
  fetch("https://a1b318cf294c.ngrok.io" + "/getWords", requestOptions)
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

function testSend() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  //replace with whatever the url actually is when ngrok is ran
  fetch("https://a1b318cf294c.ngrok.io" + "/test", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
