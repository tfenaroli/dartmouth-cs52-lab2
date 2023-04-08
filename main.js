console.log("JS is working!");

$("#submit").on("click", function (e) {
  // gather all checked radio-button values
  var choices = $("input[type='radio']:checked")
    .map(function (i, radio) {
      return $(radio).val();
    })
    .toArray();

  // now you have an array of choices = ["valueofradiobox1", "valueofradiobox2", "valueofradiobox2"]
  // you'll need to do some calculations with this
  // a naive approach would be to just choose the most common option - seems reasonable

  // if user hasn't answered all questions
  if (choices.length < 4) {
    alert("Must answer all questions!");
  }
  // is user has answered all questions
  else {
    console.log(choices.toString());
    // create a dictionary mapping from house to frequency
    const houseToFreq = {};
    choices.forEach((el) => {
      if (houseToFreq[el]) {
        houseToFreq[el] = houseToFreq[el] + 1;
      } else {
        houseToFreq[el] = 1;
      }
    });

    // get the most frequent house
    let mostFreq = Object.keys(houseToFreq)[0];
    Object.keys(houseToFreq).forEach((el) => {
      if (houseToFreq[el] > houseToFreq[mostFreq]) {
        mostFreq = el;
      }
    });

    console.log(houseToFreq);
    console.log(mostFreq);
    $("#submit").hide();
    $("#result").text("You are a " + mostFreq.toUpperCase() + "!!!");
    $("#sorting_hat").show();
  }
});

$("input[type='radio']").on("click", function (e) {
  const question = $(this).attr("name");
  console.log($(this).attr("name"));
  // checked img
  if ($(`input[name="${question}"]:checked ~ *`).hasClass("inactive")) {
    $(`input[name="${question}"]:checked ~ *`).removeClass("inactive");
  }
  // unchecked imgs
  $(`input[name="${question}"]:not(:checked) ~ *`).addClass("inactive");
});
