//Lins the container where everything lives
var contEl = $('.container');

//Array that containst times for loop and 24 hour format
var timeHr = ['7Am','8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM','3PM', '4PM', '5PM',];
var milTime = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,];

//Title Date Display
var today = moment();
$('#currnetDay').text(today.format('dddd, MMMM Do YYYY'));

//Shows the current hour in the 24 hours format 
var curHour = today.format('H');
$('#currentDay').text(today.format('dddd, MMMM Do YYYY'));

//Create elements for the time blocks
for (let i = 0; i < timeHr.length; i++) {
    var rowEl = $('<row>');
    var divEl = $('<div>');
    var taEl  = $('<textarea>');
    var btnEl = $('<button>');

    rowEl.addClass('row time-block')
    divEl.addClass('col-12 col-md-2 col-xl-2 hours');
    taEl.addClass('col-12 col-md-8 col-xl-8 description');
    btnEl.addClass('col-12 col-md-2 col-xl-2 saveBtn');

    //Ser a data attribute to the 24 hour time frame
    taEl.data('milHour', milTime[i]);

    divEl.text(`${timeHr[i]}`);
    btnEl.text('💾');

    contEl.append(rowEl);
    rowEl.append(divEl);
    rowEl.append(taEl);
    rowEl.append(btnEl);
};

//Appplies CSS to the area based on what time it is 
  function hourBackground() {
	$('.description').each(function () {
		var mHour = $(this).data('milHour');
		if (mHour < +curHour) {
			$(this).addClass('past');
		} else if (+mHour === +curHour) {
			$(this).addClass('present');
		} else {
			$(this).addClass('future');
		};
	})
};

//Will save the text when you click the save button
$('.saveBtn').on("click", function(){
    var time = $(this).siblings('.description').data('milHour');
    var value = $(this).siblings('.description').val();
    localStorage.setItem(time, value);
    alert("Memo Saved");
});

//When the DOM is loaded will pull the stored data
function memoPuller(){
    $('.description').each(function(){
        var hourGrab = $(this).data('milHour');
        $(this).val(localStorage.getItem(hourGrab))
    })
};

//Will let the DOM load and dynamically create the elements and let thes fuctions deploy 
$(document).ready(function(){
    memoPuller();
    hourBackground();
});