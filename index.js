//setting up async/await ask functionality for the command line
const path = require("path");
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

class Path {
  constructor(name, paths) {
    this.name = name;
    this.paths = paths;
  }

  //creating a map method on our path
  map() {
    console.log(
      `From the ${this.name} path, you can follow the ${this.paths}.`
    );
  }
}

let start = "blue";

let Red = new Path("Red", "Yellow, blue");

let Blue = new Path("Blue", "Green, Red");

let Green = new Path("Green", "Blue, Yellow");

let Yellow = new Path("Yellow", "Green, Red");

let pathTable = {
  blue: Blue,
  green: Green,
  yellow: Yellow,
  red: Red,
};

let pathStateMachine = {
  red: ["Blue", "Yellow"],
  blue: ["Green", "Red"],
  green: ["Blue", "Yellow"],
  yellow: ["Green", "Red"],
};

function riverBegin() {
  console.log(
    "You are stuck on a river in a boat without a map home, there are (4) different rivers. You can check the [map] or [cross] to switch rivers. Or, you can [sink]."
  );
  boat();
}

async function boat() {
  let input = await ask("Where would you like to go?  >_");

  input = input.split(" ");

  let action = input[0];

  let target = input.slice(1).join(" ");

  target = target.charAt(0).toUpperCase() + target.slice(1);

  if (action === "map" && !target) {
    pathTable[start].map();
  }

  if (action === "sink" && !target) {
    console.log("You have sunk your boat!");

    process.exit();
  }

  if (action === "cross" && target) {
    if (pathStateMachine[start].includes(target)) {
      start = target.toLowerCase();

      console.log(`You crossed to the ${target} river.`);
    } else {
      console.log("You can't cross from here to there.");

      boat();
    }
  }

  if (action !== "map" && action !== "cross" && action !== "sink") {
    console.log("What are you trying to do?");
    boat();
  }

  boat();
}

riverBegin();
