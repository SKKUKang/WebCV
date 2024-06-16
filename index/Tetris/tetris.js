import BLOCKS from "./blocks.js"


// DOM
const playground = document.querySelector(".playground > ul");
const holdbox = document.querySelector(".holdbox > ul");
const nextbox = document.querySelector(".nextbox > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const finalscoreDisplay = document.querySelector(".finalscore");
const restartButton = document.querySelector(".game-text > button");



// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

const BLOCKBOX = [
  ["tree", [[3, 1], [1, 1], [2, 0], [2, 1]]],
  ["square", [[1, 0], [1, 1], [2, 0], [2, 1]]],
  ["bar", [[0, 1], [1, 1], [2, 1], [3, 1]]],
  ["zee", [[1, 0], [2, 0], [2, 1], [3, 1]]],
  ["see", [[2, 0], [1, 0], [1, 1], [0, 1]]],
  ["elLeft", [[1, 0], [1, 1], [2, 1], [3, 1]]],
  ["elRight", [[1, 1], [2, 1], [3, 1], [3, 0]]]
]

const blocktonumber =
{
  "tree": 0,
  "square": 1,
  "bar": 2,
  "zee": 3,
  "see": 4,
  "elLeft": 5,
  "elRight": 6
}

let randombox = [0, 1, 2, 3, 4, 5, 6]

//variables
let score = 0;
let duration;
let downInterval;
let tempMovingItem;
let gameover = false;
let nextblock;
let replay = false;
let holdable = true;

const movingItem = {
  type: "",
  direction: 0,
  top: 0,
  left: 3,
};

const holditem = {
  type: "",
  direction: 0,
  top: 0,
  left: 3,
}

init()

// fUNCTIONS
function init() {
  gameover = false;
  duration = 700;
  score = 0;
  scoreDisplay.innerText = score;
  tempMovingItem = { ...movingItem };
  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  if (replay) {
    const movingBlocks = document.querySelectorAll(".next");
    movingBlocks.forEach(express => {
      express.classList.remove(BLOCKBOX[nextblock][0], "next");
    })
    const holdedBlocks = document.querySelectorAll(".hold");
    holdedBlocks.forEach(express => {
      express.classList.remove(holditem.type, "hold");
    })
  }
  else {
    for (let i = 0; i < 2; i++) {
      prependbox(nextbox);
      prependbox(holdbox);
    }
  }
  nextblock = randomdecide();
  BLOCKBOX[nextblock][1].some(block => {
    const x = block[0];
    const y = block[1];
    for (var i = 0; i < 4; i++) {
      nextbox.childNodes[y].childNodes[0].childNodes[x].classList.add(BLOCKBOX[nextblock][0], "next");
    }
  })
  generateNewBlock();
}

function prependbox(obj) {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < 5; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  li.prepend(ul);
  obj.prepend(li);
}



function prependNewLine() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");
  for (let j = 0; j < GAME_COLS; j++) {
    const matrix = document.createElement("li");
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}

function generateNewBlock(orderbyhold) {
  clearInterval(downInterval);
  downInterval = setInterval(() => { moveBlock('top', 1) }, duration)
  if (duration > 100) {
    duration -= 20;
  }
  if (orderbyhold) {
    movingItem.type = orderbyhold;
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = { ...movingItem };
  } else {
    const blockArray = Object.entries(BLOCKS);
    movingItem.type = blockArray[nextblock][0]
    nextblock = randomdecide();
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = { ...movingItem };
    const movingBlocks = document.querySelectorAll(".next");
    movingBlocks.forEach(express => {
      express.classList.remove(movingItem.type, "next");
    })
    BLOCKBOX[nextblock][1].some(block => {
      const x = block[0];
      const y = block[1];
      for (var i = 0; i < 4; i++) {
        nextbox.childNodes[y].childNodes[0].childNodes[x].classList.add(BLOCKBOX[nextblock][0], "next");
      }
    })
  }

  renderBlocks()
}

function randomdecide() {
  if (randombox.length < 1) {
    for (let i = 0; i < 7; i++) {
      randombox.push(i);
    }
  }
  let randoms = Math.floor(Math.random() * randombox.length);
  let ans = randombox[randoms];
  randombox.splice(randoms, 1);
  return ans;
}

function checkEmpty(target) {
  if (!target || target.classList.contains("seized")) {
    return false;
  }
  return true;
}


function renderBlocks(moveType = "") {
  let possible = true;
  const { type, direction, top, left } = tempMovingItem;
  const arr = [];
  BLOCKS[type][direction].some(block => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
    const isAvailable = checkEmpty(target);
    arr.push([x, y]);
    if (!isAvailable) {
      possible = false;
    }
  })
  if (possible) {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
      moving.classList.remove(type, "moving");
    })
    for (var i = 0; i < 4; i++) {
      playground.childNodes[arr[i][1]].childNodes[0].childNodes[arr[i][0]].classList.add(type, "moving");
    }
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
  }
  else {
    tempMovingItem = { ...movingItem }
    if (moveType === 'retry') {

      clearInterval(downInterval)
      gameover = true;
      showGameoverText()
      return true;
    }
    //sto = setTimeout(() => {
    if (moveType === "top") {
      seizeBlock();
    }
    renderBlocks('retry')

    //}, 0) 
    return true;
  }


}



