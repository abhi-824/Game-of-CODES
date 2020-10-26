let next_btn = document.querySelector('.next-temp');
let message = document.querySelector('.content_line');
let j = 1;
let username = 'Abhinandan Sharma';
next_btn.addEventListener('click', (e) => {
	e.preventDefault();
	if (j == 1) {
		message.innerHTML =
			'You have to collect all the six stones in order to save the universe from evil Thanos. To equip each stone, you will be asked to solve some questions related to programming and you will have to do them before Thanos does and he becomes stronger after each stone . So be careful. ';
	}
	if (j == 2) {
		message.innerHTML =
			'And you will be given powers of the mighty Avengers after each stone. But before starting this quest, we recommend you to be comfortable with at least one programming language and have your compiler set up ready.';
	}
	if (j == 3) {
		message.innerHTML = `So, We all have eyes on you and are countng on you,${username}.`;
		next_btn.innerHTML = 'Start Here';
    }
    if(j==4)
    {
        document.querySelector(".intro_Card").classList.add("hidden");
        document.querySelector(".containerForRoadmap").style.height='240vh';
        document.querySelector(".containerOverlayForRoadmap").style.height='240vh';
    }
	j++;
	console.log(j);
});
