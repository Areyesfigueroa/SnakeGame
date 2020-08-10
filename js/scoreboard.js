const scoreboard = {
    appleScore: 0,
    trophyScore: 0    
}

const leaderboard = [];


const incrementAppleScore = (score) => {
    scoreboard.appleScore += score;
}
const incrementTrophyScore = (score) => {
    scoreboard.trophyScore += score;
}

const displayAppleScore = (value) => {
    const appleScoreEl = document.getElementById(DOMstrings.appleScore);
    appleScoreEl.textContent = value;
}
const displayTrophyScore = (value) => {
    const trophyScoreEl = document.getElementById(DOMstrings.trophyScore);
    trophyScoreEl.textContent = value;
}

const updateGameOverScore = () => {
    const gameOverScore = document.getElementById(DOMstrings.gameOverScore);

    gameOverScore.textContent = scoreboard.appleScore;
}

//TODO: Implement Leaderboard Logic
const updateLeaderboard = () => {
    // debugger;
    //Get reference to leaderboard on the gameOver screen.
    const leaderboardEl = document.querySelector(DOMstrings.leaderboard);

    //Update the leaderboard score
    //TODO: Implement Leaderboard Logic
    leaderboard.push({...scoreboard});

    //Display the leaderboard
    leaderboard.forEach((scoreboard, idx) => {
        const html = `
        <li>
            ${idx + 1}.<img src='./assets/apple.png'/>${scoreboard.appleScore}
            <img src='./assets/trophy.png'/>${scoreboard.trophyScore}
        </li>
        `;
       leaderboardEl.insertAdjacentHTML("afterbegin", html);
    });
}

const drawScoreBoard = () => {

    if(!hasAppleCollided(snake.body[0])) return;

    console.log('Update Score');
    incrementAppleScore(1);

    if(leaderboard.length === 0) incrementTrophyScore(1);

    displayAppleScore(scoreboard.appleScore);
    displayTrophyScore(scoreboard.trophyScore);
}