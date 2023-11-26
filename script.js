const candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
const COL_SIZE = 9;
const ROW_SIZE = 9;
const candyList = [];
let draggedTile = "";
let droppedTile = "";
const board = document.getElementById("board");
const audio = new Audio("./sounds/three.mp3");
const audioFour = new Audio("./sounds/four.mp3");
let score = 0;
const sleep = new Promise((res, rej) => {
  setTimeout(() => {
    res("");
  }, 4000);
});
function getCandyColor(candyPosition) {
  const array = candyPosition.src.split("/");
  const strippedColor = array[array.length - 1].split(".")[0];
  return strippedColor;
}
function checkValidMove() {
  //   if (isLeft || isRight) {
  //     const i = position.r1;
  //     for (let j = 0; j < COL_SIZE - 2; j++) {
  //       if (
  //         candyList[i][j].src === candyList[i][j + 1].src &&
  //         candyList[i][j + 1].src === candyList[i][j + 2].src
  //       ) {
  //         return true;
  //       }
  //     }
  //     const k = isLeft ? position.c1 : position.c2;
  //     for (let j = 0; j < ROW_SIZE - 2; j++) {
  //       if (
  //         candyList[j][k].src === candyList[j + 1][k].src &&
  //         candyList[j + 1][k].src === candyList[j + 2][k].src
  //       ) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   }

  //   if (isUp || isDown) {
  //     const i = position.c1;
  //     for (let j = 0; j < ROW_SIZE - 2; j++) {
  //       if (
  //         candyList[j][i].src === candyList[j + 1][i].src &&
  //         candyList[j + 1][i].src === candyList[j + 2][i].src
  //       ) {
  //         return true;
  //       }
  //     }
  //     const k = position.r2;
  //     for (let j = 0; j < COL_SIZE - 2; j++) {
  //       if (
  //         candyList[k][j].src === candyList[k][j + 1].src &&
  //         candyList[k][j + 1].src === candyList[k][j + 2].src
  //       ) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   }

  //check valid four horizontal
  for (let i = 0; i < ROW_SIZE; i++) {
    for (let j = 0; j < COL_SIZE - 3; j++) {
      if (
        candyList[i][j].src === candyList[i][j + 1].src &&
        candyList[i][j + 1].src === candyList[i][j + 2].src &&
        candyList[i][j + 2].src === candyList[i][j + 3].src &&
        !candyList[i][j].src.includes("blank")
      ) {
        return true;
      }
    }
  }

  //check valid four vertical
  for (let i = 0; i < COL_SIZE; i++) {
    for (let j = 0; j < ROW_SIZE - 3; j++) {
      if (
        candyList[j][i].src === candyList[j + 1][i].src &&
        candyList[j + 1][i].src === candyList[j + 2][i].src &&
        candyList[j + 2][i].src === candyList[j + 3][i].src &&
        !candyList[j][i].src.includes("blank")
      ) {
        return true;
      }
    }
  }

  //check valid three horizontal
  for (let i = 0; i < ROW_SIZE; i++) {
    for (let j = 0; j < COL_SIZE - 2; j++) {
      const candy1 = getCandyColor(candyList[i][j]).split("-")[0];
      const candy2 = getCandyColor(candyList[i][j + 1]).split("-")[0];
      const candy3 = getCandyColor(candyList[i][j + 2]).split("-")[0];
      if (
        candy1 === candy2 &&
        candy2 === candy3 &&
        !candyList[i][j].src.includes("blank")
      ) {
        return true;
      }
    }
  }

  //check valid three vertical
  for (let i = 0; i < COL_SIZE; i++) {
    for (let j = 0; j < ROW_SIZE - 2; j++) {
      const candy1 = getCandyColor(candyList[j][i]).split("-")[0];
      const candy2 = getCandyColor(candyList[j + 1][i]).split("-")[0];
      const candy3 = getCandyColor(candyList[j + 2][i]).split("-")[0];
      if (
        candy1 === candy2 &&
        candy2 === candy3 &&
        !candyList[j][i].src.includes("blank")
      ) {
        return true;
      }
    }
  }
  return false;
}
function checkFour() {
  //console.log(candyList[0][0].src);
  //check horizontal
  let isCrushed = false;
  for (let i = 0; i < ROW_SIZE; i++) {
    for (let j = 0; j < COL_SIZE - 3; j++) {
      if (
        candyList[i][j].src === candyList[i][j + 1].src &&
        candyList[i][j + 1].src === candyList[i][j + 2].src &&
        candyList[i][j + 2].src === candyList[i][j + 3].src &&
        !candyList[i][j].src.includes("blank")
      ) {
        candyList[i][j].classList.add("animate");
        candyList[i][j + 1].classList.add("animate");
        candyList[i][j + 2].classList.add("animate");
        candyList[i][j + 3].classList.add("animate");
        candyList[i][j].src = `./images/${getCandyColor(
          candyList[i][j]
        )}-Striped-Horizontal.png`;
        candyList[i][j + 1].src = "./images/blank.png";
        candyList[i][j + 2].src = "./images/blank.png";
        candyList[i][j + 3].src = "./images/blank.png";
        setTimeout(() => {
          candyList[i][j].classList.remove("animate");
          candyList[i][j + 1].classList.remove("animate");
          candyList[i][j + 2].classList.remove("animate");
          candyList[i][j + 3].classList.remove("animate");
        }, 1000);
        score += 20;
        audioFour.play();
        isCrushed = true;
      }
    }
  }

  //check vertical
  for (let i = 0; i < COL_SIZE; i++) {
    for (let j = 0; j < ROW_SIZE - 3; j++) {
      if (
        candyList[j][i].src === candyList[j + 1][i].src &&
        candyList[j + 1][i].src === candyList[j + 2][i].src &&
        candyList[j + 2][i].src === candyList[j + 3][i].src &&
        !candyList[j][i].src.includes("blank")
      ) {
        candyList[j][i].classList.add("animate");
        candyList[j + 1][i].classList.add("animate");
        candyList[j + 2][i].classList.add("animate");
        candyList[j + 3][i].classList.add("animate");
        candyList[j][i].src = `./images/${getCandyColor(
          candyList[j][i]
        )}-Striped-Vertical.png`;
        candyList[j + 1][i].src = "./images/blank.png";
        candyList[j + 2][i].src = "./images/blank.png";
        candyList[j + 3][i].src = "./images/blank.png";
        setTimeout(() => {
          candyList[j][i].classList.remove("animate");
          candyList[j + 1][i].classList.remove("animate");
          candyList[j + 2][i].classList.remove("animate");
          candyList[j + 3][i].classList.remove("animate");
        }, 1000);
        score += 20;
        audioFour.play();
        isCrushed = true;
      }
    }
  }

  return isCrushed;
}

