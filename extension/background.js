let wordOne = "Press";
let wordTwo = "Reset";
let wordThree = "Now!";
let newsURL = "https://www.google.com"
let buttonCount = 0;
let buttonPressed = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ wordOne });
  chrome.storage.sync.set({ wordTwo });
  chrome.storage.sync.set({ wordThree });
  chrome.storage.sync.set({ newsURL });
  chrome.storage.sync.set({ buttonCount });
  chrome.storage.sync.set({ buttonPressed });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.buttonCount?.newValue){
    const buttonPresses = changes.buttonCount.newValue;
    console.log(buttonPresses);
    if (buttonPresses === 3){
      console.log("reached three button presses")
      chrome.runtime.sendMessage({updatePopup: true});
      //const articleButton = document.getElementById("article");
      //articleButton.hidden = false;
    }
  }
  else{
    console.log("listener triggered");
  }
})
