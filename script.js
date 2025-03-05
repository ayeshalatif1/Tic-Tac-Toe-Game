document.addEventListener("DOMContentLoaded", () => {

    let boxes = document.querySelector(".boxes");
    let buttons = document.querySelectorAll(".box");
    let winner = document.querySelector("#winner");
    let popup = document.querySelector(".popup");
    let reset = document.querySelector("#reset");
    let winPatterns = [
        [0, 1, 2], [0, 3, 6], [0, 4, 8],
        [1, 4, 7], [2, 5, 8], [2, 4, 6],
        [3, 4, 5], [6, 7, 8]
    ];
    let player0 = true;   //first turn will be of player 0 
    let count = 0;      //to track no. of clicked btns

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (player0 == true) {
                btn.innerText = "0";
                btn.style.color = "#2e3518";
                player0 = false;
                count++;
            }
            else {
                btn.innerText = "X";
                btn.style.color = "brown";
                player0 = true;
                count++;
            }
            btn.disabled = true;   //so that after clicking a btn it got disabled
            checkWinner(count);

        });
    });

    //iterates through winning patterns to find winner
    const checkWinner = (count) => {
        for (let pattern of winPatterns) {   //iterated through winning patterns
            let pos1 = buttons[pattern[0]].innerText;       //fetch value present at current positions
            let pos2 = buttons[pattern[1]].innerText;
            let pos3 = buttons[pattern[2]].innerText;
            if (pos1 != "" && pos2 != "" && pos3 != "") {   //check for empty values
                if (pos1 === pos2 && pos2 === pos3) {    //check if condition met
                    displaywinner(pos1);
                   // disablebtns();  
                    return;
                }
            }
        }
        if (count === 9) {      //if all btn have been clicked
            gameend();      //end game if winner has not foun
        }
    };

    //display popup to declare winner
    function displaywinner(pos1) {
        popup.style.visibility = "visible";
        // buttons.forEach(btn => { btn.style.cursor = "none" });
        document.getElementById("congrats").innerHTML = "Congratulations !";
        winner.innerText = `player ${pos1} is winner`;
        boxes.style.opacity = "0.5";
    }

    //if all btns have been clicked, but winning condition has not mwt
    function gameend() {
        popup.style.visibility = "visible";
        document.getElementById("congrats").innerHTML = "Game Ended !";
        winner.innerText = "Its a draw!";

    }

    //after one game, if player wants to play again
    document.querySelector("#playagain").addEventListener("click", () => {
        popup.style.visibility = "hidden";
        player0 = true;
        count = 0;
        boxes.style.opacity = "1";
        disablebtns();
    });

    //reset game when player clicks on clear btn
    reset.addEventListener("click", () => {
        player0 = true;
        count = 0;
        disablebtns();

    });
    function disablebtns(){
        buttons.forEach((btn) => {
            btn.innerText = "";
            btn.disabled = false;
            // btn.style.cursor = "pointer";
        })
    }
});