function checkThree() {
  //console.log(candyList[0][0].src);
  //check horizontal
  let isCrushed = false;
  for (let i = 0; i < ROW_SIZE; i++) {
    for (let j = 0; j < COL_SIZE - 2; j++) {
      const candy1 = getCandyColor(candyList[i][j]).split("-")[0];
      const candy2 = getCandyColor(candyList[i][j + 1]).split("-")[0];
      const candy3 = getCandyColor(candyList[i][j + 2]).split("-")[0];
      if (
        candy1 === candy2 &&
        candy2 === candy3 &&
        !candyList[i][j].src.includes("blank")
      ) {
        let strippedPosition = "";
        let isStripped = false;
        let k = j;
        while (k < j + 3) {
          const candyName = getCandyColor(candyList[i][k]);
          if (candyName.includes("Striped")) {
            strippedPosition = candyName.includes("Horizontal") ? "x" : "y";
            isStripped = true;
            break;
          }
          k++;
        }

        if (isStripped) {
          if (strippedPosition === "x") {
            candyList[i].forEach(async (candy) => {
              candy.classList.add("animate");
              //await sleep();
              candy.src = "./images/blank.png";
              setTimeout(() => {
                candy.classList.remove("animate");
              }, 1000);
            });
          } else {
            for (let l = 0; l < ROW_SIZE; l++) {
              candyList[l][k].classList.add("animate");
              //await sleep();
              candyList[l][k].src = "./images/blank.png";
              setTimeout(() => {
                candyList[l][k].classList.remove("animate");
              }, 1000);
            }
            candyList[i][j].src = "./images/blank.png";
            candyList[i][j + 1].src = "./images/blank.png";
            candyList[i][j + 2].src = "./images/blank.png";
          }
          score += 50;
          audioFour.play();
        } else {
          candyList[i][j].classList.add("animate");
          candyList[i][j + 1].classList.add("animate");
          candyList[i][j + 2].classList.add("animate");
          candyList[i][j].src = "./images/blank.png";
          candyList[i][j + 1].src = "./images/blank.png";
          candyList[i][j + 2].src = "./images/blank.png";
          setTimeout(() => {
            candyList[i][j].classList.remove("animate");
            candyList[i][j + 1].classList.remove("animate");
            candyList[i][j + 2].classList.remove("animate");
          }, 1000);
          score += 10;
          audio.play();
        }
        isCrushed = true;
      }
    }
  }

  //check vertical
  for (let i = 0; i < COL_SIZE; i++) {
    for (let j = 0; j < ROW_SIZE - 2; j++) {
      const candy1 = getCandyColor(candyList[j][i]).split("-")[0];
      const candy2 = getCandyColor(candyList[j + 1][i]).split("-")[0];
      const candy3 = getCandyColor(candyList[j + 2][i]).split("-")[0];
      if (
        candy1 === candy2 &&
        candy2 === candy3 &&
        !candyList[j][i].src.includes("blank")
      ) {
        let isStripped = false;
        let strippedPosition = "";
        let k = j;
        while (k < j + 3) {
          const candyName = getCandyColor(candyList[k][i]);
          if (candyName.includes("Striped")) {
            strippedPosition = candyName.includes("Horizontal") ? "x" : "y";
            isStripped = true;
            break;
          }
          k++;
        }

        if (isStripped) {
          if (strippedPosition === "x") {
            candyList[k].forEach(async (candy) => {
              candy.classList.add("animate");
              //await sleep();
              candy.src = "./images/blank.png";
              setTimeout(() => {
                candy.classList.remove("animate");
              }, 1000);
            });
            candyList[j][i].src = "./images/blank.png";
            candyList[j + 1][i].src = "./images/blank.png";
            candyList[j + 2][i].src = "./images/blank.png";
          } else {
            for (let l = 0; l < ROW_SIZE; l++) {
              candyList[l][i].classList.add("animate");
              //await sleep();
              candyList[l][i].src = "./images/blank.png";
              setTimeout(() => {
                candyList[l][i].classList.remove("animate");
              }, 1000);
            }
          }
          score += 50;
          audioFour.play();
        } else {
          candyList[j][i].classList.add("animate");
          candyList[j + 1][i].classList.add("animate");
          candyList[j + 2][i].classList.add("animate");
          candyList[j][i].src = "./images/blank.png";
          candyList[j + 1][i].src = "./images/blank.png";
          candyList[j + 2][i].src = "./images/blank.png";
          setTimeout(() => {
            candyList[j][i].classList.remove("animate");
            candyList[j + 1][i].classList.remove("animate");
            candyList[j + 2][i].classList.remove("animate");
          }, 1000);
          score += 10;
          audio.play();
        }
        isCrushed = true;
      }
    }
  }

  return isCrushed;
}

