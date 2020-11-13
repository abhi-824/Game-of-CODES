function sorting_vis() {
	show_screen(sorting_screen);
	const divs = [];
	let div_heights = [];
	let buttons = document.querySelectorAll('.btn-secondary');
	let gen_new_array = document.querySelector('.gen_array');
	let array = document.querySelector('.array');
	let array_size = document.querySelector('#a_size');
	let speed2 = document.querySelector('#a_speed');
	let speed = document.querySelector('#a_speed').value;

	gen_new_array.addEventListener('click', update_array);
	generate_array();
	array_size.addEventListener('input', generate_array);
	function update_array() {
		array_size = document.querySelector('#a_size');
		generate_array();
	}
	speed2.addEventListener('input', function () {
		speed = document.querySelector('#a_speed').value;
	});

	function disable_buttons() {
		let btns1 = document.querySelector('.bubble');
		let btns2 = document.querySelector('.selection');
		let btns3 = document.querySelector('.insertion');
		let btns4 = document.querySelector('.merge');
		let btns5 = document.querySelector('.quick');
		let btns6 = document.querySelector('.gen_array');
		// for(let i=0;i<btns.length;i++)
		// {
		btns1.classList.toggle('hidden');
		btns2.classList.toggle('hidden');
		btns3.classList.toggle('hidden');
		btns4.classList.toggle('hidden');
		btns5.classList.toggle('hidden');
		btns6.classList.toggle('hidden');
		// }
	}
	function generate_array() {
		array.innerHTML = '';
		div_heights = [];
		for (let i = 0; i < array_size.value; i++) {
			div_heights[i] = Math.floor(Math.random() * (300 - 10));
			// console.log(div_heights[i])
			divs[i] = document.createElement('div');
			divs[i].style.height = `${div_heights[i]}px`;
			let width = 700 / array_size.value;
			let marign = 1;
			divs[i].style.width = `${width}px`;
			divs[i].style.margin = `0 ${marign}px `;
			divs[i].style.background = `teal`;
			array.appendChild(divs[i]);
		}
	}
	document.querySelector('.bubble').addEventListener('click', runBubble);
	function runBubble() {
		disable_buttons();
		Bubble();
		window.setTimeout(() => {
			disable_buttons();
		}, c_delay);
	}
	document.querySelector('.selection').addEventListener('click', runBubble2);
	function runBubble2() {
		disable_buttons();
		Selection_sort();
		window.setTimeout(() => {
			disable_buttons();
		}, c_delay);
	}
	document.querySelector('.insertion').addEventListener('click', runBubble3);
	function runBubble3() {
		console.log(div_heights);
		disable_buttons();
		Insertion_sort();
		window.setTimeout(() => {
			disable_buttons();
		}, c_delay);
	}
	document.querySelector('.merge').addEventListener('click', runBubble4);
	function runBubble4() {
		disable_buttons();
		Merge_sort(div_heights);
		console.log(div_heights);
		window.setTimeout(() => {
			disable_buttons();
		}, c_delay);
	}
	document.querySelector('.heap').addEventListener('click', runBubble5);
	function runBubble5() {
		Heap_sort();
	}
	document.querySelector('.quick').addEventListener('click', runBubble6);
	function runBubble6() {
		c_delay = 0;
		disable_buttons();
		Quick_sort(0, array_size.value - 1);
		window.setTimeout(() => {
			disable_buttons();
		}, c_delay);
	}
	var c_delay = 0;

	let delay_time = 9000 / (Math.floor(array_size.value) * speed * 2);
	function update_div(i, height, color) {
		delay_time = 9000 / (Math.floor(array_size.value) * speed * 2);
		window.setTimeout(function () {
			divs[i].style.background = `${color}`;
			divs[i].style.height = `${height}px`;
		}, (c_delay += delay_time));
	}

	function Bubble() {
		c_delay = 0;
		console.log(array_size.value);
		for (let j = 1; j < array_size.value; j++) {
			for (let i = 0; i < array_size.value - j; i++) {
				update_div(i, div_heights[i], 'yellow');
				if (div_heights[i] > div_heights[i + 1]) {
					update_div(i, div_heights[i], 'red');
					update_div(i + 1, div_heights[i + 1], 'red');
					var temp = div_heights[i];
					div_heights[i] = div_heights[i + 1];
					div_heights[i + 1] = temp;

					update_div(i, div_heights[i], 'teal');
					update_div(i + 1, div_heights[i + 1], 'teal');
				}
				update_div(i, div_heights[i], 'teal');
			}
			update_div(j, div_heights[j], 'teal');
		}
	}
	function Heap_sort() {}

	function Insertion_sort() {
		c_delay = 0;

		for (let i = 0; i < array_size.value; i++) {
			let val = div_heights[i];
			let hole = i;
			update_div(i, div_heights[i], 'red');

			while (hole > 0 && div_heights[hole - 1] > val) {
				update_div(hole, div_heights[hole], 'red');
				update_div(hole - 1, div_heights[hole - 1], 'red');
				let temp = div_heights[hole - 1];
				div_heights[hole - 1] = div_heights[hole];
				div_heights[hole] = temp;
				update_div(hole, div_heights[hole], 'teal');
				update_div(hole - 1, div_heights[hole - 1], 'teal');
				hole--;
			}

			div_heights[hole] = val;
			update_div(hole, div_heights[hole], 'teal');
		}
	}
	function Merge_sort() {
		// console.log(a);
		c_delay = 0;
		console.log(div_heights);
		merge_bhai(0, div_heights.length - 1);
	}

	function merge_sort(start, mid, end) {
		let p = start;
		let q = mid + 1;
		let a = [],
			k = 0;
		for (let i = start; i <= end; i++) {
			if (p > mid) {
				a[k++] = div_heights[q++];
				update_div(q - 1, div_heights[q - 1], 'red');
			} else if (q > end) {
				a[k++] = div_heights[p++];
				update_div(p - 1, div_heights[p - 1], 'red');
			} else if (div_heights[p] < div_heights[q]) {
				a[k++] = div_heights[p++];
				update_div(p - 1, div_heights[p - 1], 'red');
			} else {
				a[k++] = div_heights[q++];
				update_div(q - 1, div_heights[q - 1], 'red');
			}
		}
		console.log(a);
		for (let i = 0; i < k; i++) {
			div_heights[start++] = a[i];
			update_div(start - 1, div_heights[start - 1], 'teal');
		}
	}
	function merge_bhai(start, end) {
		if (start < end) {
			let mid = Math.floor((start + end) / 2);
			merge_bhai(start, mid);
			merge_bhai(mid + 1, end);
			merge_sort(start, mid, end);
		}
	}

	function Quick_sort(low, high) {
		if (low < high) {
			let pi = partition(low, high);
			Quick_sort(low, pi - 1);
			Quick_sort(pi + 1, high);
		}
	}
	function partition(low, high) {
		let pivot = div_heights[high];
		// update_div(low,div_heights[low],"yellow");
		let i = low - 1;
		for (let j = low; j <= high - 1; j++) {
			if (div_heights[j] < pivot) {
				i++;
				update_div(i, div_heights[i], 'red');
				update_div(j, div_heights[j], 'red');
				let temp = div_heights[i];
				div_heights[i] = div_heights[j];
				div_heights[j] = temp;
				update_div(i, div_heights[i], 'teal');
				update_div(j, div_heights[j], 'teal');
			}
		}
		let temp = div_heights[i + 1];
		div_heights[i + 1] = div_heights[high];
		div_heights[high] = temp;
		update_div(high, div_heights[high], 'teal');
		update_div(i + 1, div_heights[i + 1], 'teal');
		return i + 1;
	}

	function Selection_sort() {
		c_delay = 0;

		for (let i = 0; i < array_size.value - 1; i++) {
			let minim = i;
			for (let j = i + 1; j < array_size.value; j++) {
				update_div(j, div_heights[j], 'yellow');

				if (div_heights[minim] > div_heights[j]) {
					update_div(j, div_heights[j], 'red');
					update_div(minim, div_heights[minim], 'red');
					let temp = div_heights[minim];
					div_heights[minim] = div_heights[j];
					div_heights[j] = temp;

					update_div(j, div_heights[j], 'teal');
					update_div(minim, div_heights[minim], 'teal');
					// minim=j;
				}
				update_div(j, div_heights[j], 'teal');
			}
			update_div(minim, div_heights[minim], 'teal');
		}
	}
}
