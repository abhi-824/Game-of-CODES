let once_entered = 0;
let handle;
let protection_mode = false;
//listen for auth status changes
auth.onAuthStateChanged((user) => {
  // var handle_name=document.getElementById('')
  if (user) {
    //console.log('user logged in');
    db.collection("handles")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const handle_list = doc.data();
          if (handle_list.email === user.email) {
            handle = handle_list.handle;
            //console.log(handle);
          }
        });
        if (handle==undefined) {
          document.querySelector(".loader12345").classList.add("disapper");
          document.querySelector(".container11").classList.remove("hidden");
          // show_screen(index_screen);
          ask_fr_handle(user);
        } else {
          // document.querySelector(".container11").classList.add("hidden");
          // document.querySelector(".container1").classList.remove("hidden");

          var request = new XMLHttpRequest();
          once_entered = 1;
          request.open("GET", "/screen/1", true);

          request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
              // Success!
              var data = this.response;
              document.querySelector(".loader12345").classList.add("disapper");
              let div = document.createElement("div");
              div.innerHTML = data;
              document.body.appendChild(div);
              dashboard(handle);
              events_init();
            } else {
              // We reached our target server, but it returned an error
            }
          };

          request.onerror = function () {
            // There was a connection error of some sort
          };

          request.send();
        }
      });
  } else {
    //console.log('user logged out');
    if (once_entered) {
      show_screen(index_screen);
    } else {
      document.querySelector(".loader12345").classList.add("disapper");
      index_screen.classList.remove("hidden");
    }
  }
});

// for signup
const signupform = document.querySelector("#signup-form");

const forgotform = document.querySelector("#forgot");

signupform.addEventListener("submit", (e) => {
  e.preventDefault();
  //console.log('hey');
  const email = signupform["signup-email"].value;
  const handle_name = signupform["signup-handle"].value;
  const pwd = signupform["signup-password"].value;

  //console.log(email, handle_name, pwd);
  async function find_user() {
    let modified_url =
      "https://codeforces.com/api/user.info?handles=" + handle_name;
    const jsondata = await fetch(modified_url);
    const jsdata = await jsondata.json();
    if (jsdata.status === "FAILED") {
      display_error();
    } else {
      auth
        .createUserWithEmailAndPassword(email, pwd)
        .then((cred) => {
          db.collection("handles").add({
            email: email,
            handle: handle_name,
            target: 16000,
            bookmarks: [],
          });
          //console.log(cred);
          signupform.reset();
        })
        .catch(function (error) {
          display_alert(error);
          display_error();
        });
    }
  }
  find_user();
  e.preventDefault();
});

forgotform.addEventListener("submit", (e) => {
  e.preventDefault();
  let emailAddress = document.querySelector("#login-email-forgot").value;
  auth
    .sendPasswordResetEmail(emailAddress)
    .then(function () {
      forgotform.classList.add("hidden");
      document.querySelector(".after-forgot").classList.remove("hidden");
    })
    .catch(function (error) {
      display_error();
      display_alert(error);
      // An error happened.
    });
});

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const pwd = loginForm["login-password"].value;
  document.querySelector(".loader12345").classList.remove("disapper");

  auth
    .signInWithEmailAndPassword(email, pwd)
    .then((cred) => {
      document.querySelector(".loader12345").classList.add("disapper");
      //console.log(cred);
    })
    .catch(function (error) {
      display_error();
      display_alert(error);
    });
});

const loginAsGuestForm = document.querySelector("#login-as-guest-form");
loginAsGuestForm.addEventListener("submit", (e) => {
  let handle = document.querySelector("#handle-login-as-guest").value;
  protection_mode = true;
  var request = new XMLHttpRequest();
  once_entered = 1;
  request.open("GET", "/screen/1", true);

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = this.response;
      document.querySelector(".loader12345").classList.add("disapper");
      let div = document.createElement("div");
      div.innerHTML = data;
      document.body.appendChild(div);
      dashboard(handle);
      events_init();
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function () {
    // There was a connection error of some sort
  };

  request.send();
  e.preventDefault();
});

function display_error() {
  document.querySelector(".loader12345").classList.add("disapper");
  // show_screen(index_screen);
  document.querySelector(".disp_err").classList.remove("hidden");
  document.querySelector(".disp_err").classList.add("disapper2");
}

document.querySelector(".google-sign-in").addEventListener("click", (e) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch(function (error) {
      //console.log('hell');
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      display_alert(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  e.preventDefault();
});

function ask_fr_handle(user) {
  document.querySelector(".ask_handle").classList.remove("hidden");
  document.querySelector("#signup-form").classList.add("hidden");
  document.querySelector(".wah").classList.add("hidden");
  document.querySelector("#login-form").classList.add("hidden");
  document.querySelector("#forgot").classList.add("hidden");
  document.querySelector(".after-forgot").classList.add("hidden");
  document
    .querySelector(".ask-handle-submit")
    .addEventListener("click", (e) => {
      document.querySelector(".loader12345").classList.remove("disapper");
      document.querySelector(".loader12345").classList.remove("hidden");
      e.preventDefault();
      let handle_val = document.querySelector(".ask_handle_val").value;
      async function find_use2r() {
        let modified_url =
          "https://codeforces.com/api/user.info?handles=" + handle_val;
        const jsondata = await fetch(modified_url);
        const jsdata = await jsondata.json();
        if (jsdata.status === "FAILED") {
          display_error();
        } else {
          db.collection("handles").add({
            email: user.email,
            handle: handle_val,
            target: 16000,
            bookmarks: [],
          });
          var request = new XMLHttpRequest();
          once_entered = 1;
          request.open("GET", "/screen/1", true);

          request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
              // Success!
              var data = this.response;
              document.querySelector(".loader12345").classList.add("disapper");
              let div = document.createElement("div");
              div.innerHTML = data;
              document.body.appendChild(div);
             
          document.querySelector(".loader12345").classList.add("disapper");
          document.querySelector(".ask_handle").classList.add("hidden");

          dashboard(handle_val);
              events_init();
            } else {
              // We reached our target server, but it returned an error
            }
          };

          request.onerror = function () {
            // There was a connection error of some sort
          };

          request.send();


        }
      }
      find_use2r();
    });
}

function display_alert(str) {
  let div = document.createElement("div");
  div.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
	Hey Coder, ${str}
	<button type="button" class="close" data-dismiss="alert" aria-label="Close">
	  <span aria-hidden="true">&times;</span>
	</button>
  </div>`;
  div.className = "alert_display";
  document.body.appendChild(div);
}