function slideCandy() {
  for (let i = 0; i < COL_SIZE; i++) {
    let ind = ROW_SIZE - 1;
    for (let j = ROW_SIZE - 1; j >= 0; j--) {
      if (!candyList[j][i].src.includes("blank")) {
        candyList[ind][i].src = candyList[j][i].src;
        ind--;
      }
    }
    for (let k = ind; k >= 0; k--) {
      candyList[k][i].src = `./images/${getRandomCandy()}.png`;
    }
  }
}
function generateCandy() {
  for (let c = 0; c < COL_SIZE; c++) {
    if (candyList[0][c].src.includes("blank")) {
      candyList[0][c].src = `./images/${getRandomCandy()}.png`;
    }
  }
}
function getRandomCandy() {
  return candies[Math.floor(Math.random() * candies.length)];
}

function dragStart(event) {
  draggedTile = this;
}

function dragOver(event) {
  event.preventDefault();
  //console.log(event.target);
}

function dragEnter(event) {
  //console.log("enter", event.target);
}

function dragLeave(event) {
  //console.log("leave", event.target);
}

function dragDrop(event) {
  droppedTile = this;
  //console.log("drop", event.target);
}
function touchStart(event) {
  draggedTile = this;
}

function touchEnd(event) {
  droppedTile = this;
  dragEnd();
}

