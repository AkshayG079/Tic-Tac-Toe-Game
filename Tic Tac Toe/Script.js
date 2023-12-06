// Elements Delecration
const buttons = document.querySelectorAll(".button");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const popup = document.querySelector(".popup");
const newGameBtn = document.getElementById('newGame');
const starterWindow = document.getElementById("starter");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const startBtnPlayer = document.getElementById("startBtnPP");
const startBtnComp = document.getElementById("startBtnPC");
const playerShow = document.getElementById("playerShow");
const selectPlayer = document.getElementsByName("player");
const singlePlayerBtn = document.getElementById("singlePlayerBtn");
const twoPlayerBtn = document.getElementById("twoPlayerBtn");
const singlePlayerShow = document.getElementById("singlePlayerShow");
const twoPlayerShow = document.getElementById("twoPlayerShow");
const starterDisplay = document.getElementById("starterDisplay");
const compInputPlayer = document.getElementById("playerComp");
const result = document.getElementById("result");
const backbtn = document.getElementById("backbtn");

let condition = true;
let singlePlayer = false;
let IsTurnX = true;
let yourTurn = false;
let chance = false;
let randomNumArr = [];
let count = 0, X1 = "", X2 = "";
let winCount1 = 0, winCount2 = 0, clearAll;
let CheckFirst = 0;

const start = () => {
    starterWindow.classList.add("active");
}

// window reoad or first time user play the game then first page show
window.onload = start;

singlePlayerBtn.addEventListener("click", () => {
    singlePlayerShow.style.display = "flex";
    starterDisplay.style.display = "none";
    backbtn.style.display = "block";
    singlePlayer = true;
});

twoPlayerBtn.addEventListener("click", () => {
    twoPlayerShow.style.display = "block";
    starterDisplay.style.display = "none";
    backbtn.style.display = "block";
    singlePlayer = false;
});

backbtn.addEventListener("click", () => {
    if (singlePlayerShow.style.display == "flex") {
        singlePlayerShow.style.display = "none";
        starterDisplay.style.display = "block";
        compInputPlayer.value = "";
        HideBackBtn();
    } else if (twoPlayerShow.style.display == "block") {
        twoPlayerShow.style.display = "none";
        starterDisplay.style.display = "block";
        player1.value = "";
        player2.value = "";
        HideBackBtn();
    }
    if (singlePlayer == true && starterWindow.style.visibility == "hidden") {
        starterWindow.style.visibility = "visible"
        singlePlayerShow.style.display = "flex";
        starterDisplay.style.display = "none";
        newGame();
        HideBackBtn();
    }
    if (singlePlayer != true && starterWindow.style.visibility == "hidden") {
        starterWindow.style.visibility = "visible"
        twoPlayerShow.style.display = "block"
        starterDisplay.style.display = "none";
        newGame();
        HideBackBtn();
    }
});

startBtnPlayer.addEventListener("click", () => {
    if ((player1.value != "") && (player2.value != "")) {
        playerSelect();
        starterWindow.style.visibility = "hidden";
        backbtn.classList.remove("backbtn");
        backbtn.classList.add("backbtn_active");
    }
    if (X1 == "X") {
        result.innerHTML = `<span> ${player1.value} : ${winCount1} </span> <span>  ${player2.value} :  ${winCount2} </span>`;
    } else {
        result.innerHTML = ` <span>  ${player2.value} :  ${winCount2} </span><span> ${player1.value} : ${winCount1} </span>`;
    }
});

startBtnComp.addEventListener("click", () => {
    if (compInputPlayer.value != "") {
        starterWindow.style.visibility = "hidden";
        backbtn.classList.remove("backbtn");
        backbtn.classList.add("backbtn_active");
    };
    X1 = "X";
    result.innerHTML = `<span> ${compInputPlayer.value} : ${winCount1} </span> <span> Computer :  ${winCount2} </span>`;
});

newGameBtn.addEventListener("click", newGame);
restartBtn.addEventListener("click", newGame);

// display X/O on click
buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        if (!singlePlayer) {
            //if player select 1 turn
            if (yourTurn) {
                if (chance) {
                    playerShow.innerHTML = `${player1.value} turn`;
                } else {
                    playerShow.innerHTML = `${player2.value} turn`;
                }
            }

            if (IsTurnX) {
                IsTurnX = false;
                btn.innerHTML = "X";
                btn.disabled = true;
                chance = true;
            } else {
                IsTurnX = true;
                btn.innerHTML = "O";
                btn.disabled = true;
                chance = false;
            }

            //if player select 2 turn
            if (!yourTurn) {
                if (chance) {
                    playerShow.innerHTML = `${player1.value} turn`;
                } else {
                    playerShow.innerHTML = `${player2.value} turn`;
                }
            }

            count += 1;
            if (count == 9) {
                popup.classList.add("active");
                message.innerText = "Its a Draw";
            }

            //Check for win on every click
            winChecker();
        } else {
            let isO = false;
            count += 1;
            if (IsTurnX) {
                IsTurnX = count == 5 ? true : false;
                btn.innerHTML = "X";
                btn.disabled = true;
                randomNumArr.push(index);
                isO = true;
                condition = true;
                winChecker();
            }

            if (isO && condition) {
                clearAll = setTimeout(() => {
                    turnsO();
                    winChecker();
                }, 400);
            }

            function turnsO() {
                if (!IsTurnX) {
                    let number = randomNum();
                    buttons[number].innerHTML = "O";
                    buttons[number].disabled = true;
                    IsTurnX = true;
                    isO = false;
                }
            }

            // draw the match
            if (randomNumArr.length == 9 && condition) {
                popup.classList.add("active");
                message.innerText = "Its a Draw";
                randomNumArr = [];
            }
        }
    });
});

