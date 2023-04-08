console.log("JS is working!");

let numQuestions;
let outcomeToAssets;

$.getJSON("data.json", function (data) {
  // now you can do something with this data.
  // remember you can only work with the data in this callback
  // data.title has the title
  // maybe you want to loop through data.questions?
  numQuestions = data.questions.length;
  outcomeToAssets = data.outcomes;
  $("#header h1").text(data.title);
  var html = "";
  data.questions.forEach((q) => {
    console.log(q);
    var choices = "";
    q.choices.forEach((choice) => {
      if (choice.text != "") {
        choices += `
				<label>
					<input name=${q.question_type} type="radio" value=${choice.outcome} />
					<h3>${choice.text}</h3>
				</label>
			`;
      } else {
        choices += `
				<label>
					<input name=${q.question_type} type="radio" value=${choice.outcome} />
					<img
						src=${choice.img_url}
					/>
				</label>
			`;
      }
    });
    html += `
	  <div class="question">
        <h2>${q.question_name}</h2>
        <div class="choices_wrapper">
          ${choices}
        </div>
      </div>
	`;
  });
  $("#questions").html(html);
});

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
  if (choices.length < numQuestions) {
    alert("Must answer all questions!");
  }
  // is user has answered all questions
  else {
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
    $("#result").text(
      "You are a " + outcomeToAssets[mostFreq].text.toUpperCase() + "!!!"
    );
    $("#modal > img").attr("src", outcomeToAssets[mostFreq].img);
    $("#modal").fadeIn("slow");
  }
});

$("#questions").on("click", "input[type='radio']", function (e) {
  const question = $(this).attr("name");
  // checked img
  if ($(`input[name="${question}"]:checked ~ *`).hasClass("inactive")) {
    $(`input[name="${question}"]:checked ~ *`).removeClass("inactive");
  }
  // unchecked imgs
  $(`input[name="${question}"]:not(:checked) ~ *`).addClass("inactive");
});
