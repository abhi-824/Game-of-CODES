class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 50;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 100;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener("DOMContentLoaded", init);
document.addEventListener("DOMContentLoaded", init2);
// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
function init2() {
  const txtElement = document.querySelector(".txt-type2");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
let a=Math.floor(Math.random() * 2);
// console.log(a);
if(a===1)
{
  document.querySelector('.motivate1').classList.add("hidden");
}
else{
  document.querySelector('.motivate2').classList.add("hidden");
}

document.querySelector("#handle").addEventListener("input",function(e){
  async function find_user() {
    handle = document.querySelector("#handle").value;

    let modified_url = "https://codeforces.com/api/user.info?handles=" + handle;
    const jsondata = await fetch(modified_url);
    const jsdata = await jsondata.json();
    if (jsdata.status === "FAILED") {
      document.querySelector(".error").classList.remove("hidden");
      button.style.cursor="not-allowed";
      document.querySelector(".success").classList.add("hidden");
      return false;
    } else {
      document.querySelector(".error").classList.add("hidden");
      document.querySelector(".success").classList.remove("hidden");
      let button = document.querySelector("#handle_button");
      console.log("h")
      button.style.cursor="pointer";
      e.preventDefault();
      return true;
    }
  }
  find_user();
})