let round = 0;
let totalScore = [];

function createPlayer() {
    let playerNames = document.getElementById("player").value;
    if(playerNames === '') {
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

    playerFormsDiv.innerHTML += `<button id="scoreSubmit" onclick="submitScore()">Xác nhận kết quả trận</button> <br>`

    players.forEach((name) => totalScore.push({ name: name, score: 0 }));
}
function submitScore() {
    let numPlayer = document.getElementById("player").value.split(',').length;
    let player = [];
    for(let i = 0; i < numPlayer; i++) {

        let playersScore = {
            name: document.getElementById(`playerName${i}`).innerText,
            score: document.getElementById(`player${i}`).value
        };
        player.push(playersScore);
    }
    totalScore.forEach((player, index) => {
        player.score += parseInt(document.getElementById(`player${index}`).value);
    });

    for(let i = 0; i < numPlayer; i++) { 
        document.getElementById(`player${i}`).value = 0;
    }
    showResult(player);
}

function showResult(resultPlayers) {
    let element = document.getElementById('result');
    element.innerHTML += `<h4>Trận ${++round}</h4>`
    resultPlayers.forEach((result) => {
      let newRow = document.createElement('div');
      newRow.innerText = `${result.name} : ${result.score}`
      element.appendChild(newRow);
    });
}

function totalScoreLast() {
    let totalScorePlayer = document.getElementById("total");

    let playerScoreDiv = "";
    totalScore.forEach((name, index) => {
       playerScoreDiv += `
        <p>${name.name} : ${name.score}</p>
        `;

      totalScorePlayer.innerHTML = playerScoreDiv;
    });
}
