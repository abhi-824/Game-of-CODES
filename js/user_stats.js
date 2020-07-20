// var cf_profile_url = "https://codeforces.com/profile/";

//const urlRatings = "https://codeforces.com/api/user.rating?handle=";
//const urlSubmissions = "https://codeforces.com/api/user.status?handle=";
//const urlUserAvatar = "https://codeforces.com/api/user.info?handles=";
var user_rating;
var max_rating;
function start() {
	document.querySelector("#submissions").textContent = "SUBMISSIONS: " + ok;
	console.log(user_handle);

	async function getUserAvatar() {
	    let finalUserAvatarUrl = urlUserAvatar + user_handle;

	    const jsonDataAvatar = await fetch(finalUserAvatarUrl);
	    const jsDataAvatar = await jsonDataAvatar.json();
	    let userPhoto = jsDataAvatar.result[0].titlePhoto;
	    user_rating = jsDataAvatar.result[0].rating;
	    max_rating = jsDataAvatar.result[0].maxRating;
	    console.log(user_rating);
	   	console.log(max_rating);
	    document.querySelector("#cur_rating").textContent = "CURRENT RATING: " + user_rating;
	    document.querySelector("#max_rating").textContent = "BEST RATING: " + max_rating;

	    let temp = "http:";
	    let tempArr = [temp,userPhoto];
	    let finalPhoto = tempArr.join("");
	    $("#profile-photo").attr("src",finalPhoto);
	}
	getUserAvatar();
	

	// document.querySelector("#username").addEventListener("click", function (e) {
    //    cf_profile_url += user_handle;
 	//    document.location.href = user_stats_url;
 	//    e.preventDefault();
	// });
}

window.onload = start();