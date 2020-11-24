function roadmap(handle) {
	show_screen(roadmap_screen);
	let next_btn = document.querySelector('.next-temp');
	let message = document.querySelector('.content_line');
	let img = document.querySelector('.image_for_daarane');
	let j = 1;
	let username = handle;
	var user = firebase.auth().currentUser;
	db.collection('handles')
		.where('email', '==', user.email)
		.get()
		.then((snapshot) => {
			snapshot.docs.forEach((doc) => {
				const handle_list = doc.data();
				if (handle_list.email === user.email) {
					if (handle_list.road_map_progress != undefined) {
						document.querySelector('.intro_Card').classList.add('hidden');
						document.querySelector('.containerForRoadmap').style.height =
							'240vh';
						document.querySelector('.containerOverlayForRoadmap').style.height =
							'240vh';
					} else {
						db.collection('handles').add({
							email: handle_list.email,
							handle: handle_list.handle,
							target: handle_list.target,
							bookmarks: handle_list.bookmarks,
							road_map_progress: 0,
						});
						db.collection('handles').doc(doc.id).delete();
						next_btn.addEventListener('click', (e) => {
							e.preventDefault();
							if (j == 1) {
								message.innerHTML =
									'You have to collect all the six stones in order to save the universe from evil Thanos. To equip each stone, you will be asked to solve some questions related to programming and you will have to do them before Thanos does and he becomes stronger after each stone . So be careful. ';
							}
							if (j == 2) {
								message.innerHTML = `And you will be given powers of the mighty Avengers after each stone. But before starting this quest, we recommend you to be comfortable with at least one programming language and have your compiler set up ready.`;
							}
							if (j == 3) {
								message.innerHTML = `So, We all have eyes on you and are countng on you,${username}. Oh no, here he comes`;
								next_btn.innerHTML = 'Next';
							}
							if (j == 4) {
								img.innerHTML = `<img src="resources/stones/backgrounds/thanos.png" alt="">`;
								message.innerHTML = `Hey boy. Looks like you are nervous. Don't be. I promise I would beat you in every contest and would make you scream!!! If you are still courageous, then go ahead.`;
								next_btn.innerHTML = 'Start the Quest';
							}
							if (j == 5) {
								document
									.querySelector('.intro_Card')
									.classList.add('bounceOutLeft');
								document.querySelector('.containerForRoadmap').style.height =
									'240vh';
								document.querySelector(
									'.containerOverlayForRoadmap'
								).style.height = '240vh';
							}
							j++;
							console.log(j);
						});
					}
					let pow_btn = document.querySelectorAll('.pow_btn');
					for (let i = 0; i < pow_btn.length; i++) {
						pow_btn[i].addEventListener('click', (e) => {
							e.preventDefault();
							console.log('hello');
							roadmap_topic(i, handle);
						});
					}
				}
			});
		});
}
