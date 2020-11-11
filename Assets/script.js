/**
 * CRITERIA
 */

// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

/**
 * DEFINE VARIABLES
 */

var saveBtn = $(".saveBtn");

/**
 * FUNCTIONS
 */

// current day is displayed at the top of the calendar
$("#currentDay").text(moment().format('dddd MMMM Do YYYY'));

// each time block is color-coded to indicate whether it is in the past, present, or future
function timeBlockColor() {
    var hour = moment().hours();

    $(".time-block").each(function() {
        var currHour = parseInt($(this).attr("id"));

        // console.log(this); //each time-block

        if (currHour > hour) {
            $(this).addClass("future");
        } else if (currHour === hour) {
            $(this).addClass("present");
        } else {
            $(this).addClass("past");
        }
    })
};

// WHEN I click the save button for that time block
saveBtn.on("click", function() {

    // console.log(this); //save button
    var time = $(this).siblings(".hour").text();
    var plan = $(this).siblings(".plan").val();

    // THEN the text for that event is saved in local storage
    localStorage.setItem(time, plan);
});

// WHEN I refresh the page
// THEN the saved events persist
function usePlanner() {

    $(".hour").each(function() {
        var currHour = $(this).text();
        var currPlan = localStorage.getItem(currHour);

        // console.log(this);
        // console.log(currHour);

        if(currPlan !== null) {
            $(this).siblings(".plan").val(currPlan);
        }
    });
}

/**
 * CALL FUNCTIONS
 */

timeBlockColor();
usePlanner();



