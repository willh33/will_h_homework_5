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

//Other Variables
let timeBlocks = ['5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM'];

function initialize() {
	//Generate a row for each timeblock

}

function createRow(timeblock) {
	let rowDiv = $('<div>').addClass('time')
}