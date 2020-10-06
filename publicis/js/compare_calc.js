function compare(handle) {
	show_screen(compare_screen);
	let handle2 = document.querySelector('#handle2').value;
	document.querySelector('#handle_button2').addEventListener('click', (e) => {
		e.preventDefault();
		handle2 = document.querySelector('#handle2').value;
		if (handle2) {
      show_screen(compare_screen2)
			compare_final(handle, handle2);
		} else {
			alert('Invalid Codeforces handle');
		}
	});
}