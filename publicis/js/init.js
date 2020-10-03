// screens
let dashboard_screen = document.querySelector('.container1');
let topic_wise_screen = document.querySelector('.container4');
let topic_wise_screen2 = document.querySelector('.container824');
let level_wise_screen = document.querySelectorAll('.container4')[1];
let sorting_screen = document.querySelector('.container555');
let grid_screen = document.querySelector('.container5666');
let compare_screen = document.querySelector('.container7');
let compare_screen2 = document.querySelector('.container111');
let profile_screen = document.querySelector('.container1forprofile');
let codeblast_screen = document.querySelector('.container3');
let codeblast_screen2 = document.querySelector('.container2222');

function show_screen(some_screen) {
	dashboard_screen.classList.add('hidden');
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

	some_screen.classList.remove('hidden');
}
