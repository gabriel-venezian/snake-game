'use strict';

window.onload = function() {
  const stage = document.getElementById('stage');
  const context = stage.getContext('2d');
  document.addEventListener('keydown', keyPush);
  setInterval(game, 80);

  const speed = 1;
  
  let speedX = 0, speedY = 0;
  let pointX = 10, pointY = 15;
  let pieceLength = 20;
  let pieceQuantity = 20;
  let appleX = 15, appleY = 15;

  let trail = [];
  let tail = 3;

  function game() {
    pointX += speedX;
    pointY += speedY;

    if (pointX < 0) {
      pointX = pieceQuantity -1;
    };
    if (pointX > pieceQuantity -1) {
      pointX = 0;
    };
    if (pointY < 0) {
      pointY = pieceQuantity -1;
    };
    if (pointY > pieceQuantity -1) {
      pointY = 0;
    };
  
    context.fillStyle = 'black';
    context.fillRect(0, 0, stage.width, stage.height);

    context.fillStyle = 'red';
    context.fillRect(appleX * pieceLength, appleY * pieceLength, pieceLength, pieceLength);

    context.fillStyle = 'green';
    for (let i = 0; i < trail.length; i++) {
      context.fillRect(trail[i].x * pieceLength, trail[i].y * pieceLength, pieceLength -1, pieceLength -1);

      if (trail[i].x == pointX && trail[i].y == pointY) {
        speedX = speedY = 0;
        tail = 3;
      };
    };

    trail.push({x: pointX, y:pointY});
    
    while (trail.length > tail) {
      trail.shift();
    };

    if (appleX == pointX && appleY == pointY) {
      tail++;
      appleX = Math.floor(Math.random() * pieceQuantity);
      appleY = Math.floor(Math.random() * pieceQuantity);
    };

  };

  function keyPush(event) {
    switch (event.keyCode) {
      case 37: // left
        speedX = -speed;
        speedY = 0;
        break;
      case 38: // up
        speedX = 0;
        speedY = -speed;
        break;
      case 39: // right
        speedX = speed;
        speedY = 0;
        break;
      case 40: // down
        speedX = 0;
        speedY = speed;
        break;
    };
  };
};
