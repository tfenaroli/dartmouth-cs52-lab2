# Quizzical

A web app that loads in question data from a JSON file and renders an interactive quiz game.

[deployed url](https://tfenaroli-lab2.onrender.com)

## What Worked Well
What worked well during this project was everything having to do with styling. After lab 1, I feel much more confident in my ability to position, animate, and style elements of a web page. I also really enjoyed working with JQuery; it really simplified the process of interacting with the DOM, and I can definitely see why it is such a popular library.

## What Didn't
I had a bit of trouble implementing weighted questions. More specifically, I was having difficulty with accessing the weights associated with each question when computing the frequency map (maps each outcome to a frequency/score). So, I eventually devised a solution of instantiating a "global" scope variable called questionWeights when reading in data from data.json. This allowed me to access the question weights in the onClick callback when computing the quiz results.

## Extra Credit
- Weighted questions (each question has an associated weight from (0, 1) inclusive). When computing the score/frequency map, The 
"score" of the outcome that the user selected is incremented by the weight associated with that specific question (as specified in data.json).
- Chose both "adventures" outlined in the lab instructions
  - JavaScript focus: load content from data.json and use JQuery to populate the DOM
  - Styling! Hover animations, click animations, modal pops up when the user is sorted into a house, app works in mobile, and more! See below.

## Screenshots
<img width="740" alt="Screenshot 2023-04-08 at 5 24 17 PM" src="https://user-images.githubusercontent.com/83674002/230743091-e13b2937-be6d-4fba-953d-580ea45f66df.png">
<img width="503" alt="Screenshot 2023-04-08 at 5 24 43 PM" src="https://user-images.githubusercontent.com/83674002/230743104-ed1c92aa-97d7-448d-b64d-4fbf3f374dc1.png">
