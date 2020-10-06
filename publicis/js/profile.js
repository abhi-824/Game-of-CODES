function profile(user_handle) {
	show_screen(profile_screen)
	var dataPointsRatings = [];
	var dataPointsSubmissions = [];
	var dataPointsSubRat = [];
	//var dataPointsSubRatOK = [];
	var ok = 0;
	var compilationError = 0;
	var runTimeError = 0;
	var wrongAnswer = 0;
	var timeLimitExceeded = 0;
	var memoryLimitExceeded = 0;
	var others = 0;
	var probRat1199 = 0;
	var probRat1200_1599 = 0;
	var probRat1600_1999 = 0;
	var probRat2000_2399 = 0;
	var probRat2400_2799 = 0;
	var probRat2800 = 0;
	const urlRatings = 'https://codeforces.com/api/user.rating?handle=';
	const urlSubmissions = 'https://codeforces.com/api/user.status?handle=';
	const urlUserAvatar = 'https://codeforces.com/api/user.info?handles=';

	$(document).ready(function () {
		async function getUserRatings() {
			let finalUrlRatings = urlRatings + user_handle;

			const jsonDataRatings = await fetch(finalUrlRatings);
			const jsDataRatings = await jsonDataRatings.json();

			for (let i = 0; i < jsDataRatings.result.length; i++) {
				dataPointsRatings.push({
					x: parseInt(jsDataRatings.result[i].ratingUpdateTimeSeconds) * 1000,
					y: parseInt(jsDataRatings.result[i].newRating),
				});
			}

			var chart = new CanvasJS.Chart('myChart1', {
				backgroundColor: null,
				animationEnabled: true,
				animationDuration: 2000,
				theme: 'dark1',
				title: {
					text: 'Your Ratings',
				},
				data: [
					{
						type: 'line',
						xValueType: 'dateTime',
						dataPoints: dataPointsRatings,
					},
				],
			});

			chart.render();
			console.log(dataPointsRatings);
		}

		async function getUserSubmissions() {
			let finalUrlSubmissions = urlSubmissions + user_handle + '&from=1';

			let recent_contests = new Set();

			const jsonDataSubmissions = await fetch(finalUrlSubmissions);
			const jsDataSubmissions = await jsonDataSubmissions.json();

			for (let j = 0; j < jsDataSubmissions.result.length; j++) {
				//for recent contests attempted by user
				if (jsDataSubmissions.result[j].contestId) {
					recent_contests.add(parseInt(jsDataSubmissions.result[j].contestId));
				}
				if (jsDataSubmissions.result[j].verdict == 'OK') {
					ok++;
				} else if (jsDataSubmissions.result[j].verdict == 'COMPILATION_ERROR') {
					compilationError++;
				} else if (jsDataSubmissions.result[j].verdict == 'RUNTIME_ERROR') {
					runTimeError++;
				} else if (jsDataSubmissions.result[j].verdict == 'WRONG_ANSWER') {
					wrongAnswer++;
				} else if (
					jsDataSubmissions.result[j].verdict == 'TIME_LIMIT_EXCEEDED'
				) {
					timeLimitExceeded++;
				} else if (
					jsDataSubmissions.result[j].verdict == 'MEMORY_LIMIT_EXCEEDED'
				) {
					memoryLimitExceeded++;
				} else {
					others++;
				}
			}

			let ln = Math.min(recent_contests.size, 5); //only the most recent 5 contests are picked
			recent_contests = Array.from(recent_contests);
			const rc = document.getElementById('recent-contests');
			const rc_url = 'https://codeforces.com/contest/';
			for (let i = 0; i < ln; i++) {
				let li = document.createElement('li');
				li.innerHTML =
					"<a href='" +
					rc_url +
					recent_contests[i].toString() +
					"'> Contest ID: " +
					recent_contests[i].toString() +
					'</a>';
				rc.appendChild(li);
			}

			dataPointsSubmissions.push({
				y: ok,
				indexLabel: 'OK',
			});
			dataPointsSubmissions.push({
				y: compilationError,
				indexLabel: 'COMPILATION_ERROR',
			});
			dataPointsSubmissions.push({
				y: runTimeError,
				indexLabel: 'RUNTIME_ERROR',
			});
			dataPointsSubmissions.push({
				y: wrongAnswer,
				indexLabel: 'WRONG_ANSWER',
			});
			dataPointsSubmissions.push({
				y: timeLimitExceeded,
				indexLabel: 'TIME_LIMIT_EXCEEDED',
			});
			dataPointsSubmissions.push({
				y: memoryLimitExceeded,
				indexLabel: 'MEMORY_LIMIT_EXCEEDED',
			});
			dataPointsSubmissions.push({
				y: others,
				indexLabel: 'OTHERS',
			});

			var chart = new CanvasJS.Chart('myChart2', {
				theme: 'dark2',
				backgroundColor: null,
				animationEnabled: true,
				animationDuration: 2000,
				title: {
					text: 'Your Submissions',
				},
				data: [
					{
						type: 'pie',
						showInLegend: true,
						toolTipContent: '{y} - #percent %',
						yValueFormatString: '',
						legendText: '{indexLabel}',
						dataPoints: dataPointsSubmissions,
					},
				],
			});
			chart.render();
			console.log(dataPointsSubmissions);
		}

		async function getUserSubRat() {
			let finalUserSubRat = urlSubmissions + user_handle + '&from=1';

			const jsonDataSubRat = await fetch(finalUserSubRat);
			const jsDataSubRat = await jsonDataSubRat.json();

			for (let k = 0; k < jsDataSubRat.result.length; k++) {
				if (jsDataSubRat.result[k].problem.rating < 1200) {
					probRat1199++;
				} else if (
					jsDataSubRat.result[k].problem.rating > 1199 &&
					jsDataSubRat.result[k].problem.rating < 1600
				) {
					probRat1200_1599++;
				} else if (
					jsDataSubRat.result[k].problem.rating > 1599 &&
					jsDataSubRat.result[k].problem.rating < 2000
				) {
					probRat1600_1999++;
				} else if (
					jsDataSubRat.result[k].problem.rating > 1999 &&
					jsDataSubRat.result[k].problem.rating < 2400
				) {
					probRat2000_2399++;
				} else if (
					jsDataSubRat.result[k].problem.rating > 2399 &&
					jsDataSubRat.result[k].problem.rating < 2800
				) {
					probRat2400_2799++;
				} else if (jsDataSubRat.result[k].problem.rating > 2799) {
					probRat2800++;
				}
			}

			dataPointsSubRat.push({
				x: 1,
				y: probRat1199,
				label: '<1200',
			});
			dataPointsSubRat.push({
				x: 2,
				y: probRat1200_1599,
				label: '1200-1599',
			});
			dataPointsSubRat.push({
				x: 3,
				y: probRat1600_1999,
				label: '1600-1999',
			});
			dataPointsSubRat.push({
				x: 4,
				y: probRat2000_2399,
				label: '2000-2399',
			});
			dataPointsSubRat.push({
				x: 5,
				y: probRat2400_2799,
				label: '2400-2799',
			});
			dataPointsSubRat.push({
				x: 6,
				y: probRat2800,
				label: '>2800',
			});

			var chart = new CanvasJS.Chart('myChart3', {
				backgroundColor: null,
				theme: 'dark2',
				animationEnabled: true,
				title: {
					text: 'Your Problem-Rating-Wise All Submissions',
				},
				data: [
					{
						type: 'column',
						dataPoints: dataPointsSubRat,
					},
				],
			});
			chart.render();
			console.log(dataPointsSubRat);
		}
		async function getUserAvatar() {
			let finalUserAvatarUrl = urlUserAvatar + user_handle;

			const jsonDataAvatar = await fetch(finalUserAvatarUrl);
			const jsDataAvatar = await jsonDataAvatar.json();
			let userPhoto = jsDataAvatar.result[0].titlePhoto;
			let temp = 'http:';
			let tempArr = [temp, userPhoto];
			let finalPhoto = tempArr.join('');
			$('.Profile-Photo').attr('src', finalPhoto);
		}

		getUserRatings();
		getUserSubmissions();
		setTimeout(getUserSubRat, 1000);
		//getUserSubRatOK();
		getUserAvatar();
	});

	$('.username').text(user_handle);
	window.onload = console.log('hello');
}
