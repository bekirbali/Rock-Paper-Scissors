//? not a good idea

// const yourChoice = document.getElementById("your-choice");
// const rockImage = document.querySelector(".rock");
// const paperImage = document.querySelector(".paper");
// const scissorsImage = document.querySelector(".scissors");

// rockImage.addEventListener("click", (w) => {
//   console.log(w);
//   yourChoice.innerHTML = `<img src="./assets/tas.png"></img>`;
// });

// paperImage.addEventListener("click", (w) => {
//   console.log(w);
//   yourChoice.innerHTML = `<img src="./assets/kagit.png"></img>`;
// });

// scissorsImage.addEventListener("click", (w) => {
//   console.log(w);
//   yourChoice.innerHTML = `<img src="./assets/makas.png"></img>`;
// });

const yourChoice = document.getElementById("your-choice");
const pcChoice = document.getElementById("pc-choice");

const select = document.querySelector(".select");

let userSelect;
let pcSelect;

const scoreYou = document.getElementById("you");
const scorePc = document.getElementById("pc");

const resultDiv = document.querySelector(".result-msg");
const containerEl = document.querySelector(".container");
const modalEl = document.querySelector(".modal-container");
const modalBtn = document.querySelector("#modal-ok");

const final = document.querySelector("#final");

select.addEventListener("mousedown", (e) => {
  userSelect = e.target.getAttribute("alt");
  if (userSelect) {
    console.log(userSelect);
    yourChoice.innerHTML = `<img src="./assets/${userSelect}.png"></img>`;
    pc();
  }
});

const pcArr = ["tas", "kagit", "makas"];

const pc = () => {
  let random = Math.floor(Math.random() * 3);
  pcSelect = pcArr[random];
  console.log(pcSelect);
  pcChoice.innerHTML = `<img src="./assets/${pcSelect}.png"></img>`;
  result();
};

const result = () => {
  switch (userSelect) {
    case "tas":
      if (pcSelect === "kagit") {
        lost();
      } else if (pcSelect === "makas") {
        win();
      } else {
        draw();
      }
      break;
    case "kagit":
      if (pcSelect === "makas") {
        lost();
      } else if (pcSelect === "tas") {
        win();
      } else {
        draw();
      }
      break;
    default:
      if (pcSelect === "tas") {
        lost();
      } else if (pcSelect === "kagit") {
        win();
      } else {
        draw();
      }
      break;
  }
  if (scoreYou.innerText == "10") {
    final.innerHTML = "You win";
    document.querySelector(".modal").style.backgroundColor = "#0edbc3";
    modalBtn.style.color = "#0edbc3";
    scoreCheck();
  }

  if (scorePc.innerText == "10" || scoreYou.innerText == "10") {
    modal();
    reload();
  }
};

const lost = () => {
  resultDiv.classList.add("active");
  resultDiv.style.color = "white";
  resultDiv.innerHTML = "You Lost";
  containerEl.style.boxShadow = "0 0 10px 1px #fb778b";
  resultDiv.style.backgroundColor = "#d83049";
  scorePc.innerHTML++;
};

const win = () => {
  resultDiv.classList.add("active");
  resultDiv.style.color = "white";
  resultDiv.innerHTML = "You win";
  containerEl.style.boxShadow = "0 0 10px 1px #5AB7AC";
  resultDiv.style.backgroundColor = "#0edbc3";
  scoreYou.innerHTML++;
};

const draw = () => {
  resultDiv.classList.add("active");
  resultDiv.style.color = "black";
  resultDiv.innerHTML = "Draw";
  containerEl.style.boxShadow = "0 0 10px 1px #ffc538";
  resultDiv.style.backgroundColor = "#ffc538";
};

const modal = () => {
  modalEl.classList.add("show");
};

const reload = () => {
  modalBtn.addEventListener("click", () => {
    window.location.reload();
  });
};

let storagedScore = localStorage.getItem("highScore");
console.log(storagedScore);

let topScore;

if (storagedScore) {
  topScore = `10 - ${storagedScore}`;
} else {
  topScore = "0 - 0";
}

let domTopScore = document.querySelector(".top-score");

domTopScore.innerHTML = `Top Score: ${topScore}`;

const scoreCheck = () => {
  storagedScore || localStorage.setItem("highScore", +scorePc.innerText);
  if (storagedScore >= scorePc.innerText) {
    localStorage.setItem("highScore", scorePc.innerText);
  }
};
