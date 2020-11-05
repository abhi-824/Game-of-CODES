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
	async function getposts_Abhinandan_Sharma() {
		const jsondata = await fetch(
			'https://www.googleapis.com/blogger/v3/blogs/1623665726032043112/posts?key=AIzaSyDdE6xJ0Zq8nWVNZgxR3gpQtGL7t6GF3SI'
		);
		const jsdata = await jsondata.json();
		let posts = jsdata.items;

		console.log(jsdata);
		let map_topics = new Map();
		let map_comments = new Map();
		for (let i = 0; i < posts.length; i++) {
			map_topics.set(posts[i].title, posts[i].content);
			map_comments.set(
				posts[i].title,
				`${posts[i].replies.selfLink}?key=AIzaSyDdE6xJ0Zq8nWVNZgxR3gpQtGL7t6GF3SI`
			);
		}
		let curr_topic_list = document.querySelectorAll('.syl_list_li');
		document.querySelector('.blog').innerHTML = map_topics.get(
			curr_topic_list[0].innerHTML.toString()
		);
		for (let i = 0; i < curr_topic_list.length; i++) {
			curr_topic_list[i].addEventListener('click', (e) => {
				document.querySelector('.blog').innerHTML = map_topics.get(
					curr_topic_list[i].innerHTML.toString()
				);
				e.preventDefault();
				document
					.querySelector('.start_contest_roadmap')
					.addEventListener('click', (e) => {
						e.preventDefault();
						let topic = curr_topic_list[i].innerHTML.toString();

						let link = map_comments.get(
							curr_topic_list[i].innerHTML.toString()
						);
						inContest(topic, link);
					});
			});
		}
	}
	getposts_Abhinandan_Sharma();
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
	document.querySelector('.syl_list').innerHTML = `
	<li class="syl_list_li">Intro to DS and Algo</li>
	<li class="syl_list_li">Time Complexity</li>
	<li class="syl_list_li">Arrays and Strings</li>`;
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
	document.querySelector('.syl_list').innerHTML = `
	<li class="syl_list_li">Greedy Algorithm</li>
	<li class="syl_list_li">Recursion</li>
	<li class="syl_list_li">Number theory</li>`;
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

	document.querySelector('.syl_list').innerHTML = `
	<li class="syl_list_li">Every Concept Afterwards</li>
	<li class="syl_list_li">Revision</li>
	<li class="syl_list_li">Final Fight</li>`;
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

	document.querySelector('.syl_list').innerHTML = `
	<li class="syl_list_li">DP</li>
	<li class="syl_list_li">Segment Trees</li>
	<li class="syl_list_li">Fenwick Trees</li>`;
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

	document.querySelector('.syl_list').innerHTML = `
	<li class="syl_list_li">Bit manipulation</li>
	<li class="syl_list_li">Graphs</li>
	<li class="syl_list_li">Revision</li>`;
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
	document.querySelector('.syl_list').innerHTML = `
	<li class="syl_list_li">Tree</li>
	<li class="syl_list_li">Stacks</li>
	<li class="syl_list_li">Queues</li>`;
	document.querySelector('.image_sm').classList.add('reality');
}
function expand_bar() {
	document.querySelector('.sideBar').classList.add('expand_bar');
	document.querySelector('.sideBar').classList.remove('collapse_bar');
	document.querySelector('.syllabus').classList.remove('hidden');
	document.querySelector('.collapse_sidebar');
	document.querySelector('.blog').style = 'margin-left:18vw;';
	// init_kro();
}
function collapse_bar() {
	document.querySelector('.sideBar').classList.remove('expand_bar');
	document.querySelector('.sideBar').classList.add('collapse_bar');
	document.querySelector('.syllabus').classList.add('hidden');
	document.querySelector('.collapse_sidebar');
	document.querySelector('.blog').style = 'margin-left:100px;';
}

function inContest(topic, link) {
	console.log(link);
	console.log(topic);
	show_screen(roadmap_contest_screen);
	async function getQuestions_Abhinandan_Sharma() {
		const jsondata = await fetch(link);
		const jsdata = await jsondata.json();
		let questions_links=[];
		let comments=jsdata.items;
		for(let i=0;i<5;i++)
		{
			questions_links.push(comments[i].content);
		}
		document.querySelector(".badhiya_btn").addEventListener("click",(e)=>{
			e.preventDefault();
			document.querySelector(".msg").remove();
			document.querySelector(".container_questions").classList.remove("hidden");
			let links=document.querySelectorAll(".contest_question_link");
			for(let i=0;i<links.length;i++)
			{
				
				links[i].innerHTML=`<a href="${questions_links[i]}" target="_blank">Let's Go</a>`;
			}
			startTimer(120*60,document.querySelector(".timer_for_contest"));
		})
	}
	function startTimer(duration, display) {
		var timer = duration,
			minutes,
			seconds;
		setInterval(function () {
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;

			display.textContent = minutes + ':' + seconds;

			if (--timer < 0) {
				timer = duration;
			}
		}, 1000);
	}
	getQuestions_Abhinandan_Sharma();
}
