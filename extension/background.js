let color = '#3aa757';
let wordOne = "Press";
let wordTwo = "Reset";
let wordThree = "Now!";
let buttonCount = 0;
let buttonPressed = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ wordOne });
  chrome.storage.sync.set({ wordTwo });
  chrome.storage.sync.set({ wordThree });
  chrome.storage.sync.set({ buttonCount });
  chrome.storage.sync.set({ buttonPressed });
  console.log('Default background color set to %cgreen', `color: ${color}`);
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
