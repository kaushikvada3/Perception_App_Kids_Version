let selections = {};
let score = 0;
let task = 0;
let correctAnswer = '';

document.getElementById('numTries').oninput = e => {
  document.getElementById('numVal').textContent = e.target.value;
};

document.getElementById('stimDur').oninput = e => {
  document.getElementById('stimVal').textContent = e.target.value;
};

document.getElementById('outcomeDur').oninput = e => {
  document.getElementById('outVal').textContent = e.target.value;
};

document.querySelectorAll('.animal').forEach(animal => {
  animal.addEventListener('click', () => {
    document.querySelectorAll('.animal').forEach(a => a.classList.remove('selected'));
    animal.classList.add('selected');
    selections.difficulty = animal.dataset.difficulty;
  });
});

document.getElementById('startBtn').addEventListener('click', () => {
  const diff = document.querySelector('.animal.selected');
  if (!diff) return alert("Please select a difficulty!");
  
  selections.numTries = parseInt(document.getElementById('numTries').value);
  selections.stimDuration = parseInt(document.getElementById('stimDur').value);
  selections.outcomeDuration = parseInt(document.getElementById('outcomeDur').value);
  selections.soundOn = document.getElementById('sound').checked;
  selections.difficulty = diff.dataset.difficulty;

  startGame();
});

function startGame() {
  score = 0;
  task = 0;
  document.getElementById('config').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  nextTask();
}

function nextTask() {
  if (task >= selections.numTries) return endGame();

  task++;
  document.getElementById('task').textContent = `Task ${task}`;
  const animal = document.getElementById('animalMove');
  let img;

  switch (selections.difficulty) {
    case 'easy': img = 'https://i.ibb.co/3Ybd5VX/turtle-stripes.png'; break;
    case 'medium': img = 'https://i.ibb.co/t8ckpVJ/cat-stripes.png'; break;
    case 'hard': img = 'https://i.ibb.co/sK6pXv7/owl-stripes.png'; break;
    default: img = 'https://i.ibb.co/KDPCr19/monkey-stripes.png'; break;
  }

  animal.src = img;

  const left = Math.random() > 0.5;
  correctAnswer = left ? 'Q' : 'P';

  animal.style.left = left ? '100%' : '-100px';
  animal.style.animation = left ? 'moveLeft 5s linear forwards' : 'moveRight 5s linear forwards';
}

window.handleResponse = function(letter) {
  const feedback = document.getElementById('feedback');
  feedback.classList.remove('hidden');
  feedback.textContent = (letter === correctAnswer) ? 'Great Job! 🎉' : 'Oops! Try Again!';
  if (letter === correctAnswer) score++;

  document.getElementById('scoreText').textContent = `Score: ${score}`;
  setTimeout(() => {
    feedback.classList.add('hidden');
    nextTask();
  }, selections.outcomeDuration * 1000);
};

function endGame() {
  document.getElementById('game').classList.add('hidden');
  document.getElementById('gameOver').classList.remove('hidden');
  document.getElementById('finalScore').textContent = `Final Score: ${score} out of ${selections.numTries}`;
}