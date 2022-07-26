function startApp() {
  // Your entire app should not necessarily be coded inside this 
  // single function (though there's no penalty for that), 
  // so create and use/call additional functions from here

  // pls remove the below and make some magic in here!


  /////////////////////////////////////////////

  //DECLARATIONS
  //////////////////////////////////////////////

  const mainTexts = document.querySelector('#main-texts');
  const redactTexts = document.querySelector('#redact-texts');
  const sign = document.querySelector('#sign');
  const redactBtn = document.querySelector('#redact-btn');
  const returnBtn = document.querySelector('#return-btn');
  const clearBtn = document.querySelector('#clear-btn');
  const copyBtn = document.querySelector('#copy-btn');
  const Scanned = document.querySelector('#scanned');
  const matched = document.querySelector('#matched');
  const scrambled = document.querySelector('#scrambled'); 
  const timed = document.querySelector('#timed');
  
  let main, redact, returnText;
  
  sign.value = '*';

  /////////////////////////////////////////////

  /////////////////////////////////////////////

  // EVENT LISTENER
  /////////////////////////////////////////////

  //REDACT BUTT0N

  redactBtn.addEventListener("click", (e) => {
    let main = mainTexts.value.split(" ");
    let redact = redactTexts.value.split(" ");
    if (!returnText) {
      returnText = mainTexts.value.split(" ");
    }
    redacting(main, redact);
    setTimeout(() => {
      mainTexts.value = main.join(" ");
    }, 300);
  });

  //RETURN BUTTON

  returnBtn.addEventListener("click", (e) => {
    returnTexts(returnText);
  });

  //CLEAR BUTTON

  clearBtn.addEventListener("click", (e) => {
    mainTexts.value = "";
    redactTexts.value = "";
    sign.value = "*";
  });

  //COPY BUTTON

  copyBtn.addEventListener("click", (e) => {
    mainTexts.select();
    mainTexts.setSelectionRange(0, 99999);
    copyBtn.innerText = "Copied";
    setTimeout(() => {
      copyBtn.innerText = "Copy";
    }, 3000);
    navigator.clipboard.writeText(mainTexts.value).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
  });

  //SIGN INPUT

  sign.addEventListener('change', (e) => {
    returnBtn.click();
  });

  /////////////////////////////////////////////


  /////////////////////////////////////////////

  //FUNCTIONS
  /////////////////////////////////////////////

  //REDACTING FUNCTION

  const redacting = (main, redact) => {
    for (let i = 0; i < redact.length; i++) {
      for (let j = 0; j < main.length; j++) {
        if (redact[i] == main[j]) {
          let count = main[j].length;
          main[j] = "";
          for (let v = 0; v < count; v++) {
            main[j] += sign.value;
          }
        }
      }
    }
  }

  //RETURN FUNCTION

  const returnTexts = (texts) => {
    mainTexts.value = texts.join(" ");
  }

  /////////////////////////////////////////////


  /////////////////////////////////////////////


};


// ======= DO NOT EDIT ============== //
export default startApp;
  // ======= EEND DO NOT EDIT ========= //