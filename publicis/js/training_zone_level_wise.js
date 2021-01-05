
function level_wise(handle_name) {
	show_screen(level_wise_screen);
	document.querySelector('.l1').addEventListener('click', retreivel1);
	document.querySelector('.l2').addEventListener('click', retreivel2);
	document.querySelector('.l3').addEventListener('click', retreivel3);
	document
		.querySelector('.update22')
		.addEventListener('click', update_problems);
	document.querySelector('.add').addEventListener('click', add_problems);

	const url2 = 'https://codeforces.com/api/user.status?handle=';

	let solved = new Set();
	async function getSolved() {
		let modified_url = url2 + handle_name;
		const jsondata = await fetch(modified_url);
		const jsdata = await jsondata.json();

		let unsolved = new Set();

		unsolved.clear();
		solved.clear();

		// for retreiving solved set
		for (let i = 0; i < jsdata.result.length; i++) {
			if (jsdata.result[i].verdict == 'OK') {
				let str =
					jsdata.result[i].problem.contestId +
					'-' +
					jsdata.result[i].problem.index;
				solved.add(str);
			}
		}
	}
	getSolved();
	let problemskilist = new Set();

	function fetch_problems(problems, problems_stats, low, high, minSolveCount) {
		document.querySelector('.update22').classList.remove('hidden');
		document.querySelector('.add').classList.remove('hidden');
		let problem_list = [];
		let j = 3;
		for (let i = 0; i < problems.length; i++) {
			if (
				problems[i].rating >= low &&
				problems[i].rating <= high && problems_stats[i].solvedCount>=minSolveCount &&
				solved.has(`${problems[i].contestId + '-' + problems[i].index}`) ==
					false &&
				problemskilist.has(
					`${problems[i].contestId + '-' + problems[i].index}`
				) == false
			) {
				problem_list.push(problems[i]);
				problemskilist.add(
					`${problems[i].contestId + '-' + problems[i].index}`
				);
				
				///print
				console.log(problems[i].contestId, problems_stats[i].solvedCount);
				j--;
				if (j == -1) {
					break;
				}
			}
		}

		document.querySelector('.haha').classList.add('hidden');
		return problem_list;
	}

	//console.log(handle_name);
	let problems = [];
	let checked = true;
	let checked2 = true;
	let checked3=true;

	//here
	async function retreivel1() {
		animations();
		document.querySelector('.problemkilist').classList.add('lev1');
		document.querySelector('.problemkilist').classList.remove('hidden');

		if (checked == true) {
			if (confirm('Do You want to start a timer?')) {
				var two_hours = 2 * 60 * 60,
					display = document.querySelector('.timer2');
				startTimer(two_hours, display);
			}
			checked = false;
		}

		let modified_url = 'https://codeforces.com/api/problemset.problems';
		const jsondata = await fetch(modified_url);
		const jsdata = await jsondata.json();
		problems = jsdata.result.problems;
		problems_stats = jsdata.result.problemStatistics;

		problems = fetch_problems(problems, problems_stats, 800, 1400, 5000);
		///print
		console.log(problems);
		for (let i = 0; i < problems.length; i++) {
			let div = document.createElement('div');
			div.classList.add('problemhye');
			div.innerHTML = `<span>${
				problems[i].name
			}</span><a href="${convert_to_link(
				problems[i].contestId + '-' + problems[i].index
			)}" target="_blank">Let's Do It</a><span>${problems[i].rating}</span>`;

			document.querySelector('.problemkilist').appendChild(div);
		}
	}

	async function retreivel2() {
		animations();
		if (checked2 == true) {
			if (confirm('Do You want to start a timer?')) {
				var two_hours = 2 * 60 * 60,
					display = document.querySelector('.timer2');
				startTimer(two_hours, display);
			}
			checked2 = false;
		}
		document.querySelector('.problemkilist').classList.add('lev2');
		let modified_url = 'https://codeforces.com/api/problemset.problems';
		const jsondata = await fetch(modified_url);
		const jsdata = await jsondata.json();
		problems = jsdata.result.problems;
		problems_stats = jsdata.result.problemStatistics;

		problems = fetch_problems(problems, problems_stats, 1200, 1900, 3000);

		console.log(problems);
		for (let i = 0; i < problems.length; i++) {
			let div = document.createElement('div');
			div.classList.add('problemhye');
			div.innerHTML = `<span>${
				problems[i].name
			}</span><a href="${convert_to_link(
				`${problems[i].contestId}-${problems[i].index}`
			)}" target="_blank">Let's Do It</a><span>${problems[i].rating}</span>`;

			document.querySelector('.problemkilist').appendChild(div);
		}
	}

	async function retreivel3() {
		animations();
		document.querySelector('.problemkilist').classList.add('lev3');
		if (checked3 == true) {
			if (confirm('Do You want to start a timer?')) {
				var two_hours = 2 * 60 * 60,
					display = document.querySelector('.timer2');
				startTimer(two_hours, display);
			}
			checked3 = false;
		}

		let modified_url = 'https://codeforces.com/api/problemset.problems';
		const jsondata = await fetch(modified_url);
		const jsdata = await jsondata.json();
		problems = jsdata.result.problems;
		problems_stats = jsdata.result.problemStatistics;

		problems = fetch_problems(problems, problems_stats, 1700, 3000, 1000);
		console.log(problems);

		for (let i = 0; i < problems.length; i++) {
			let div = document.createElement('div');
			div.classList.add('problemhye');
			div.innerHTML = `<span>${
				problems[i].name
			}</span><a href="${convert_to_link(
				problems[i].contestId + '-' + problems[i].index
			)}" target="_blank">Let's Do It</a><span>${problems[i].rating}</span>`;

			document.querySelector('.problemkilist').appendChild(div);
		}
	}

	function animations() {
		document.querySelector('.l1').classList.add('animated');
		document.querySelector('.l2').classList.add('animated');
		document.querySelector('.l3').classList.add('animated');

		document.querySelector('.l1').classList.add('bounceOutRight');
		document.querySelector('.l2').classList.add('bounceOutUp');
		document.querySelector('.l3').classList.add('bounceOutLeft');

		document.querySelector('.problemkilist').classList.remove('hidden');
	}

	function convert_to_link(str) {
		let p = '';
		let q = '';
		for (let i = 0; i < str.length; i++) {
			if (str[i] === '-') {
				for (let j = i + 1; j < str.length; j++) {
					q += str[j];
				}
				break;
			}
			p += str[i];
		}
		let link = `https://codeforces.com/problemset/problem/${p}/${q}`;
		return link;
	}
	function startTimer(duration, display) {
		var timer = duration,
			minutes,
			seconds;
		let x = setInterval(function () {
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;

			display.textContent = minutes + ':' + seconds;

			if (--timer < 0) {
				timer = duration;
			}
			if (display.textContent === '00:00') {
				notifyMe();
				clearInterval(x);
			}
		}, 1000);
	}
	let height = 100;
	function add_problems() {
		let l1 = document.querySelector('.problemkilist');
		document.querySelector('.container4').style.height = `${height + 100}vh`;
		document.querySelector('.container277').style.height = `${height + 100}vh`;
		height += 50;
		if (l1.classList.contains('lev3')) {
			retreivel3();
		}
		if (l1.classList.contains('lev1')) {
			retreivel1();
		}
		if (l1.classList.contains('lev2')) {
			retreivel2();
		}
	}
	async function update_problems() {
		let modified_url = url2 + handle_name;
		const jsondata = await fetch(modified_url);
		const jsdata = await jsondata.json();

		let unsolved = new Set();

		unsolved.clear();
		solved.clear();

		// for retreiving solved set
		for (let i = 0; i < jsdata.result.length; i++) {
			if (jsdata.result[i].verdict == 'OK') {
				let str =
					jsdata.result[i].problem.contestId +
					'-' +
					jsdata.result[i].problem.index;
				solved.add(str);
			}
		}
		let jai_shree_ram = document.querySelectorAll('.problemhye');
		let jai_hanuman = document.querySelectorAll('.problemkilist');
		//console.log(jai_hanuman);
		for (let i = 0; i < jai_shree_ram.length; i++) {
			let link = jai_shree_ram[i].children[1].href;
			let contestId = '';
			let index = '';
			let j = 0;
			for (let i = 0; i < link.length; i++) {
				if (link[i] > '9' || link[i] < '0') {
					j++;
				} else {
					break;
				}
			}
			for (let i = j; i < link.length; i++) {
				if (link[i] != '/') {
					contestId += link[i];
					j++;
				} else {
					break;
				}
			}
			j++;

			for (let i = j; i < link.length; i++) {
				if (link[i] != '/') {
					index += link[i];
					j++;
				} else {
					break;
				}
			}
			let str = contestId + '-' + index;
			if (solved.has(str)) {
				//console.log(jai_hanuman);
				jai_hanuman.removeChild(jai_hanuman.children[i]);
			}
		}
	}
}
