var round = 0;
var totalScore = [];
var totalData = [];

function createPlayer() {
    let playerNames = document.getElementById("player").value;
    if (playerNames === '') {
        alert('Vui lòng nhập tên người chơi');
        return;
    }
    let players = playerNames.split(',');

    let playerFormsDiv = document.getElementById("playersForm");

    players.forEach((name, index) => {
        let playerForm = `
      <label id="playerName${index}" >${name}</label> 
      <input type="number" id="player${index}" name="player${index}}"> 
      <br>
    `;

        playerFormsDiv.innerHTML += playerForm;
    });

    playerFormsDiv.innerHTML += `<button id="scoreSubmit" onclick="submitScore()">Xác nhận kết quả trận</button> <br>`;

    players.forEach((name) => totalScore.push({ name: name, score: 0 }));
}

function submitScore() {
    let numPlayer = document.getElementById("player").value.split(',').length;
    let player = [];
    for (let i = 0; i < numPlayer; i++) {

        let playersScore = {
            name: document.getElementById(`playerName${i}`).innerText,
            score: document.getElementById(`player${i}`).value
        };
        player.push(playersScore);
    }

    caculatorTotalScore();

    for (let i = 0; i < numPlayer; i++) {
        document.getElementById(`player${i}`).value = 0;
    }
    showResult(player);
}

function showResult(resultPlayers) {
    round++;
    let element = document.getElementById('result');
    element.innerHTML += `
    <div id="${round}">
        <h4 style="display: inline-block">Trận ${round}</h4> 
        <button onclick="deleteResult('${round}')">X</button>
        ${resultPlayers.map(result => `<p>${result.name} : ${result.score}</p>`).join('')}
    </div>`;
    resultPlayers.forEach(result => totalData.push({ name: result.name, score: result.score, round: round }));
}

function deleteResult(roundId) {
    let element = document.getElementById(roundId);
    element.parentNode.removeChild(element);
    let scoreRoundDelete = totalData.filter(data => data.round == roundId);
    totalScore.map((value) => {
        scoreRoundDelete.forEach((data) => {
            if (value.name.trim() == data.name.trim()) {
                value.score -= data.score;
            }
        })
    })
}

function caculatorTotalScore() {
    totalScore.forEach((player, index) => {
        player.score += parseInt(document.getElementById(`player${index}`).value);
    });
}

function totalScoreLast() {
    let totalScorePlayer = document.getElementById("total");

    let playerScoreDiv = "";
    totalScore.forEach((value) => {
        playerScoreDiv += `<p>${value.name} : ${value.score}</p>`;
        totalScorePlayer.innerHTML = playerScoreDiv;
    });
}