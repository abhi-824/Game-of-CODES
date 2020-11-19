// screens
let index_screen=document.querySelector('.container11');
let dashboard_screen = document.querySelector('.container1');
let topic_wise_screen = document.querySelector('.container411');
let topic_wise_screen2 = document.querySelector('.container824');
let level_wise_screen = document.querySelector('.container4');
let sorting_screen = document.querySelectorAll('.containerForSorting')[0];
let grid_screen = document.querySelectorAll('.containerForSorting')[1];
let compare_screen = document.querySelector('.container7');
let compare_screen2 = document.querySelector('.container111');
let profile_screen = document.querySelector('.container1forprofile');
let codeblast_screen = document.querySelector('.container3');
let codeblast_screen2 = document.querySelector('.container2222');
let community_screen=document.querySelector('.container900');
let roadmap_screen=document.querySelector('.containerForRoadmap');
let roadmap_topic_screen=document.querySelector('.containerForPowerStone');
let roadmap_contest_screen=document.querySelector('.containerForContest');

function show_screen(some_screen) {
	dashboard_screen.classList.add('hidden');
	index_screen.classList.add('hidden');
	topic_wise_screen.classList.add('hidden');
	topic_wise_screen2.classList.add('hidden');
	level_wise_screen.classList.add('hidden');
	sorting_screen.classList.add('hidden');
	grid_screen.classList.add('hidden');
	compare_screen.classList.add('hidden');
	compare_screen2.classList.add('hidden');
	profile_screen.classList.add('hidden');
	codeblast_screen.classList.add('hidden');
	codeblast_screen2.classList.add('hidden');
	community_screen.classList.add('hidden');
	roadmap_screen.classList.add('hidden');
	roadmap_topic_screen.classList.add('hidden');
	roadmap_contest_screen.classList.add('hidden');


	document.querySelector('.loader12345').classList.remove("hidden")
	document.querySelector('.loader12345').classList.remove("disapper");

	setTimeout(()=>{
		document.querySelector('.loader12345').classList.add("disapper");
		some_screen.classList.remove('hidden');
	},600);
}