function seizeBlock() {
  const movingBlocks = document.querySelectorAll(".moving");
  movingBlocks.forEach(moving => {
    moving.classList.remove("moving");
    moving.classList.add("seized");
    moving.classList.add("wave");
  })
  checkMatch()
}

function checkMatch() {
  let bonus = 0;
  const childNodes = playground.childNodes;
  childNodes.forEach(child => {
    let matched = true;
    child.children[0].childNodes.forEach(li => {
      if (!li.classList.contains("seized")) {
        matched = false;
      }
    })
    if (matched) {
      child.remove();
      prependNewLine()
      bonus++;
    }
  })
  if (bonus > 0) {
    score += bonus ** 2;
    scoreDisplay.innerText = score;
  }
  holdable = true;
  generateNewBlock();
}

function hold() {
  let holdnumber = blocktonumber[movingItem.type];
  if (holdable && holditem.type !== BLOCKBOX[holdnumber][0]) {
    const holdedBlocks = document.querySelectorAll(".hold");
    holdedBlocks.forEach(express => {
      express.classList.remove(holditem.type, "hold");
    })
    let beforehold = holditem.type

    holditem.type = BLOCKBOX[holdnumber][0];
    BLOCKBOX[holdnumber][1].some(block => {
      const x = block[0];
      const y = block[1];
      for (var i = 0; i < 4; i++) {
        holdbox.childNodes[y].childNodes[0].childNodes[x].classList.add(BLOCKBOX[holdnumber][0], "hold");
      }
    })
    holdable = false;
    const fallingblocks = document.querySelectorAll(".moving");
    fallingblocks.forEach(falling => {
      falling.classList.remove(movingItem.type, "moving");
    })
    clearInterval(generateNewBlock);
    if (beforehold == "") {
      generateNewBlock();
    }
    else {
      generateNewBlock(beforehold);
    }
  }
}



function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);

}

function changeDirection() {
  const direction = tempMovingItem.direction;
  const left = tempMovingItem.left;
  const type = tempMovingItem.type;
  direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1
  switch (type) {
    case "tree":
      if (left == -1 && direction == 3) {
        tempMovingItem.left++;
        break;
      }
      if(left == 8 && direction == 1){
        tempMovingItem.left--;
        break;
      }
      break;
    case "bar":
      if (direction % 2 == 1) {
        if (left == -2) {
          tempMovingItem.left += 2;
          break;
        }
        if (left == -1) {
          tempMovingItem.left++;
          break;
        }
        if(left == 7){
        tempMovingItem.left--;
        break;
        }
      }
      break;
    case "zee":
      if(left == 8 && direction %2 == 1){
        tempMovingItem.left--;
        break;
      }
      break;
    case "see":
      if(left == 8 && direction %2 == 1){
        tempMovingItem.left--;
        break;
      }
      break;
    case "elLeft":
      if (left == -1 && direction == 3) {
        tempMovingItem.left++;
        break;
      }
      if(left == 8 && direction == 1){
        tempMovingItem.left--;
        break;
      }
      break;
    case "elRight":
      if (left == -1 && direction == 3) {
        tempMovingItem.left++;
        break;
      }
      if(left == 8 && direction == 1){
        tempMovingItem.left--;
        break;
      }
      break;
    default:
      break;
  }
  renderBlocks()
}

function dropBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock("top", 1)
  }, 10)
}

function showGameoverText() {
  finalscoreDisplay.innerText = score;
  gameText.style.display = "flex"
}




document.addEventListener("keyup", e => {
  if (!gameover) {
    switch (e.keyCode) {
      case 38:
        changeDirection();
        break;
      default:
        break;
    }
  }
})

document.addEventListener("keydown", e => {
  if (!gameover) {
    switch (e.keyCode) {
      case 39:
        moveBlock("left", 1);
        break;
      case 37:
        moveBlock("left", -1);
        break;
      case 40:
        moveBlock("top", 1);
        break;
      case 32:
        dropBlock();
        break;
      case 67:

        hold();

      default:
        break;
    }
  }
})

restartButton.addEventListener("click", () => {
  playground.innerHTML = "";
  gameText.style.display = "none"
  replay = true;
  init()
})
