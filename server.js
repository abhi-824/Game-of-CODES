const path = require('path');
import sslRedirect from 'heroku-ssl-redirect';
const problems = [];

const fetch = require('node-fetch');

const http = require('http');
const host = '0.0.0.0';
const PORT = process.env.PORT || 3000;
const express = require('express');

const socketio = require('socket.io');

const formatMessage = require('./utils/messages');

const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
	make_ready,
	allready,
	giveProblems,
} = require('./utils/users');

const app = express();

const server = http.createServer(app);

const io = socketio(server);

//django unchained
app.use(sslRedirect());
app.use(express.static(path.join(__dirname, 'publicis')));
io.on('connection', (socket) => {
	console.log('new ws connection');

	socket.on('disconnect', () => {
		const user = userLeave(socket.id);
		if (user) {
			io.to(user.room).emit(
				'message',
				formatMessage('BOSS', `${user.username} has left the chat`)
			);
			io.to(user.room).emit('roomUsers', {
				room: user.room,
				users: getRoomUsers(user.room),
			});
		}
	});

	socket.on('ready', ({ username, room }) => {	
		const user = make_ready(socket.id, username, room, 1);
		const users = getRoomUsers(room);
		if (allready(room)) {
			// giveProblems();
			io.to(user.room).emit('start_loader', problems);
			async function getFinal() {
				let solved = new Set();
				for (let i = 0; i < users.length; i++) {
					let handle_name = users[i].username;
					// async function getSetGo() {
					let modified_url = `https://codeforces.com/api/user.status?handle=${handle_name}`;
					const jsondata = await fetch(modified_url);
					const jsdata = await jsondata.json();
					for (let i = 0; i < jsdata.result.length; i++) {
						if (jsdata.result[i].verdict == 'OK') {
							let str =
								jsdata.result[i].problem.contestId +
								'-' +
								jsdata.result[i].problem.index;
							solved.add(str);
						}
					}
					// }
					// getSetGo();
				}
				// console.log(solved);

				let modified_url2 = `https://codeforces.com/api/problemset.problems`;
				const jsondata2 = await fetch(modified_url2);
				const jsdata2 = await jsondata2.json();

				for (let i = 0; i < jsdata2.result.problems.length; i++) {
					let str =
						jsdata2.result.problems[i].contestId +
						'-' +
						jsdata2.result.problems[i].index;
					if (
						jsdata2.result.problems[i].rating > 900 &&
						jsdata2.result.problems[i].rating <= 1400 &&
						solved.has(str) === false
					) {
						//to be continued

						problems.push(str);
						break;
					}
				}
				for (let i = 0; i < jsdata2.result.problems.length; i++) {
					let str =
						jsdata2.result.problems[i].contestId +
						'-' +
						jsdata2.result.problems[i].index;
					if (
						jsdata2.result.problems[i].rating > 1400 &&
						jsdata2.result.problems[i].rating <= 1700 &&
						solved.has(str) === false
					) {
						//to be continued
						problems.push(str);
						break;
					}
				}

				for (let i = 0; i < jsdata2.result.problems.length; i++) {
					let str =
						jsdata2.result.problems[i].contestId +
						'-' +
						jsdata2.result.problems[i].index;
					if (
						jsdata2.result.problems[i].rating > 1700 &&
						jsdata2.result.problems[i].rating <= 2000 &&
						solved.has(str) === false
					) {
						//to be continued
						problems.push(str);
						break;
					}
				}
				console.log(problems);
				// problem_set=problems;
				io.to(user.room).emit('start_contest', problems);
			}
			getFinal();
			// console.log(problems);
			// start_contest();
		}
	});

	socket.on('joinRoom', ({ username, room }) => {
		const user = userJoin(socket.id, username, room);
		socket.join(user.room);

		socket.emit(
			'message',
			formatMessage('BOSS', 'Welcome to CodeBlast, ready to blast your code?')
		);

		socket.broadcast
			.to(user.room)
			.emit(
				'message',
				formatMessage('BOSS', `${user.username} has joined the room`)
			);

		io.to(user.room).emit('roomUsers', {
			room: user.room,
			users: getRoomUsers(user.room),
		});
	});

	socket.on('bringResults', ({ room, problems }) => {
		async function getFinal() {
			console.log('hello');
			io.to(room).emit('start_loader', problems);
			let solved = new Set();
			let username=getRoomUsers(room);
			for(let j=0;j<username.length;j++)
			{
				let handle_name = username[j].username;
				let modified_url = `https://codeforces.com/api/user.status?handle=${handle_name}`;
				const jsondata = await fetch(modified_url);
				const jsdata = await jsondata.json();
				for (let i = 0; i < jsdata.result.length; i++) {
					if (jsdata.result[i].verdict == 'OK') {
						let str =
							jsdata.result[i].problem.contestId +
							'-' +
							jsdata.result[i].problem.index;
						solved.add(str);
					}
				}
				let result_jo = [];
				for (let i = 0; i < problems.length; i++) {
					if (solved.has(problems[i])) {
						result_jo[i] = 1;
					} else {
						result_jo[i] = 0;
					}
				}
				socket.emit('le_result', result_jo,username,j);
			}
		}
		getFinal();
	});

	socket.on('chatMessage', (msg) => {
		const user = getCurrentUser(socket.id);
		io.to(user.room).emit('message', formatMessage(user.username, msg));
	});


});

server.listen(PORT, host, function () {
	console.log('Server started.......');
});
