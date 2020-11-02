function roadmap_topic(i) {
	init_kro(i);
	show_screen(roadmap_topic_screen);
	let coll = 0;
	document.querySelector('.collapse_sidebar').addEventListener('click', (e) => {
		if (coll == 0) {
			collapse_bar();
			coll = 1;
		} else {
			expand_bar();
			coll = 0;
		}
	});
	// document.querySelector(".intro_msg").innerHTML=``;
	let next = document.querySelector('.Next');
	let intro = document.querySelector('.centerWidgets');
	let main_sec = document.querySelector('.main-section');
	next.addEventListener('click', (e) => {
		e.preventDefault();

		intro.classList.add('hidden');
		main_sec.classList.remove('hidden');
	});
	let editor;

	ClassicEditor.create(document.querySelector('#editor_info'))
		.then((newEditor) => {
			editor = newEditor;
		})
		.catch((error) => {
			console.error(error);
		});
	let submit = document
		.querySelector('.submit')
		.addEventListener('click', (e) => {
			e.preventDefault();
			const editorData = editor.getData();
			console.log(editorData);
		});
}
function init_kro(i) {
	if (i == 0) {
		power();
	}
	if (i == 1) {
		space();
	}

	if (i == 2) {
		reality();
	}

	if (i == 3) {
		soul();
	}

	if (i == 4) {
		time();
	}
	if (i == 5) {
		mind();
	}
}
function power() {
	document.querySelector('.intro_msg').innerHTML =
		'As the name suggests, it gives you power, power to code your logic. In this we will primarily focus on implementation and some tricky questions. After you equip it, hopefully you will be able to do atleast the first two questions on codeforces in an hour or even less!(which means an average rating of 1300-1400).';
	// document.querySelector(".cardForStone").classList.add("power");
	document.querySelector('.changekrnah').innerHTML = `<img
    src="resources/stones/power.png"
    class="rotate image_under_card"
    alt=""
 />`;
	document.querySelector('.cardForStone').classList.add('power_shadow');
	document.querySelector('.sideBar').classList.add('power_shadow');
	document.querySelector('.image_under_card').classList.add('power');
	document.querySelector('.stone_title').innerHTML = 'Power Stone';
	document.querySelector('.image_inside_bar').innerHTML = `<img
	src="resources/stones/power.png"
	class="rotate image_sm"
	alt=""
	/>`;
	document.querySelector('.image_sm').classList.add('power');
}
function space() {
	document.querySelector('.intro_msg').innerHTML =
		'This stone gives you the ability to think logic and questions which appear to be impossible at first shot. Recursion will drive you crazy but once equipped, you would have a very easy way forwards.';
	document.querySelector('.changekrnah').innerHTML = `<img
        src="resources/stones/space.png"
        class="rotate image_under_card"
        alt=""
     />`;
	document.querySelector('.cardForStone').classList.add('space_shadow');
	document.querySelector('.image_under_card').classList.add('space');
	document.querySelector('.sideBar').classList.add('space_shadow');
	document.querySelector('.image_inside_bar').innerHTML = `<img
	src="resources/stones/space.png"
	class="rotate image_sm"
	alt=""
	/>`;
	document.querySelector('.image_sm').classList.add('space');
	document.querySelector('.stone_title').innerHTML = 'Space Stone';
}
function mind() {
	document.querySelector('.intro_msg').innerHTML =
		'This will make you genius and the hereby complete your whole quest. You would be knowing each and every topic after acquiring it. ';
	document.querySelector('.changekrnah').innerHTML = `<img
    src="resources/stones/mind.png"
    class="rotate image_under_card"
    alt=""
 />`;
	document.querySelector('.cardForStone').classList.add('mind_shadow');
	document.querySelector('.image_under_card').classList.add('mind');
	document.querySelector('.sideBar').classList.add('mind_shadow');
	document.querySelector('.stone_title').innerHTML = 'Mind Stone';
	document.querySelector('.image_inside_bar').innerHTML = `<img
	src="resources/stones/mind.png"
	class="rotate image_sm"
	alt=""
	/>`;
	document.querySelector('.image_sm').classList.add('mind');
}
function time() {
	document.querySelector('.intro_msg').innerHTML =
		'Perhaps its name says it all! You would have the power to control the f calculations.';
	document.querySelector('.changekrnah').innerHTML = `<img
        src="resources/stones/time.png"
        class="rotate image_under_card"
        alt=""
     />`;
	document.querySelector('.cardForStone').classList.add('time_shadow');
	document.querySelector('.image_under_card').classList.add('time');
	document.querySelector('.sideBar').classList.add('time_shadow');
	document.querySelector('.stone_title').innerHTML = 'Time Stone';
	document.querySelector('.image_inside_bar').innerHTML = `<img
	src="resources/stones/time.png"
	class="rotate image_sm"
	alt=""
	/>`;
	document.querySelector('.image_sm').classList.add('time');
}
function soul() {
	document.querySelector('.intro_msg').innerHTML =
		'This stone is perhaps the soul of the competitieve programming. You will be introduced to the most precious and awaited data structure: Graphs. These require immense struggle and self sacrifice for earning this one.';
	document.querySelector('.changekrnah').innerHTML = `<img
        src="resources/stones/soul.png"
        class="rotate image_under_card"
        alt=""
     />`;
	document.querySelector('.cardForStone').classList.add('soul_shadow');
	document.querySelector('.image_under_card').classList.add('soul');
	document.querySelector('.sideBar').classList.add('soul_shadow');
	document.querySelector('.stone_title').innerHTML = 'Soul Stone';
	document.querySelector('.image_inside_bar').innerHTML = `<img
	src="resources/stones/soul.png"
	class="rotate image_sm"
	alt=""
	/>`;
	document.querySelector('.image_sm').classList.add('soul');
}
function reality() {
	document.querySelector('.intro_msg').innerHTML =
		'This would perhaps be the most easy yet difficult stone to equip. Although stacks, trees and queues are easy to implement, their questions are really difficult to think of..';
	document.querySelector('.changekrnah').innerHTML = `<img
        src="resources/stones/reality.png"
        class="rotate image_under_card"
        alt=""
     />`;
	document.querySelector('.cardForStone').classList.add('reality_shadow');
	document.querySelector('.image_under_card').classList.add('reality');
	document.querySelector('.sideBar').classList.add('reality_shadow');
	document.querySelector('.stone_title').innerHTML = 'Reality Stone';
	document.querySelector('.image_inside_bar').innerHTML = `<img
	src="resources/stones/reality.png"
	class="rotate image_sm"
	alt=""
	/>`;
	document.querySelector('.image_sm').classList.add('reality');
}
function expand_bar() {
	document.querySelector('.sideBar').classList.add('expand_bar');
	document.querySelector('.sideBar').classList.remove('collapse_bar');
	document.querySelector('.collapse_sidebar');
	document.querySelector(".blog").style="margin-left:18vw;"
	init_kro()
}
function collapse_bar() {
	document.querySelector('.sideBar').classList.remove('expand_bar');
	document.querySelector('.sideBar').classList.add('collapse_bar');
	document.querySelector('.syllabus').innerHTML = '';
	document.querySelector('.collapse_sidebar');
	document.querySelector(".blog").style="margin-left:100px;"
}
