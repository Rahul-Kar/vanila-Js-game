// constants and variables
const player = document.querySelector(".player");
const enemy = document.querySelector(".enemy");
const game_over = document.querySelector(".gameOver_Box");
const scorContent = document.querySelector(".score");
const btn = document.querySelector(".btn");
 const bgMusic = new Audio('bgMusic.mp3');
 const gameOverMusic = new Audio('Gameover.mp3');
score = 0;
cross = true;

setTimeout(() => {
  bgMusic.play()
}, 1000);

// keyDown events
document.addEventListener("keydown", (e) => {
  console.log("keycode is ", e.keyCode);
  if (e.keyCode == 38) {
    player.classList.add("animatePlayer");
    setTimeout(() => {
      player.classList.remove("animatePlayer");
    }, 700);
  }

  if (e.keyCode === 37) {
    player.classList.add("player_rotate");
    plX = parseInt(
      window.getComputedStyle(player, null).getPropertyValue("left")
    );
    player.style.left = plX - 112 + "px";
  }
  if (e.keyCode === 39) {
    player.classList.remove("player_rotate");
    plX = parseInt(
      window.getComputedStyle(player, null).getPropertyValue("left")
    );
    player.style.left = plX + 140 + "px";
  }
});

// main logic
setInterval(() => {
  plX = parseInt(
    window.getComputedStyle(player, null).getPropertyValue("left")
  );
  plY = parseInt(window.getComputedStyle(player, null).getPropertyValue("top"));

  enX = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("left"));
  enY = parseInt(window.getComputedStyle(enemy, null).getPropertyValue("top"));

  offsetX = Math.abs(plX - enX);
  offsetY = Math.abs(plY - enY);
  // console.log(offsetY , offsetX)
  if (offsetX < 123 && offsetY < 52) {
    enemy.classList.remove("animateEnemy");
    game_over.style.visibility = "visible";
    bgMusic.pause()
    gameOverMusic.play()
    setTimeout(() => {
      gameOverMusic.pause()
    }, 4000);
  } 
  else if (offsetX < 100 && cross) {
    score += 1;
    setScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);

    setTimeout(() => {
      duration = parseFloat(
        window
          .getComputedStyle(enemy, null)
          .getPropertyValue("animation-duration")
      );
      newDuration = duration - 0.1;
      enemy.style.animationDuration = newDuration + "s";
    }, 500);
  }
}, 10);

const setScore = (score) => {
  scorContent.innerHTML = `Your score: ${score}`;
};
btn.addEventListener("click", () => {
  window.location.reload();
});
