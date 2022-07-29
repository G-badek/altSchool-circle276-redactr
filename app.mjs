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
  const shareBtn = document.querySelector('#share-btn');
  const scanned = document.querySelector('#scanned');
  const matched = document.querySelector('#matched');
  const scrambled = document.querySelector('#scrambled');
  const timed = document.querySelector('#timed');
  const questNavButton = document.querySelector('.quest');
  const closeNav = document.querySelector('.close');
  const nav = document.querySelector("nav");
  const mainPage = document.querySelector("main");

  let main, redact, returnText, dont, redactStatus;


  /////////////////////////////////////////////

  /////////////////////////////////////////////

  // EVENT LISTENER
  /////////////////////////////////////////////

  // OUESTION AND CLOSE MARK BUTTON

  questNavButton.addEventListener("click", () => {
    nav.classList.toggle("hide");
    closeNav.classList.toggle("hide");
    mainPage.classList.toggle("show");
  });

  closeNav.addEventListener("click", () => {
    nav.classList.toggle("hide");
    closeNav.classList.toggle("hide");
    mainPage.classList.toggle("show");
    
  });
  

  //REDACT BUTT0N

  redactBtn.addEventListener("click", (e) => {
    const startTime = Date.now();
    if (returnText) {
      returnBtn.click();
    }
    let main = mainTexts.value.split(" ");
    let redact = redactTexts.value.split(" ");

    if (!returnText) {
      returnText = mainTexts.value.split(" ");
    }

    if ((main.length == 1) && (main[0] == '')) {
      return;
    }

    let [scan, match, scramble] = redacting(main, redact);

      mainTexts.value = main.join(" ");
      const endTime = Date.now();
      let timeCompleted = `${endTime - startTime}`;
      stats(scan, match, scramble, timeCompleted);
  });

  //RETURN BUTTON

  returnBtn.addEventListener("click", (e) => {
    if (returnText) {
      returnTexts(returnText);
      returnText = "";
    }

  });

  //CLEAR BUTTON

  clearBtn.addEventListener("click", (e) => {
    mainTexts.value = "";
    redactTexts.value = "";
    returnText = "";
    sign.value = "";
    scanned.innerText = `${0}`;
    matched.innerText = `${0}`;
    scrambled.innerText = `${0}`;
    timed.innerText = `${0}`;
  });

  //COPY BUTTON

  copyBtn.addEventListener("click", (e) => {
    dont = false;
    mainTexts.select();
    mainTexts.setSelectionRange(0, 99999);
    copyBtn.innerText = "Copied";

    copyBtn.classList.toggle("pinned");

    navigator.clipboard.writeText(mainTexts.value).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });

    setTimeout(() => {
      copyBtn.innerText = "Copy";
      copyBtn.classList.toggle("pinned");
      
    }, 2000);
    setTimeout(() => {
      dont = true;
      mainTexts.blur();
    }, 1000);

  });

  // SHARE BUTTON

  shareBtn.addEventListener("click", async (e) => {
    let data = {
      title: "",
      text: `${mainTexts.value}`
    }
    try {
      await navigator.share(data);
    } catch (err) {
      console.log(err);
    }

  });

  //SIGN INPUT

  sign.addEventListener('change', (e) => {
    returnBtn.click();
  });

  //MAIN INPUT

  mainTexts.addEventListener('focus', (e) => {
    // mainTexts.select();
    // mainTexts.setSelectionRange(0, 99999);
    if (dont) {
      returnBtn.click();
    }
  });

  mainTexts.addEventListener('keyup', (e) => {
  });

  // });


  //REDACT INPUT

  redactTexts.addEventListener('keydown', (e) => {
    returnBtn.click();
  });

  /////////////////////////////////////////////


  /////////////////////////////////////////////

  //FUNCTIONS
  /////////////////////////////////////////////

  //REDACTING FUNCTION

  const redacting = (main, redact) => {
    let scanned = main.length, matched = 0, scrambled = 0;
    for (let i = 0; i < redact.length; i++) {
      for (let j = 0; j < main.length; j++) {
        if (redact[i].toUpperCase() == main[j].toUpperCase()) {
          let count = main[j].length;
          matched += 1;
          scrambled += count;
          main[j] = "";
          for (let v = 0; v < count; v++) {
            main[j] += (sign.value || "*");
          }
        }
      }
    }
    return ([scanned, matched, scrambled]);
  }

  //RETURN FUNCTION

  const returnTexts = (texts) => {
    mainTexts.value = texts.join(" ");
    scanned.innerText = `${0}`;
    matched.innerText = `${0}`;
    timed.innerText = `${0}`;
    scrambled.innerText = `${0}`;
  }

  //STATS FUNCTION

  const stats = (scan, match, scramble, timeCompleted) => {
    scanned.innerText = `${scan}`;
    matched.innerText = `${match}`;
    scrambled.innerText = `${scramble}`;
    timed.innerText = `${timeCompleted}`;
  }

  /////////////////////////////////////////////


  /////////////////////////////////////////////


};


// ======= DO NOT EDIT ============== //
export default startApp;
  // ======= EEND DO NOT EDIT ========= //