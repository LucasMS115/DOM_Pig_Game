/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previous, toWin;

toWin = document.getElementById('toWin').value;
console.log(toWin);

newGame();

//anonymous function (can't be called again)
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //ramdom number
        var dice = Math.floor((Math.random()*6)+1);
        var dice2 = Math.floor((Math.random()*6)+1);

        //show the result
        var diceDOM = document.querySelector('.dice');
        var dice2DOM = document.querySelector('.dice2')
        diceDOM.src = 'dice-' + dice + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';
        diceDOM.style.display = 'block';
        dice2DOM.style.display = 'block'

        //update the score
        if(dice !== 1 && dice2 !== 1){
            roundScore += (dice + dice2); //roud
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            if(dice === 6 && dice2 === 6){
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = 0;
                playerChange();
            }
        }else{
            playerChange();
        }
    }
    

});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //add current to global
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //check winner
        if(scores[activePlayer] >= toWin ){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none'; 
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;
        }else{
            playerChange();
        };
    }
   
});

document.querySelector('.btn-toWin').addEventListener('click', function(){
    toWin = document.getElementById('toWin').value;
    alert('The game will restart with the new "Points to Win".');
    newGame();
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function playerChange(){
    roundScore = 0;
    previous = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function newGame(){
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0; 

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = 0; // faster then querySelector
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


//------------- Some code lines we saw but waren't used in this aplication ----------------------

//document.querySelector('#current-'+activePlayer).textContent = activePlayer; //# -> id selector = css
//document.querySelector('.dice').style.display = 'none'; // '.' -> class selector
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '<\em>';

/*var test = document.querySelector('#name-0').textContent;
console.log(test);*/

//callback function (is called by another function)
/*function test(){ console.log('Without the parenthesis!');}
document.querySelector('.btn-roll').addEventListener('click', test);*/

//document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
