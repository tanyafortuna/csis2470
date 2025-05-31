function rollDice() {
  // get dice values
  let rand1 = Math.floor(Math.random() * 6) + 1;
  let rand2 = Math.floor(Math.random() * 6) + 1;
  let total = rand1 + rand2;

  // get elements
  let die1 = document.getElementById("die1");
  let die2 = document.getElementById("die2");
  let button = document.getElementById("button");
  let message = document.getElementById("message");
  let comment = document.getElementById("comment");
  let doubles = document.getElementById("doubles");

  // reset dice values
  die1.setAttribute("class", "");
  die2.setAttribute("class", "");

  // weird thing to get dom to recognize that the spinny class was removed
  die1.offsetWidth = die1.offsetWidth;
  die2.offsetWidth = die2.offsetWidth;

  // apply dice values
  switch (rand1) {
    case 1: die1.classList.add("one", "spinny"); break;
    case 2: die1.classList.add("two", "spinny"); break;
    case 3: die1.classList.add("three", "spinny"); break;
    case 4: die1.classList.add("four", "spinny"); break;
    case 5: die1.classList.add("five", "spinny"); break;
    case 6: die1.classList.add("six", "spinny"); break;
  }
  switch (rand2) {
    case 1: die2.classList.add("one", "spinny"); break;
    case 2: die2.classList.add("two", "spinny"); break;
    case 3: die2.classList.add("three", "spinny"); break;
    case 4: die2.classList.add("four", "spinny"); break;
    case 5: die2.classList.add("five", "spinny"); break;
    case 6: die2.classList.add("six", "spinny"); break;
  }

  // set other element stuff
  button.textContent = "Roll Again!";

  message.textContent = "Great job! You rolled a total of " + total + ".";

  if (total < 6) comment.textContent = "That's not very much...";
  else if (total == 6) comment.textContent = "That's pretty average.";
  else comment.textContent = "That's so high!"

  if (rand1 == rand2) doubles.innerHTML = "<a href='https://www.youtube.com/watch?v=Hm3JodBR-vs'>You can tell that it's doubles because of the way it is. How neat is that?</a>";
  else doubles.innerHTML = "";
}