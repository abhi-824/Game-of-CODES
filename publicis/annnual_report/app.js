// 1577836800 1 Jan 2020 00:00:00
// 1609459199 31 Dec 2020 23:59:59

var handle;
const userStatus = "https://codeforces.com/api/user.status?handle=";
var quesCount = 0;

document.querySelector("#handle_submit").addEventListener("submit", (e) => {
  e.preventDefault();

  handle = document.querySelector("#handle").value;
  async function verification() {
    document.querySelector('.loader').classList.remove('hidden');
    let modified_url = "https://codeforces.com/api/user.info?handles=" + handle;
    const jsondata = await fetch(modified_url);
    const jsdata = await jsondata.json();
    if (jsdata.status === "FAILED") {
      alert("Maybe you spelled the username wrong or codeforces is down!(This was the most creative line we could think of)")
      document.querySelector('.loader').classList.add('hidden');

      
    } else {
      document.querySelector('.loader').classList.add('hidden');
      document.querySelector(".go_up").classList.add("animate__backOutUp");
      document.querySelector(".go_down").classList.add("animate__backOutDown");
      document
        .querySelector(".go_down")
        .addEventListener("animationend", () => {
          window.location.href =
            window.location.href.split("index.html")[0] +
            `report.html?handle=${handle}`;
        });
    }
  }
  verification()
 
});
