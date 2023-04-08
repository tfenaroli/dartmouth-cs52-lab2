console.log("JS is working!");

let numQuestions;
let questionWeights;
let outcomeToAssets;

$.getJSON("data.json", function (data) {
  // set numQuestions, questionWeights, and outcomeToAssets vars
  numQuestions = data.questions.length;
  questionWeights = data.questions.map((q) => q.weight);
  outcomeToAssets = data.outcomes;

  // populate header content
  $("#main_img").attr("src", data.main_img);
  $("#header h1").text(data.title);

  // generate questions html
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

  // if user hasn't answered all questions, alert
  if (choices.length < numQuestions) {
    alert("Must answer all questions!");
  }

  // is user has answered all questions
  else {
    // create a dictionary mapping from outcome to frequency
    const houseToFreq = {};
    choices.forEach((el, index) => {
      if (houseToFreq[el]) {
        houseToFreq[el] = houseToFreq[el] + questionWeights[index];
      } else {
        houseToFreq[el] = questionWeights[index];
      }
    });

    console.log("outcome to weight: " + JSON.stringify(houseToFreq));

    // get the most frequent outcome
    let mostFreq = Object.keys(houseToFreq)[0];
    Object.keys(houseToFreq).forEach((el) => {
      if (houseToFreq[el] > houseToFreq[mostFreq]) {
        mostFreq = el;
      }
    });

    // hide submit button, set modal content, and show modal
    $("#submit").hide();
    $("#result").text(
      "You are a " + outcomeToAssets[mostFreq].text.toUpperCase() + "!!!"
    );
    $("#modal > img").attr("src", outcomeToAssets[mostFreq].img);
    $("#modal").fadeIn("slow");
  }
});

$("#questions").on("click", "input[type='radio']", function (e) {
  // get question that was answered
  const question = $(this).attr("name");

  // remove inactive class from choice that was clicked, if it has inactive class
  if ($(`input[name="${question}"]:checked ~ *`).hasClass("inactive")) {
    $(`input[name="${question}"]:checked ~ *`).removeClass("inactive");
  }

  // add inactive class to all choices for that question that were not clicked
  $(`input[name="${question}"]:not(:checked) ~ *`).addClass("inactive");
});
