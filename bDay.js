var nameInput;
var respond = document.getElementById("respond");

function returnName() {
  nameInput = createNameInput.value;
  remove(inputScreen);
  display(response);
  respond.innerHTML = `Nice to meet you ${nameInput}`;
  setTimeout(switchToQuestionOne, 5000);
}

function switchToQuestionOne() {
  remove(response);
  display(q1);
}

function heSaidYes() {
  remove(q1);
  display(response);
  respond.innerHTML = "You sure about that?";
  setTimeout(switchToQuestionTwo, 5000);
}

function switchToQuestionTwo() {
  remove(response);
  display(q2);
}

function heSaidNo() {
  remove(q1);
  display(response);
  respond.innerHTML = "I really thought it was you";
  setTimeout(switchToQuestionTwo, 5000);
}

function atATime() {
  remove(q1);
  display(response);
  respond.innerHTML = "Glad you're being truthful";
  setTimeout(switchToQuestionTwo, 5000);
}

function heSaidYesTwo() {
  remove(q2);
  display(response);
  respond.innerHTML = "You sure about that?";
  setTimeout(switchToQuestionTwo, 5000);
}

function switchToCelebrate() {
  remove(response);
  display(bDay);
  bD.innerHTML = `Happy Birthday ${nameInput}!`;
}

function heSaidNoTwo() {
  remove(q2);
  display(response);
  respond.innerHTML = "I really thought it was you";
  setTimeout(switchToQuestionTwo, 5000);
}
