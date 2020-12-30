function codeblast(handle) {
	show_screen(codeblast_screen);
	const socket = io();
	document.querySelector('.join_romms').addEventListener('click', (e) => {
		e.preventDefault();
		let username = handle;
		let room = document.querySelector('#room_id').value;
		socket.emit('checkId', room);
		socket.on('roomIdChecked', (check) => {
			console.log(check);
			if (check) {
				codeblast_enter(username, room);
			} else {
				alert('There is no such room available!');
			}
		});
	});

	document.querySelector('.createRoom').addEventListener('click', (e) => {
		e.preventDefault();
		socket.emit('give_id');
		socket.on('rec_id', (id) => {
			console.log(id);

			codeblast_enter(handle, id);
		});
	});
}