let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const winChecker = () => {
    for (let i of winningPattern) {
        let [btn1, btn2, btn3] = [buttons[i[0]].innerText, buttons[i[1]].innerText, buttons[i[2]].innerText];
        if ((btn1 != "") && (btn2 != "") && (btn3 != "")) {
            if (btn1 == btn2 && btn2 == btn3) {
                condition = false;
                CheckFirst++;
                // disabled all buttons when wins
                buttons.forEach((btns) => {
                    btns.disabled = true;
                });

                if (CheckFirst != 2) {
                    if (singlePlayer) {
                        if (X1 == btn1) {
                            winCount1 += 1;
                            result.innerHTML = `<span> ${compInputPlayer.value} : ${winCount1} </span> <span> Computer :  ${winCount2} </span>`;
                            message.innerText = `${compInputPlayer.value} Wins `;
                        } else {
                            winCount2 += 1;
                            result.innerHTML = `<span>${compInputPlayer.value} : ${winCount1} <span> </span> Computer :  ${winCount2}`;
                            message.innerText = "Computer Wins";
                        }
                    } else {
                        if (X1 == "X") {
                            if (X1 == btn1) {
                                winCount1 += 1;
                                result.innerHTML = `<span> ${player1.value} : ${winCount1} </span> <span>  ${player2.value} :  ${winCount2} </span>`;
                                playerShow.innerHTML = `${player1.value} wins`;
                                message.innerText = ` ${player1.value} Wins `;
                            } else {
                                winCount2 += 1;
                                result.innerHTML = `<span> ${player1.value} : ${winCount1} </span> <span>  ${player2.value} :  ${winCount2} </span>`;
                                playerShow.innerHTML = `${player2.value} wins`;
                                message.innerText = ` ${player2.value} Wins `;
                            }
                        } else if (X2 == "X") {
                            if (X2 == btn1) {
                                winCount1 += 1;
                                result.innerHTML = `<span>  ${player2.value} :  ${winCount1} </span><span> ${player1.value} : ${winCount2} </span> `;
                                playerShow.innerHTML = `${player2.value} wins`;
                                message.innerText = ` ${player2.value} Wins `;
                            } else {
                                winCount2 += 1;
                                result.innerHTML = `<span>  ${player2.value} :  ${winCount1} </span><span> ${player1.value} : ${winCount2} </span> `;
                                playerShow.innerHTML = `${player1.value} wins`;
                                message.innerText = ` ${player1.value} Wins`;
                            }
                        }
                    }
                    setTimeout(() => {
                        popup.classList.add("active");
                    }, 200);

                } else if (CheckFirst == 2) {
                    CheckFirst = 0;
                }
            }
        }
    }
};

function newGame() {
    clearTimeout(clearAll);
    buttons.forEach((btn) => {
        btn.innerText = "";
        btn.disabled = false;
        IsTurnX = true;
    })
    if (!singlePlayer) {
        playerSelect();
    }
    condition = true;
    CheckFirst = 0;
    count = 0;
    randomNumArr = [];
    popup.classList.remove("active");
    selectPlayer[0].checked = true;
    selectPlayer[1].checked = false;
}

function HideBackBtn() {
    playerShow.innerHTML = "";
    if (starterDisplay.style.display == "block") {
        backbtn.style.display = "none";
    }
    if (singlePlayerShow.style.display == "flex") {
        backbtn.style.display = "block";
        backbtn.classList.remove("backbtn_active");
        backbtn.classList.add("backbtn");
    }
    if (twoPlayerShow.style.display == "block") {
        backbtn.style.display = "block";
        backbtn.classList.remove("backbtn_active");
        backbtn.classList.add("backbtn");
    }
    winCount1 = 0;
    winCount2 = 0;
    selectPlayer[0].checked = true;
    selectPlayer[1].checked = false;
}

// check which player turns 1st 
function playerSelect() {
    selectPlayer.forEach((element) => {
        if (element.checked) {
            if (element.value == "player1") {
                playerShow.innerHTML = `${player1.value} turn`;
                chance = false;
                yourTurn = true;
                X1 = "X";
                X2 = "";
            } else {
                playerShow.innerHTML = `${player2.value} turn`;
                chance = true;
                yourTurn = false;
                X2 = "X";
                X1 = "";
            }
        }
    });
}

// check any duplicate value occur
function hasDuplicate(arr) {
    return arr.filter((item, index) => arr.indexOf(item) !== index).length > 0;
}

// non repeating value when random function use
function randomNum() {

    let randomNum = Math.round(Math.random() * 8);
    if (hasDuplicate(randomNumArr)) {
        randomNum = Math.round(Math.random() * 8);
    }

    if (!(randomNumArr.includes(randomNum))) {
        randomNumArr.push(randomNum);
    } else {
        let i = 0;
        while (i < 1) {
            randomNum = Math.round(Math.random() * 8);
            if (!(randomNumArr.includes(randomNum))) {
                randomNumArr.push(randomNum);
                break;
            }
        }
    }
    return randomNum;
}
