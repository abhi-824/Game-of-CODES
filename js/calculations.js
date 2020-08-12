let handle = "";
let url = "dashboard.html?handle=";
let button = document.querySelector("#handle_button");
let button1 = document.querySelector("#handle");
button1.value = "";
button1.focus();
button.addEventListener("click", function (e) {
  if (check_valid_user()) {
    button1.val = "";
    handle = document.querySelector("#handle").value;
    url = url + handle;
    console.log(handle);

    console.log(url);
    document.location.href = url;

    url = "dashboard.html?handle=";
  }
  e.preventDefault();
});
function check_valid_user() {
  let handle = document.querySelector("#handle").value;
  if(find_user()){
    console.log("hello");
    return true;
  }
  else
  {
    return false;
  }
  async function find_user() {
    let modified_url = "https://codeforces.com/api/user.info?handles=" + handle;
    const jsondata = await fetch(modified_url);
    const jsdata = await jsondata.json();
    if (jsdata.status === "FAILED") {
      document.querySelector(".error").classList.remove("hidden");
      document.querySelector(".success").classList.add("hidden");
      return false;
    } else {
      document.querySelector(".error").classList.add("hidden");
      document.querySelector(".success").classList.remove("hidden");
      return true;
    }
  }
}
