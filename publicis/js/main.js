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
		document.querySelector(
			'.curr_content'
		).innerHTML = ` <h2>Selection Sort</h2><div>Selection sort is simple: find minimum element in the array and swap it with the current pointer. Quite intuitive!&nbsp;</div><div>Time Complexity: O(n^2) (Best ,worst and average)</div><div><br /></div><div><!--HTML generated using hilite.me--><div style="background: rgb(255, 255, 255); border-color: gray; border-image: initial; border-style: solid; border-width: 0.1em 0.1em 0.1em 0.8em; border: solid gray; overflow: auto; padding: 0.2em 0.6em; width: auto;"><pre style="line-height: 125%; margin: 0px;"><span style="color: #333399; font-weight: bold;">int</span> i, j, min_idx;  
  
		<span style="color: #888888;">// One by one move boundary of unsorted subarray  </span>
		<span style="color: #008800; font-weight: bold;">for</span> (i <span style="color: #333333;">=</span> <span style="color: #0000dd; font-weight: bold;">0</span>; i <span style="color: #333333;">&lt;</span> n<span style="color: #333333;">-</span><span style="color: #0000dd; font-weight: bold;">1</span>; i<span style="color: #333333;">++</span>)  
		{  
			<span style="color: #888888;">// Find the minimum element in unsorted array  </span>
			min_idx <span style="color: #333333;">=</span> i;  
			<span style="color: #008800; font-weight: bold;">for</span> (j <span style="color: #333333;">=</span> i<span style="color: #333333;">+</span><span style="color: #0000dd; font-weight: bold;">1</span>; j <span style="color: #333333;">&lt;</span> n; j<span style="color: #333333;">++</span>)  
			<span style="color: #008800; font-weight: bold;">if</span> (arr[j] <span style="color: #333333;">&lt;</span> arr[min_idx])  
				min_idx <span style="color: #333333;">=</span> j;  
	  
			<span style="color: #888888;">// Swap the found minimum element with the first element  </span>
			swap(<span style="color: #333333;">&amp;</span>arr[min_idx], <span style="color: #333333;">&amp;</span>arr[i]);  
		}  
	</pre></div>`
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
		document.querySelector(
			'.curr_content'
		).innerHTML = `<h2 style="text-align: left;">Merge Sort</h2><div>It is a recursive sorting algorithm and its principle is based on DIVIDE AND CONQUER. Just divide the array into two parts and make both arrays sorted(by the same technique of dividing elements) and then merge them. w till dividing everything is fine but what happens on merging?&nbsp; Simple, we merge them comparing the corresponding elements one by one. Time complexity: dividing takes log n time and merging them takes n. So total=O(nlogn) in all three cases(best,worst,average)</div><div><br /></div><div><br /></div>
		<!--HTML generated using hilite.me--><div style="background: rgb(255, 255, 255); border-color: gray; border-image: initial; border-style: solid; border-width: 0.1em 0.1em 0.1em 0.8em; border: solid gray; overflow: auto; padding: 0.2em 0.6em; width: auto;"><pre style="line-height: 125%; margin: 0px; text-align: left;"><span style="color: #333399; font-weight: bold;">void</span> <span style="color: #0066bb; font-weight: bold;">merge</span>(<span style="color: #333399; font-weight: bold;">int</span> arr[], <span style="color: #333399; font-weight: bold;">int</span> l, <span style="color: #333399; font-weight: bold;">int</span> m, <span style="color: #333399; font-weight: bold;">int</span> r)
	  {
		  <span style="color: #333399; font-weight: bold;">int</span> n1 <span style="color: #333333;">=</span> m <span style="color: #333333;">-</span> l <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>;
		  <span style="color: #333399; font-weight: bold;">int</span> n2 <span style="color: #333333;">=</span> r <span style="color: #333333;">-</span> m;
	   
		  <span style="color: #888888;">// Create temp arrays</span>
		  <span style="color: #333399; font-weight: bold;">int</span> L[n1], R[n2];
	   
		  <span style="color: #888888;">// Copy data to temp arrays L[] and R[]</span>
		  <span style="color: #008800; font-weight: bold;">for</span> (<span style="color: #333399; font-weight: bold;">int</span> i <span style="color: #333333;">=</span> <span style="color: #0000dd; font-weight: bold;">0</span>; i <span style="color: #333333;">&lt;</span> n1; i<span style="color: #333333;">++</span>)
			  L[i] <span style="color: #333333;">=</span> arr[l <span style="color: #333333;">+</span> i];
		  <span style="color: #008800; font-weight: bold;">for</span> (<span style="color: #333399; font-weight: bold;">int</span> j <span style="color: #333333;">=</span> <span style="color: #0000dd; font-weight: bold;">0</span>; j <span style="color: #333333;">&lt;</span> n2; j<span style="color: #333333;">++</span>)
			  R[j] <span style="color: #333333;">=</span> arr[m <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span> <span style="color: #333333;">+</span> j];
	   
		  <span style="color: #888888;">// Merge the temp arrays back into arr[l..r]</span>
	   
		  <span style="color: #888888;">// Initial index of first subarray</span>
		  <span style="color: #333399; font-weight: bold;">int</span> i <span style="color: #333333;">=</span> <span style="color: #0000dd; font-weight: bold;">0</span>;
	   
		  <span style="color: #888888;">// Initial index of second subarray</span>
		  <span style="color: #333399; font-weight: bold;">int</span> j <span style="color: #333333;">=</span> <span style="color: #0000dd; font-weight: bold;">0</span>;
	   
		  <span style="color: #888888;">// Initial index of merged subarray</span>
		  <span style="color: #333399; font-weight: bold;">int</span> k <span style="color: #333333;">=</span> l;
	   
		  <span style="color: #008800; font-weight: bold;">while</span> (i <span style="color: #333333;">&lt;</span> n1 <span style="color: #333333;">&amp;&amp;</span> j <span style="color: #333333;">&lt;</span> n2) {
			  <span style="color: #008800; font-weight: bold;">if</span> (L[i] <span style="color: #333333;">&lt;=</span> R[j]) {
				  arr[k] <span style="color: #333333;">=</span> L[i];
				  i<span style="color: #333333;">++</span>;
			  }
			  <span style="color: #008800; font-weight: bold;">else</span> {
				  arr[k] <span style="color: #333333;">=</span> R[j];
				  j<span style="color: #333333;">++</span>;
			  }
			  k<span style="color: #333333;">++</span>;
		  }
	   
		  <span style="color: #888888;">// Copy the remaining elements of</span>
		  <span style="color: #888888;">// L[], if there are any</span>
		  <span style="color: #008800; font-weight: bold;">while</span> (i <span style="color: #333333;">&lt;</span> n1) {
			  arr[k] <span style="color: #333333;">=</span> L[i];
			  i<span style="color: #333333;">++</span>;
			  k<span style="color: #333333;">++</span>;
		  }
	   
		  <span style="color: #888888;">// Copy the remaining elements of</span>
		  <span style="color: #888888;">// R[], if there are any</span>
		  <span style="color: #008800; font-weight: bold;">while</span> (j <span style="color: #333333;">&lt;</span> n2) {
			  arr[k] <span style="color: #333333;">=</span> R[j];
			  j<span style="color: #333333;">++</span>;
			  k<span style="color: #333333;">++</span>;
		  }
	  }
	   
	  <span style="color: #888888;">// l is for left index and r is</span>
	  <span style="color: #888888;">// right index of the sub-array</span>
	  <span style="color: #888888;">// of arr to be sorted */</span>
	  <span style="color: #333399; font-weight: bold;">void</span> <span style="color: #0066bb; font-weight: bold;">mergeSort</span>(<span style="color: #333399; font-weight: bold;">int</span> arr[], <span style="color: #333399; font-weight: bold;">int</span> l, <span style="color: #333399; font-weight: bold;">int</span> r)
	  {
		  <span style="color: #008800; font-weight: bold;">if</span> (l <span style="color: #333333;">&lt;</span> r) {
	   
			  <span style="color: #888888;">// Same as (l+r)/2, but avoids</span>
			  <span style="color: #888888;">// overflow for large l and h</span>
			  <span style="color: #333399; font-weight: bold;">int</span> m <span style="color: #333333;">=</span> (l <span style="color: #333333;">+</span> r <span style="color: #333333;">-</span> l) <span style="color: #333333;">/</span> <span style="color: #0000dd; font-weight: bold;">2</span>;
	   
			  <span style="color: #888888;">// Sort first and second halves</span>
			  mergeSort(arr, l, m);
			  mergeSort(arr, m <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>, r);
	   
			  merge(arr, l, m, r);
		  }
	  }
	  </pre></div>`
		
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
		document.querySelector(
			'.curr_content'
		).innerHTML = `
		<h2>Quick Sort</h2><div>Another sorting algo based on DIVIDE AND CONQUEUER which is quite confusing at first. The crux is that fix a pivot, and swapping elements based on comparison with pivot. Now the algoritm actually is not that straight forward and you would simply get lost in visualization but if you see the code you may understand more easily.</div><div>The&nbsp;</div><!--HTML generated using hilite.me--><div style="background: rgb(255, 255, 255); border-color: gray; border-image: initial; border-style: solid; border-width: 0.1em 0.1em 0.1em 0.8em; border: solid gray; overflow: auto; padding: 0.2em 0.6em; width: auto;"><pre style="line-height: 125%; margin: 0px;"><span style="color: #333399; font-weight: bold;">int</span> <span style="color: #0066bb; font-weight: bold;">partition</span> (<span style="color: #333399; font-weight: bold;">int</span> arr[], <span style="color: #333399; font-weight: bold;">int</span> low, <span style="color: #333399; font-weight: bold;">int</span> high)  
		{  
			<span style="color: #333399; font-weight: bold;">int</span> pivot <span style="color: #333333;">=</span> arr[high]; <span style="color: #888888;">// pivot  </span>
			<span style="color: #333399; font-weight: bold;">int</span> i <span style="color: #333333;">=</span> (low <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>); <span style="color: #888888;">// Index of smaller element  </span>
		  
			<span style="color: #008800; font-weight: bold;">for</span> (<span style="color: #333399; font-weight: bold;">int</span> j <span style="color: #333333;">=</span> low; j <span style="color: #333333;">&lt;=</span> high <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>; j<span style="color: #333333;">++</span>)  
			{  
				<span style="color: #888888;">// If current element is smaller than the pivot  </span>
				<span style="color: #008800; font-weight: bold;">if</span> (arr[j] <span style="color: #333333;">&lt;</span> pivot)  
				{  
					i<span style="color: #333333;">++</span>; <span style="color: #888888;">// increment index of smaller element  </span>
					swap(<span style="color: #333333;">&amp;</span>arr[i], <span style="color: #333333;">&amp;</span>arr[j]);  
				}  
			}  
			swap(<span style="color: #333333;">&amp;</span>arr[i <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>], <span style="color: #333333;">&amp;</span>arr[high]);  
			<span style="color: #008800; font-weight: bold;">return</span> (i <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>);  
		}  
		  
		<span style="color: #888888;">/* The main function that implements QuickSort  </span>
		<span style="color: #888888;">arr[] --&gt; Array to be sorted,  </span>
		<span style="color: #888888;">low --&gt; Starting index,  </span>
		<span style="color: #888888;">high --&gt; Ending index */</span>
		<span style="color: #333399; font-weight: bold;">void</span> <span style="color: #0066bb; font-weight: bold;">quickSort</span>(<span style="color: #333399; font-weight: bold;">int</span> arr[], <span style="color: #333399; font-weight: bold;">int</span> low, <span style="color: #333399; font-weight: bold;">int</span> high)  
		{  
			<span style="color: #008800; font-weight: bold;">if</span> (low <span style="color: #333333;">&lt;</span> high)  
			{  
				<span style="color: #888888;">/* pi is partitioning index, arr[p] is now  </span>
		<span style="color: #888888;">        at right place */</span>
				<span style="color: #333399; font-weight: bold;">int</span> pi <span style="color: #333333;">=</span> partition(arr, low, high);  
		  
				<span style="color: #888888;">// Separately sort elements before  </span>
				<span style="color: #888888;">// partition and after partition  </span>
				quickSort(arr, low, pi <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>);  
				quickSort(arr, pi <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>, high);  
			}  
		}  
		</pre></div>`
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
		document.querySelector(
			'.curr_content'
		).innerHTML = `<h2 style="text-align: left;">&nbsp;Bubble Sort</h2><p>This is the most simple sorting algorithm. Just swap adjacent elements until the array is sorted. Like we have to traverse whole array n-2 times and in each traversal we have just this condition: check if the the left node is greater than right. If yes, just swap them. Time Complexity(Average, worst, best)= O(n^2)</p><p>code(in C++):</p><div style="background: rgb(255, 255, 255); border-color: gray; border-image: initial; border-style: solid; border-width: 0.1em 0.1em 0.1em 0.8em; border: solid gray; overflow: auto; padding: 0.2em 0.6em; width: auto;"><pre style="line-height: 125%; margin: 0px;"><span style="color: #008800; font-weight: bold;">for</span> (i <span style="color: #333333;">=</span> <span style="color: #0000dd; font-weight: bold;">0</span>; i <span style="color: #333333;">&lt;</span> n<span style="color: #333333;">-</span><span style="color: #0000dd; font-weight: bold;">1</span>; i<span style="color: #333333;">++</span>)      
      
		<span style="color: #888888;">// Last i elements are already in place  </span>
		<span style="color: #008800; font-weight: bold;">for</span> (j <span style="color: #333333;">=</span> <span style="color: #0000dd; font-weight: bold;">0</span>; j <span style="color: #333333;">&lt;</span> n<span style="color: #333333;">-</span>i<span style="color: #333333;">-</span><span style="color: #0000dd; font-weight: bold;">1</span>; j<span style="color: #333333;">++</span>)  
			<span style="color: #008800; font-weight: bold;">if</span> (arr[j] <span style="color: #333333;">&gt;</span> arr[j<span style="color: #333333;">+</span><span style="color: #0000dd; font-weight: bold;">1</span>])  
				swap(<span style="color: #333333;">&amp;</span>arr[j], <span style="color: #333333;">&amp;</span>arr[j<span style="color: #333333;">+</span><span style="color: #0000dd; font-weight: bold;">1</span>]);  </pre></div>
	<h2 style="text-align: left;"><br /></h2><h2 style="text-align: left;"><br /></h2>`;
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
		document.querySelector(
			'.curr_content'
		).innerHTML = `<h2 style="text-align: left;">Insertion Sort</h2><div><br /></div><div>Another Simple and intuitive algorithm, yet an efficient one. Its just the way we normally sort as "normal" humans. Suppose we are at some position of array, i, what we do is to take the element at the i<span style="font-size: xx-small;">th </span>card and then swap it with the element it should be to make the array before i position ,sorted.&nbsp;</div><div>Time Complexity:&nbsp;</div><div>O(n^2)(Average and worst)&nbsp;</div><div>O(n)(Best case)(When array is already sorted)</div><div><br /><!--HTML generated using hilite.me--><div style="background: rgb(255, 255, 255); border-color: gray; border-image: initial; border-style: solid; border-width: 0.1em 0.1em 0.1em 0.8em; border: solid gray; overflow: auto; padding: 0.2em 0.6em; width: auto;"><pre style="line-height: 125%; margin: 0px;"><span style="color: #333399; font-weight: bold;">int</span> i, key, j;  
		<span style="color: #008800; font-weight: bold;">for</span> (i <span style="color: #333333;">=</span> <span style="color: #0000dd; font-weight: bold;">1</span>; i <span style="color: #333333;">&lt;</span> n; i<span style="color: #333333;">++</span>) 
		{  
			key <span style="color: #333333;">=</span> arr[i];  
			j <span style="color: #333333;">=</span> i <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>;  
	  
			<span style="color: #888888;">/* Move elements of arr[0..i-1], that are  </span>
	<span style="color: #888888;">        greater than key, to one position ahead  </span>
	<span style="color: #888888;">        of their current position */</span>
			<span style="color: #008800; font-weight: bold;">while</span> (j <span style="color: #333333;">&gt;=</span> <span style="color: #0000dd; font-weight: bold;">0</span> <span style="color: #333333;">&amp;&amp;</span> arr[j] <span style="color: #333333;">&gt;</span> key) 
			{  
				arr[j <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>] <span style="color: #333333;">=</span> arr[j];  
				j <span style="color: #333333;">=</span> j <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>;  
			}  
			arr[j <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>] <span style="color: #333333;">=</span> key;  
		}  
	</pre></div>
	</div>
	<p></p>
	<p></p>`
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
