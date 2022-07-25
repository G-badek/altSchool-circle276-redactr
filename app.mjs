function startApp() {
  // Your entire app should not necessarily be coded inside this 
  // single function (though there's no penalty for that), 
  // so create and use/call additional functions from here

  // pls remove the below and make some magic in here!
  console.log('make magic in here!');

  const header = document.querySelector('h2');
  if (header) {
    header.textContent = 'make some magic here!!';
  }

  const mainTexts = document.querySelector('#main-texts');
  const redactTexts = document.querySelector('#redact-texts');
  const redactBtn = document.querySelector('#redact-btn');
  let main, redact;

  redactBtn.addEventListener("click", (e) => {
    let main = mainTexts.value.split(" ");
    let redact = redactTexts.value.split(" ");
    redacting(main, redact);
    mainTexts.value = main.join(" ");
  });


  const redacting = (main, redact) => {
    for(let i = 0; i < redact.length; i++) {
      for(let j = 0; j < main.length; j++) {
        if(redact[i] == main[j]) {
          let count = main[j].length;
          main[j] = "";
          for(let v = 0; v < count; v++) {
            main[j] += "*";
           }
        }
      }
    }
    console.log(main);
  }

};


// ======= DO NOT EDIT ============== //
export default startApp;
  // ======= EEND DO NOT EDIT ========= //