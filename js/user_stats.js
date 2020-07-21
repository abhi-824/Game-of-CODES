// var cf_profile_url = "https://codeforces.com/profile/";


var total_attempts = 0; //for user stats
var ok = 0;
var user_handle;
var user_avatar;
var accuracy_rate;
var user_rating;
var max_rating;

const urlSubmissions1 = "https://codeforces.com/api/user.status?handle=";
const urlUserAvatar1 = "https://codeforces.com/api/user.info?handles=";


//getting the user handle
function getHandle() {
  var url = document.location.href,
    params = url.split("=")[1];
    return params;
}

user_handle = getHandle();
$(".username").text(user_handle);


$(document).ready(function() {

	async function getUserSubmissions() {
		//fn to get user submissions
	    let finalUrlSubmissions = urlSubmissions1 + user_handle + "&from=1";

	    const jsonDataSubmissions = await fetch(finalUrlSubmissions);
	    const jsDataSubmissions = await jsonDataSubmissions.json();

	    total_attempts = jsDataSubmissions.result.length; 

	    for (let j = 0; j < jsDataSubmissions.result.length; j++) {
	      if (jsDataSubmissions.result[j].verdict == "OK") {
	        ok++;
	      }
	    }

	    //calculations for user stats page
	    console.log(ok, total_attempts);
	    accuracy_rate = ((ok/total_attempts)*100).toFixed(2);
	    document.querySelector("#submissions").textContent = "SUBMISSIONS: " + ok;
    	document.querySelector("#acc_rate").textContent = "ACCURACY RATE: " + accuracy_rate + "%";
	}

	async function getUserAvatar() {
		//fn to get user avatar, max rating & current rating
	    let finalUserAvatarUrl = urlUserAvatar1 + user_handle;

	    const jsonDataAvatar = await fetch(finalUserAvatarUrl);
	    const jsDataAvatar = await jsonDataAvatar.json();
	    let userPhoto = jsDataAvatar.result[0].titlePhoto;
	    //user rating 
	    user_rating = jsDataAvatar.result[0].rating;
	    max_rating = jsDataAvatar.result[0].maxRating;
	    console.log("Current-Rating: "+ user_rating + ", Max-Rating: " + max_rating);

	    document.querySelector("#cur_rating").textContent = "CURRENT RATING: " + user_rating;
	    document.querySelector("#max_rating").textContent = "BEST RATING: " + max_rating;

	    let temp = "http:";
	    let tempArr = [temp,userPhoto];
	    let finalPhoto = tempArr.join("");
	    
	    $("#profile-photo").attr("src", finalPhoto); //for user-statistics page
	}

  	getUserSubmissions();
  	getUserAvatar()
});


document.querySelector("#dashboard").addEventListener("click", function (e) {
    console.log("Going to dashboard!");

    var dash_url = "dashboard.html?handle=";
    dash_url += user_handle;
    document.location.href = dash_url;

    e.preventDefault();
});

document.querySelector("#profile").addEventListener("click", function (e) {
    console.log("Going back to profile page!");

    var prof_url = "profile.html?handle=";
    prof_url += user_handle;
    document.location.href = prof_url;
    
    e.preventDefault();
});

document.querySelector("#compare").addEventListener("click", function (e) {
    console.log("Going to the compare page . . .");

    var comp_url = "compare.html?handle=";
    comp_url += user_handle;
    document.location.href = comp_url;
    
    e.preventDefault();
});

document.querySelector("#codeblast").addEventListener("click", function (e) {
    console.log("Going to codeblast!");

    var cblast_url = "codeblast.html?handle=";
    cblast_url += user_handle;
    document.location.href = cblast_url;
    
    e.preventDefault();
});



// document.querySelector("#username").addEventListener("click", function (e) {
//     cf_profile_url += user_handle;
//  	document.location.href = user_stats_url;
//  	e.preventDefault();
// });