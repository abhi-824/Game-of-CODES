function compare(handle) {
	show_screen(compare_screen);
	let handle2 = document.querySelector('#handle2').value;
	document.querySelector('#handle_button2').addEventListener('click', (e) => {
		async function find_user() {
			handle2 = document.querySelector('#handle2').value;

			let modified_url =
				'https://codeforces.com/api/user.info?handles=' + handle2;
			const jsondata = await fetch(modified_url);
			const jsdata = await jsondata.json();
			if (jsdata.status === 'FAILED' || handle2 == handle) {
				alert('Invalid Codeforces handle');
			} else {
				show_screen(compare_screen2);
				compare_final(handle, handle2);
			}
		}
		find_user();
		e.preventDefault();
	});
}
