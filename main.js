let count = 0;
let bool = false;
document.querySelectorAll('.case').forEach(function(caseElement) {
    caseElement.addEventListener('click', function(event) {
        var caseClicked = event.target;
        if (caseClicked.textContent == '' && bool !== true){
            if (count%2 == 0){
                caseClicked.textContent = 'X';
                caseClicked.classList.add(`cross`);
            }else {
                caseClicked.textContent = 'O';
                caseClicked.classList.add(`circle`);
            }
            count++;
            let winner = checkWin();
            if (winner !== null){
                afficherGagnant(winner);
                bool = true;
                setTimeout(resetGame,1000 );
            }
            if (count === 9){
                afficherTie();
                setTimeout(resetGame,1000 );
            }
        }
    });
});
function checkWin(){

    for (let i = 1; i <= 3; i++){
        if (checkLigne(i) !== null){
            console.log(checkLigne(i));
            return checkLigne(i);
        }
        if (checkColumn(i) !== null){
            console.log(checkColumn(i));
            return checkColumn(i);
        }
        if (checkDiagoLeft() !== null){
            return checkDiagoLeft();
        }
        if (checkDiagoRight() !== null){
            return checkDiagoRight();
        }
        
    }
    return null;

}
function checkLigne(ligne, i=2){
    let firstSymbol = document.querySelector(`#case${ligne}-1`).textContent;
    
    if (i > 3){
        return firstSymbol;
    }
    let caseContent = document.querySelector(`#case${ligne}-${i}`).textContent;
    if (caseContent !== firstSymbol || firstSymbol === ''){
        return null;
    }
    return checkLigne(ligne, i+1);

    
}
function checkColumn(col, i = 2){
    let firstSymbol = document.querySelector(`#case1-${col}`).textContent;

    if (i > 3){
        return firstSymbol;
    }
    let caseContent = document.querySelector(`#case${i}-${col}`).textContent;
    if (caseContent !== firstSymbol || firstSymbol === ''){
        return null;
    }
    return checkColumn(col, i+1);
}
function checkDiagoLeft(j=2, i=2){
    let firstSymbol = document.querySelector(`#case1-1`).textContent;
    if (i > 3 && j > 3){
        return firstSymbol;
    }
    let caseContent = document.querySelector(`#case${j}-${i}`).textContent;
    if (caseContent !== firstSymbol || firstSymbol === ''){
        return null;
    }
    return checkDiagoLeft(j+1, i+1);

}
function checkDiagoRight(j=2, i=2){
    let firstSymbol = document.querySelector(`#case1-3`).textContent;
    if (i < 1 && j > 3){
        return firstSymbol;
    }
    let caseContent = document.querySelector(`#case${j}-${i}`).textContent;
    if (caseContent !== firstSymbol || firstSymbol === ''){
        return null;
    }
    return checkDiagoRight(j+1, i-1);

}
function afficherGagnant(gagnant) {
    var messageElement = document.querySelector('#alertWin');
    messageElement.textContent = gagnant + " a gagné la partie !";
    messageElement.classList.add(`slow-anim`);
}

function afficherTie() {
    var messageElement = document.querySelector('#alertTie');
    messageElement.textContent ="Egalité, dommage";
    messageElement.classList.add(`slow-anim`);
}
function resetGame(){
    window.location.reload();
}



