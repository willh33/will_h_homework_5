/**
 * What do we need?
 * 1. A list of time blocks on the screen (Should this be generated or plain HTML?)
 * 1.1 Render each time block witth label, input, and save button
 * 1.2 Get data from LocalStorage
 * 2. An array of time blocks 
 * 3. An array for the data in each time block
 * 4. I guess I do want to render everything in JS
 * 5. Click events
 * 5.1 When save is clicked save data to LocalStorage
 * */ 

//HTML DOM Variables
let container = $('#timeblock-div');
let currentDayP = $('#currentDay');

//Other Variables
let currentHour = moment().hour();
let timeBlocks = [
	{hour: 5, label: '5AM'}, 
	{hour: 6, label: '6AM'}, 
	{hour: 7, label: '7AM'}, 
	{hour: 8, label: '8AM'}, 
	{hour: 9, label: '9AM'}, 
	{hour: 10, label: '10AM'}, 
	{hour: 11, label: '11AM'}, 
	{hour: 12, label: '12PM'}, 
	{hour: 13, label: '1PM'}, 
	{hour: 14, label: '2PM'}, 
	{hour: 15, label: '3PM'}, 
	{hour: 16, label: '4PM'}, 
	{hour: 17, label: '5PM'}, 
	{hour: 18, label: '6PM'}, 
	{hour: 19, label: '7PM'}, 
	{hour: 20, label: '8PM'}, 
	{hour: 21, label: '9PM'}, 
	{hour: 22, label: '10PM'}
];
let localData = {};
let todaysDate = moment();

/**
 * Initialize the scheduler, 
 * this should reset all needed variables, 
 * get anything stored in localStorage and render everything to the DOM
 *  */
function initialize() {
	//Get the current time to check each time block to see if it's in the past, present or future
	currentHour = todaysDate.hour();
	let storedData = getLocalData();

	currentDayP.text(todaysDate.format('dddd, MMMM DD'));

	//Generate a row for each timeblock
	timeBlocks.forEach(block => {
		createRow(block);
	})
}

/**
 * Takes in a timeblock {hour: 4, label: '4AM'} and renders a row on the screen 
 * 	with a label, textarea and save button
 * @param {*} timeblock 
 */
function createRow(timeblock) {
	//Create a div for the timeblock with a class of row
	let rowDiv = $('<div>').addClass('time-block row')
	//Create and append label with time
	let label = $("<p>").text(timeblock.label).addClass('hour col-md-2 text-right');
	//Create and appened input 
	let input = $("<textarea>").addClass('description col-md-8');

	//Add the class for past, present and future
	if(timeblock.hour < currentHour)
		input.addClass('past');
	else if(timeblock.hour === currentHour)
		input.addClass('present');
	else
		input.addClass('future');
	//Fill in the text of the description from LocalStorage
	input.val(localData[timeblock.hour]);

	//Create and append save button
	let saveBtn = $("<button>").addClass('saveBtn col-md-2 far fa-save');
	saveBtn.attr('data-hour', timeblock.hour);
	
	rowDiv.append(label, input, saveBtn);

	container.append(rowDiv);
}

/**
 * Get and parse data from localStorage
 */
function getLocalData() {
	let data = localStorage.schedule;
	if(data)
		localData = JSON.parse(data);
}

/**
 * Save data to localStorage
 */
function saveData(hour, text) {
	getLocalData();

	localData[hour] = text;
	localStorage.schedule = JSON.stringify(localData);
}

initialize();

$(".saveBtn").click(function() {
	let input = $(this)[0].previousSibling;
	let val = $(input).val();
	saveData($(this).attr('data-hour'), val.trim());
});