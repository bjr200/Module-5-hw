$(document).ready(function () {
  $(function () {
    // Add a listener for click events on the save button
    $(".saveBtn").on("click", function () {
      // Get the user input from the textarea
      var userInput = $(this).siblings(".description").val().trim();
      // Get the id of the corresponding time-block
      var timeBlockId = $(this).parent().attr("id");

      // Save the user input in local storage using the time-block id as the key
      localStorage.setItem(timeBlockId, userInput);
    });

    // Apply the past, present, or future class to each time block
    function updateTimeBlocks() {
      // Get the current hour using Day.js
      var currentHour = dayjs().format("H");

      // Loop through each time block
      $(".time-block").each(function () {
        var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

        // Add or remove classes based on the current hour
        if (timeBlockHour < currentHour) {
          $(this).removeClass("present future").addClass("past");
        } else if (timeBlockHour === currentHour) {
          $(this).removeClass("past future").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }

    // Get any saved user input from local storage and set the values of the corresponding textarea elements
    function loadSavedEvents() {
      $(".time-block").each(function () {
        var timeBlockId = $(this).attr("id");
        var savedEvent = localStorage.getItem(timeBlockId);

        if (savedEvent) {
          $(this).find(".description").val(savedEvent);
        }
      });
    }

    // Display the current date in the header of the page
    $("#currentDay").text(dayjs().format("dddd, MMMM D"));

    // Call the functions to update time blocks, load saved events, and start the interval
    updateTimeBlocks();
    loadSavedEvents();

    // Update time blocks every minute
    setInterval(function () {
      updateTimeBlocks();
    }, 60000);
  });
});
