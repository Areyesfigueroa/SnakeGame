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

const updateLeaderboard = () => {
     //Update Leaderboard Data
    if(leaderboard.length === 0) {
        leaderboard.push({...scoreboard});
        leaderboard.push({appleScore: 0, trophyScore: 0});
        leaderboard.push({appleScore: 0, trophyScore: 0});
    } else {
        let replacedScore = null;
        for(let i = 0; i < leaderboard.length; i++) {
            if(replacedScore) {
                let tempScore = {...leaderboard[i]}; //save
                leaderboard[i] = {...replacedScore};

                replacedScore = {...tempScore};
            } else if(scoreboard.appleScore > leaderboard[i].appleScore) {
                let tempScore = {...leaderboard[i]}; //save the current score
                leaderboard[i] = {...scoreboard}; //replace the current score for the new one
                
                replacedScore = {...tempScore};
            }
        }
    }

    displayLeaderboard();
}

const displayLeaderboard = () => {

    let lbAppleScoreEl,lbTrophyScoreEl;
    leaderboard.forEach((score, i) => {
        //Get elements
        lbAppleScoreEl = document.getElementById(`${DOMstrings.lbAppleScore}-${i+1}`);
        lbTrophyScoreEl = document.getElementById(`${DOMstrings.lbTrophyScore}-${i+1}`);

        //Update values
        lbAppleScoreEl.textContent = score.appleScore;
        lbTrophyScoreEl.textContent = score.trophyScore;
    });

}

const drawScoreBoard = () => {

    if(!hasAppleCollided(snake.body[0])) return;
    
    incrementAppleScore(1);

    if(scoreboard.appleScore > scoreboard.trophyScore) incrementTrophyScore(1);

    displayAppleScore(scoreboard.appleScore);
    displayTrophyScore(scoreboard.trophyScore);
}

const resetScoreboard = () => {
    scoreboard.appleScore = 0;
    displayAppleScore(scoreboard.appleScore);
}