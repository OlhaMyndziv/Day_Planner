$(sch);
function sch() {
  // get current day and display on top of page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
  
  // color our time blocks and start interval to re-color every minute
  colorTimeBlocks();
  setInterval(colorTimeBlocks, 60000);

  // update time blocks with data in local storage
  $(".time-block").each(function() {
    var blockId = $(this).attr("id");
    // load saved data from local storage
    $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
  });

  // attach our handler for the save buttons
  $(".saveBtn").on("click", handleSave);
}

function colorTimeBlocks() {
  // for each time block
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").replace("hour-", ""));
    var currentHour = parseInt(moment().format("H"));
    // remove class we may have added before
    $(this).removeClass("past present future");
    // color block based on past, future, present class
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
}

function handleSave(event) {
  var hourId = $(this).parent().attr("id");
  localStorage.setItem(moment().format("DDDYYYY") + hourId, $("#" + hourId + " textarea").val());
}