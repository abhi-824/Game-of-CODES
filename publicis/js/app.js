
function grid_vis() {
	show_screen(grid_screen);
	let box_no;
	let box_no2;
	let column_height;
	let column_width;
	let create_grid = document.querySelector('.reset');
	create_grid.addEventListener('click', generate_grid);
	let grid = document.querySelector('#grid');
	let cell;
	generate_grid();
	let x_o;
	let y_o;
	let x_d;
	let y_d;
	let vis = [];
	let c_delay = 0;
	let delay_time = 11;
	let dx = [0, 0, 1, -1];
	let affa = [];
	let dy = [1, -1, 0, 0];
	document.querySelector('.bfs').addEventListener('click', function (e) {
		// console.log(x_d);
		document.querySelectorAll(".curr_title")[1].innerHTML=``;
		// console.log(y_d);
		document.querySelectorAll(".curr_content")[1].innerHTML=`<h2 style="text-align: left;">Breadth First Search(BFS)</h2><div>Breadth first search's principle is quite simple, traverse level by level until we find the destination. Now, in a grid system we can traverse by making a radial expansion having center as the source cell. So you may see such visualization which is quite self explanatory. But how do you implement that?</div><div>Algorithm:</div><div>1. Make a queue and push the source vertex in it.&nbsp;</div><div>2. while(q.length!=0)</div><div><ol><li><span>Pop the element from stack</span></li><li><span>check if any of points</span>&nbsp;(x+1,y), (x,y+1),(x-1,y) and (x,y-1) are destination vertex.</li><li>If yes: return</li><li>If no: push&nbsp;&nbsp;(x+1,y), (x,y+1),(x-1,y) and (x,y-1) into stack.</li></ol></div><div>Code:&nbsp;</div>
		<!--HTML generated using hilite.me--><div style="background: rgb(255, 255, 255); border-color: gray; border-image: initial; border-style: solid; border-width: 0.1em 0.1em 0.1em 0.8em; border: solid gray; overflow: auto; padding: 0.2em 0.6em; width: auto;"><pre style="line-height: 125%; margin: 0px;"><span style="color: #008800; font-weight: bold;">class</span> QItem { 
		<span style="color: #008800; font-weight: bold;">public</span><span style="color: #333333;">:</span> 
			<span style="color: #008800; font-weight: bold;">int</span> row; 
			<span style="color: #008800; font-weight: bold;">int</span> col; 
			<span style="color: #008800; font-weight: bold;">int</span> dist; 
			QItem(<span style="color: #008800; font-weight: bold;">int</span> x, <span style="color: #008800; font-weight: bold;">int</span> y, <span style="color: #008800; font-weight: bold;">int</span> w) 
				<span style="color: #333333;">:</span> row(x), col(y), dist(w) 
			{ 
			} 
		}; 
		  
		<span style="color: #008800; font-weight: bold;">int</span> minDistance(<span style="color: #008800; font-weight: bold;">char</span> grid[N][M]) 
		{ 
			QItem source(<span style="color: #0000dd; font-weight: bold;">0</span>, <span style="color: #0000dd; font-weight: bold;">0</span>, <span style="color: #0000dd; font-weight: bold;">0</span>); 
		  
			<span style="color: #888888;">// To keep track of visited QItems. Marking </span>
			<span style="color: #888888;">// blocked cells as visited. </span>
			bool visited[N][M]; 
			<span style="color: #008800; font-weight: bold;">for</span> (<span style="color: #008800; font-weight: bold;">int</span> i <span style="color: #333333;">=</span> <span style="color: #0000dd; font-weight: bold;">0</span>; i <span style="color: #333333;">&lt;</span> N; i<span style="color: #333333;">++</span>) { 
				<span style="color: #008800; font-weight: bold;">for</span> (<span style="color: #008800; font-weight: bold;">int</span> j <span style="color: #333333;">=</span> <span style="color: #0000dd; font-weight: bold;">0</span>; j <span style="color: #333333;">&lt;</span> M; j<span style="color: #333333;">++</span>) 
				{ 
					<span style="color: #008800; font-weight: bold;">if</span> (grid[i][j] <span style="color: #333333;">==</span> <span style="background-color: #fff0f0;">'0'</span>) 
						visited[i][j] <span style="color: #333333;">=</span> <span style="color: #008800; font-weight: bold;">true</span>; 
					<span style="color: #008800; font-weight: bold;">else</span>
						visited[i][j] <span style="color: #333333;">=</span> <span style="color: #008800; font-weight: bold;">false</span>; 
		  
					<span style="color: #888888;">// Finding source </span>
					<span style="color: #008800; font-weight: bold;">if</span> (grid[i][j] <span style="color: #333333;">==</span> <span style="background-color: #fff0f0;">'s'</span>) 
					{ 
					   source.row <span style="color: #333333;">=</span> i; 
					   source.col <span style="color: #333333;">=</span> j; 
					} 
				} 
			} 
		  
			<span style="color: #888888;">// applying BFS on matrix cells starting from source </span>
			queue<span style="color: #333333;">&lt;</span>QItem<span style="color: #333333;">&gt;</span> q; 
			q.push(source); 
			visited[source.row][source.col] <span style="color: #333333;">=</span> <span style="color: #008800; font-weight: bold;">true</span>; 
			<span style="color: #008800; font-weight: bold;">while</span> (<span style="color: #333333;">!</span>q.empty()) { 
				QItem p <span style="color: #333333;">=</span> q.front(); 
				q.pop(); 
		  
				<span style="color: #888888;">// Destination found; </span>
				<span style="color: #008800; font-weight: bold;">if</span> (grid[p.row][p.col] <span style="color: #333333;">==</span> <span style="background-color: #fff0f0;">'d'</span>) 
					<span style="color: #008800; font-weight: bold;">return</span> p.dist; 
		  
				<span style="color: #888888;">// moving up </span>
				<span style="color: #008800; font-weight: bold;">if</span> (p.row <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span> <span style="color: #333333;">&gt;=</span> <span style="color: #0000dd; font-weight: bold;">0</span> <span style="color: #333333;">&amp;&amp;</span> 
					visited[p.row <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>][p.col] <span style="color: #333333;">==</span> <span style="color: #008800; font-weight: bold;">false</span>) { 
					q.push(QItem(p.row <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>, p.col, p.dist <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>)); 
					visited[p.row <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>][p.col] <span style="color: #333333;">=</span> <span style="color: #008800; font-weight: bold;">true</span>; 
				} 
		  
				<span style="color: #888888;">// moving down </span>
				<span style="color: #008800; font-weight: bold;">if</span> (p.row <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span> <span style="color: #333333;">&lt;</span> N <span style="color: #333333;">&amp;&amp;</span> 
					visited[p.row <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>][p.col] <span style="color: #333333;">==</span> <span style="color: #008800; font-weight: bold;">false</span>) { 
					q.push(QItem(p.row <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>, p.col, p.dist <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>)); 
					visited[p.row <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>][p.col] <span style="color: #333333;">=</span> <span style="color: #008800; font-weight: bold;">true</span>; 
				} 
		  
				<span style="color: #888888;">// moving left </span>
				<span style="color: #008800; font-weight: bold;">if</span> (p.col <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span> <span style="color: #333333;">&gt;=</span> <span style="color: #0000dd; font-weight: bold;">0</span> <span style="color: #333333;">&amp;&amp;</span> 
					visited[p.row][p.col <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>] <span style="color: #333333;">==</span> <span style="color: #008800; font-weight: bold;">false</span>) { 
					q.push(QItem(p.row, p.col <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>, p.dist <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>)); 
					visited[p.row][p.col <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>] <span style="color: #333333;">=</span> <span style="color: #008800; font-weight: bold;">true</span>; 
				} 
		  
				 <span style="color: #888888;">// moving right </span>
				<span style="color: #008800; font-weight: bold;">if</span> (p.col <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span> <span style="color: #333333;">&lt;</span> M <span style="color: #333333;">&amp;&amp;</span> 
					visited[p.row][p.col <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>] <span style="color: #333333;">==</span> <span style="color: #008800; font-weight: bold;">false</span>) { 
					q.push(QItem(p.row, p.col <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>, p.dist <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>)); 
					visited[p.row][p.col <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>] <span style="color: #333333;">=</span> <span style="color: #008800; font-weight: bold;">true</span>; 
				} 
			} 
			<span style="color: #008800; font-weight: bold;">return</span> <span style="color: #333333;">-</span><span style="color: #0000dd; font-weight: bold;">1</span>; 
		} 
		</pre></div>
		`;
		disable_buttons();
		BFS();
		window.setTimeout(() => {
			disable_buttons();
		}, c_delay);
		e.preventDefault();
	});
	document.querySelector('.dfs').addEventListener('click', function (e) {
		x_o = x_origin();
		document.querySelectorAll(".curr_title")[1].innerHTML=``;
		document.querySelectorAll(".curr_content")[1].innerHTML=`<h2>Depth First Search(DFS)</h2><div>Its algo is just opposite of the breadth first search where we traverse level by leve. Here we just reach end by traversing through all levels in one go. We do not reach all nodes of all levels at one go but traverse them many times until all othem are reached.</div><div>Code:</div><div><br /></div><!--HTML generated using hilite.me--><div style="background: rgb(255, 255, 255); border-color: gray; border-image: initial; border-style: solid; border-width: 0.1em 0.1em 0.1em 0.8em; border: solid gray; overflow: auto; padding: 0.2em 0.6em; width: auto;"><pre style="line-height: 125%; margin: 0px;"><span style="color: #008800; font-weight: bold;">function</span> dfs_on_grid(x, y) {	</pre><pre style="line-height: 125%; margin: 0px;"><span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;if(fl)</span><br /></pre><pre style="line-height: 125%; margin: 0px;"><span><span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;return;</span><br /></span></pre><pre style="line-height: 125%; margin: 0px;"><span>&nbsp;&nbsp; &nbsp;<span>&nbsp;&nbsp; &nbsp;if(x==endX&amp;&amp;y==endY){</span></span></pre><pre style="line-height: 125%; margin: 0px;"><span><span><span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;cout&lt;&lt;"Reached end";</span><br /></span></span></pre><pre style="line-height: 125%; margin: 0px;"><span><span><span><span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;</span>fl=1;</span></span></span></pre><pre style="line-height: 125%; margin: 0px;"><span><span><span><span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;return;</span><br /></span></span></span></pre><pre style="line-height: 125%; margin: 0px;"><span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;</span>}
		<span style="color: #008800; font-weight: bold;">if</span> (isValid(x <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>, y)) {
		<span>&nbsp;&nbsp; &nbsp;</span>dfs_on_grid(x <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>, y);
	<span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;</span>}
		<span style="color: #008800; font-weight: bold;">if</span> (isValid(x, y <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>)) {	
		<span>&nbsp;&nbsp; &nbsp;</span>dfs_on_grid(x, y <span style="color: #333333;">-</span> <span style="color: #0000dd; font-weight: bold;">1</span>);
		}
		<span style="color: #008800; font-weight: bold;">if</span> (isValid(x <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>, y)) {
	<span>&nbsp;&nbsp; &nbsp;</span><span>&nbsp;&nbsp; &nbsp;<span>&nbsp;&nbsp; &nbsp;</span></span>dfs_on_grid(x <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>, y)		
		}
		<span style="color: #008800; font-weight: bold;">if</span> (isValid(x, y <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>)) {		</pre><pre style="line-height: 125%; margin: 0px;">	<span>&nbsp;&nbsp; &nbsp;</span>dfs_on_grid(x, y <span style="color: #333333;">+</span> <span style="color: #0000dd; font-weight: bold;">1</span>)		
		}
	}
	</pre></div>`
		console.log('hey');
		disable_buttons();
		y_o = y_origin();
		x_d = x_destination();
		y_d = y_destination();
		DFS();
		window.setTimeout(() => {
			disable_buttons();
		}, c_delay);
		e.preventDefault();
	});
	document.querySelector('.a_star').addEventListener('click', function (e) {
		x_o = x_origin();
		y_o = y_origin();
		x_d = x_destination();
		y_d = y_destination();
		a_star();
		e.preventDefault();
	});
	document.querySelector('.dij').addEventListener('click', function (e) {
		x_o = x_origin();
		y_o = y_origin();
		x_d = x_destination();
		y_d = y_destination();
		dij();
		e.preventDefault();
	});
	function disable_buttons() {
		let btns11 = document.querySelector('.dropdown_sort');
		let btns2 = document.querySelector('.reset_btn');
		// for(let i=0;i<btns.length;i++)
		// {
		btns11.classList.toggle('hidden');
		btns2.classList.toggle('hidden');
		// }
	}
	let bffa = [];
	function DFS() {
		console.log('ibfibf');
		c_delay = 0;
		console.log(x_d);
		console.log(y_d);
		vis = [];
		x_o--;
		y_d--;
		for (let i = 0; i < box_no; i++) {
			let temp = [];
			let temp2 = [];
			for (let j = 0; j < box_no2; j++) {
				temp.push(0);
				temp2.push([0, 0]);
			}
			bffa.push(temp2);
			vis.push(temp);
		}
		vis[x_o][y_o] = 0;
		dfs_on_grid(x_o, y_o);
		bffa = [];
		vis = [];
		fl = 0;
	}
	let fl = 0;
	function dfs_on_grid(x, y) {
		console.log('hey');
		if (cell[x * box_no + y - 1].classList.contains('end')) {
			update_final(x + 1, y);
			fl = 1;
			return;
		}
		if (fl) {
			return;
		}
		if (isValid(x, y)) {
			vis[x][y] = 1;
		}
		if (isValid(x - 1, y)) {
			let gg = (x - 1) * box_no + y - 1;
			if (gg < 0) {
				console.log('yaar');
			} else if (cell[gg].classList.contains('obst')) {
				console.log('You are sexy');
			} else {
				vis[x][y] = 1;
				bffa[x][y] = [x - 1, y];
				update_cell(x - 1, y);
				dfs_on_grid(x - 1, y);
			}
		}
		if (isValid(x, y - 1)) {
			console.log(x);
			console.log(y);
			let gg = x * box_no + y - 2;

			console.log(gg);
			if (gg < 0) {
				console.log('yaar');
			} else if (cell[gg].classList.contains('obst')) {
				console.log('You are sexy');
			} else {
				vis[x][y] = 1;
				bffa[x][y] = [x - 1, y];
				update_cell(x, y - 1);
				dfs_on_grid(x, y - 1);
			}
		}
		if (isValid(x + 1, y)) {
			let gg = (x + 1) * box_no + y - 1;
			if (gg < 0) {
				console.log('yaar');
			} else if (cell[gg].classList.contains('obst')) {
				console.log('You are sexy');
			} else {
				vis[x][y] = 1;
				bffa[x][y] = [x + 1, y];
				update_cell(x + 1, y);
				dfs_on_grid(x + 1, y);
			}
		}
		if (isValid(x, y + 1)) {
			let gg = x * box_no + y;
			console.log(x, y);
			console.log(gg);
			if (gg < 0) {
				console.log('yaar');
			} else if (cell[gg].classList.contains('obst')) {
				console.log('You are sexy');
			} else {
				vis[x][y] = 1;
				bffa[x][y] = [x, y + 1];
				update_cell(x, y + 1);
				dfs_on_grid(x, y + 1);
			}
		}
	}
	function BFS() {
		c_delay = 0;
		x_o = x_origin();
		console.log(x_o);
		y_o = y_origin();
		console.log(y_o);
		x_d = x_destination();
		y_d = y_destination();
		let q = [];
		let dist = [];
		console.log(box_no, box_no2, 'aaja');
		for (let i = 0; i < box_no; i++) {
			let temp = [];
			for (let j = 0; j < box_no2; j++) {
				temp.push(0);
				vis.push([0, 0]);
			}
			dist.push(temp);
			affa.push(temp);
		}
		x_o--;
		q.push([x_o, y_o]);
		dist[x_o][y_o] = 0;
		vis[x_o][y_o] = 1;
		//console.log(x_d);
		//console.log(y_d);
		let fl = 0;
		while (q.length !== 0) {
			let curX = q[0][0];
			let curY = q[0][1];
			q.shift();	
			for (let i = 0; i < 4; i++) {
				let gg = (curX + dx[i]) * box_no + curY + dy[i] - 1;
				if (gg < 0 || gg >= cell.length) {
					continue;
				}
				if (
					isValid(curX + dx[i], curY + dy[i]) &&
					!cell[gg].classList.contains('obst')
				) {
					let newX = curX + dx[i];
					let newY = curY + dy[i];
					dist[newX][newY] = dist[curX][curY] + 1;
					affa[newX][newY] = [curX, curY];
					if (newX === x_d && newY === y_d) {
						update_final(newX, newY);
						fl = 1;
						break;
					}
					update_cell(newX, newY);
					vis[newX][newY] = 1;
					q.push([newX, newY]);
				}
			}
			if (fl) {
				break;
			}
		}
		//console.log(x_d);
		//console.log(y_d);
		if (fl) {
			console.log(affa);
			console.log(x_d);
			console.log(y_d);
			let i = affa[x_d][y_d];
			for (i; i != 0; ) {
				//console.log(i);
				reconstruct(i);
				i = affa[i[0]][i[1]];
			}
		}
		//console.log(dist);
		//console.log(affa);
		affa = [];
		vis = [];
	}
	function getWidth() {
		return Math.min(
			document.body.scrollWidth,
			document.documentElement.scrollWidth,
			document.body.offsetWidth,
			document.documentElement.offsetWidth,
			document.documentElement.clientWidth
		);
	}

	function getHeight() {
		return Math.min(
			document.body.scrollHeight,
			document.documentElement.scrollHeight,
			document.body.offsetHeight,
			document.documentElement.offsetHeight,
			document.documentElement.clientHeight
		);
	}

	function generate_grid() {
		grid.innerHTML = '';
		column_width = getWidth();
		column_height = getHeight();
		box_no = Math.floor(column_width / 30);
		box_no2 = Math.floor(column_height / 30);
		// console.log(box_no);
		// console.log(box_no2);
		box_no -= 7;
		box_no2 -= 5;
		for (let i = 0; i < grid.children.length; i++) {
			grid.children[i].remove();
		}
		for (let i = 0; i < box_no2; i++) {
			let tr = document.createElement('tr');
			for (let j = 0; j < box_no; j++) {
				let div = document.createElement('td');
				div.style.width = '30px';
				div.style.height = '30px';
				div.background = 'white';
				div.style.border = '1px solid white';
				div.classList.add('cell');
				tr.appendChild(div);
			}
			grid.appendChild(tr);
		}

		cell = document.querySelectorAll('.cell');
		cell[box_no].innerHTML =
			"<i class='fas fa-hand-point-right fa-2x' style='color:white'>";
		cell[box_no].classList.add('src');
		cell[box_no2].innerHTML =
			"<i class='fas fa-hand-lizard fa-2x' style='color:white'>";
		cell[box_no2].classList.add('end');

		// console.log(cell);
		let p = box_no;
		let isdrawing = false;
		for (let i = 0; i < cell.length; i++) {
			cell[i].addEventListener('mousedown', function (e) {
				if (cell[i].innerHTML === '') {
					cell[i].style.background = 'green';
					isdrawing = true;
					cell[i].classList.add('obst');
				}
			});
			cell[i].addEventListener('mousemove', function (e) {
				if (cell[i].innerHTML === '' && isdrawing == true) {
					cell[i].style.background = 'green';
					isdrawing = true;
					cell[i].classList.add('obst');
				}
			});

			cell[i].addEventListener('mouseup', function (e) {
				isdrawing = false;
			});
			cell[i].addEventListener('click', function (e) {
				cell[i].style.background = document.body.background;
				cell[i].classList.add('src');
				cell[box_no].innerHTML = '';
				cell[i].innerHTML =
					"<i class='fas fa-hand-point-right src fa-2x' style='color:white'>";

				cell[p].innerHTML = '';
				cell[i].classList.remove('obst');
				cell[p].classList.remove('obst');
				// cell[box_no].classList.remove("obst");
				// cell[p].classList.add("obst");
				cell[p].classList.remove('src');
				p = i;
			});
		}
	}
	function x_origin() {
		for (let i = 0; i < cell.length; i++) {
			if (cell[i].classList.contains('src')) {
				console.log(i);
				return Math.ceil((i + 1) / box_no);
			}
		}
	}
	function y_origin() {
		for (let i = 0; i < cell.length; i++) {
			if (cell[i].classList.contains('src')) {
				return (i + 1) % box_no;
			}
		}
	}
	function x_destination() {
		for (let i = 0; i < cell.length; i++) {
			if (cell[i].classList.contains('end')) {
				return Math.ceil((i + 1) / box_no);
			}
		}
	}
	function y_destination() {
		for (let i = 0; i < cell.length; i++) {
			if (cell[i].classList.contains('end')) {
				return (i + 1) % box_no;
			}
		}
	}
	function isValid(curX, curY) {
		if (curX < 0 || curY < 0 || vis[curX][curY] == 1) {
			return false;
		} else if (curX >= box_no2 || curY >= box_no) {
			return false;
		} else {
			return true;
		}
	}
	function update_cell(x, y) {
		// console.log(x);
		// console.log(y);
		window.setTimeout(function () {
			let no = x * box_no + y;
			cell[no - 1].style.background = 'purple';
		}, (c_delay += delay_time));
	}
	function update_final(newX, newY) {
		window.setTimeout(function () {
			cell[(newX - 1) * box_no + newY - 1].style.background = 'yellow';
		}, (c_delay += delay_time));
	}
	function reconstruct(i) {
		window.setTimeout(function () {
			if (i != 0) {
				let no = i[0] * box_no + i[1];
				console.log(typeof i);
				console.log(no);
				cell[no - 1].style.background = 'yellow';
			}
		}, (c_delay += delay_time));
	}
}