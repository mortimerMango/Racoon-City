//Function to change the background-image according to the day of the week (home)
function theDay(){
	
	const week = ['sunday.gif', 'monday.gif', 'tuesday.gif', 'wednesday.gif', 'thursday.gif', 'friday.gif', 'saturday.gif'];
	const day = new Date();
	let dayOf = day.getDay();

	var test = "url(\"file:///C:/Users/teran/Desktop/Orugasumu/ProjectAlpha/home/img/" + week[dayOf] + "\")";
	document.getElementById(['op-day']).style.backgroundImage = test;
}

window.addEventListener('DOMContentLoaded', theDay, false);