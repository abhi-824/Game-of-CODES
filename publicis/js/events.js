let dashboard_nav=document.querySelectorAll('.dashboard');
let compare_nav=document.querySelectorAll('.compare');
let profile_nav=document.querySelectorAll('.profile');
let codeblast_nav=document.querySelectorAll('.codeblast');
let topic_Wise_nav=document.querySelectorAll('.topic_wise');
let level_wise_nav=document.querySelectorAll('.level_wise');
let sorting_vis_nav=document.querySelectorAll('.sorting_vis_pls');
let grid_vis_nav=document.querySelectorAll('.grid_vis_pls');
for(let i=0;i<dashboard_nav.length;i++)
{
	dashboard_nav[i].addEventListener('click', function (e) {
		dashboard(handle);
		e.preventDefault();
	});
}
for(let i=0;i<compare_nav.length;i++)
{
	compare_nav[i].addEventListener('click', function (e) {
		compare(handle);
		e.preventDefault();
	});
}
for(let i=0;i<profile_nav.length;i++)
{
	profile_nav[i].addEventListener('click', function (e) {
		profile(handle);
	e.preventDefault();
	});
}
for(let i=0;i<codeblast_nav.length;i++)
{
	codeblast_nav[i].addEventListener('click', function (e) {
		codeblast(handle);
	e.preventDefault();
	});
}
for(let i=0;i<topic_Wise_nav.length;i++)
{
	topic_Wise_nav[i].addEventListener('click', function (e) {
		topic_wise(handle);
		e.preventDefault();
	});
}
for(let i=0;i<level_wise_nav.length;i++)
{
	level_wise_nav[i].addEventListener('click', function (e) {
		level_wise(handle);
		e.preventDefault();
	});
}
for(let i=0;i<sorting_vis_nav.length;i++)
{
	sorting_vis_nav[i].addEventListener('click', function (e) {
		sorting_vis();
		e.preventDefault();
	});
}
for(let i=0;i<grid_vis_nav.length;i++)
{
	grid_vis_nav[i].addEventListener('click', function (e) {
		grid_vis();
		e.preventDefault();
	});
}