function dragEnd() {
  //console.log("end", event.target);

  if (draggedTile.src.includes("blank") || droppedTile.src.includes("blank"))
    return;
  const [r1, c1] = draggedTile.id.split("-").map((e) => parseInt(e));
  const [r2, c2] = droppedTile.id.split("-").map((e) => parseInt(e));
  const position = {
    r1,
    c1,
    r2,
    c2,
  };
  const moveleft = r2 === r1 && c2 === c1 - 1;
  const moveRight = r2 === r1 && c2 === c1 + 1;
  const moveUp = r2 === r1 - 1 && c2 === c1;
  const moveDown = r2 === r1 + 1 && c2 === c1;

  const isAdjacant = moveleft || moveRight || moveUp || moveDown;
  if (isAdjacant) {
    const draggedImage = draggedTile.src;
    const droppedImage = droppedTile.src;
    draggedTile.src = droppedImage;
    droppedTile.src = draggedImage;
    //checkThree();
    const isValid = checkValidMove();
    if (!isValid) {
      const draggedImage = draggedTile.src;
      const droppedImage = droppedTile.src;
      draggedTile.src = droppedImage;
      droppedTile.src = draggedImage;
      return;
    }
    while (true) {
      const four = checkFour();
      const three = checkThree();
      if (!four && !three) break;
      document.getElementById("score").innerText = score;
      slideCandy();
    }
  }
}

async function init() {
  for (let i = 0; i < ROW_SIZE; i++) {
    const row = [];
    for (let j = 0; j < COL_SIZE; j++) {
      const tile = document.createElement("img");
      tile.id = `${i}-${j}`;
      tile.className = "candy";
      tile.setAttribute("draggable", true);
      tile.src = `./images/${getRandomCandy()}.png`;
      tile.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
      tile.addEventListener("dragover", dragOver); //clicking on candy, moving mouse to drag the candy
      tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
      tile.addEventListener("dragleave", dragLeave); //leave candy over another candy
      tile.addEventListener("drop", dragDrop); //dropping a candy over another candy
      tile.addEventListener("dragend", dragEnd); //after drag process completed, we swap candies

      //touch events for mobile
      tile.addEventListener("touchstart", touchStart); //click on a candy, initialize drag process
      tile.addEventListener("touchend", touchEnd); //clicking on candy, moving mouse to drag the candy
      row.push(tile);

      board.appendChild(tile);
    }
    candyList.push(row);
  }

  //   const audioElement = document.getElementById("notifypop");
  //   console.log(audioElement);
  //   audioElement.loop = true;
  //   audioElement.play();
}

// window.onload = () => {
//   console.log("hi");

//   init();
//   while (true) {
//     console.log("loopinit");
//     const four = checkFour();
//     const three = checkThree();
//     console.log(four, three);
//     if (!four && !three) break;
//     slideCandy();
//   }
// };

document.getElementById("play").addEventListener(
  "click",
  (event) => {
    event.target.style.display = "none";
    const audio = new Audio("./sounds/theme_song.mp3");
    audio.loop = true;
    audio.play();
    document.getElementById("wrapper").style.display = "block";
    init();
    while (true) {
      const four = checkFour();
      const three = checkThree();
      if (!four && !three) break;
      document.getElementById("score").innerText = score;
      slideCandy();
    }
  },
  { once: true }
);
