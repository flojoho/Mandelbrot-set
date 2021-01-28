const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

let iteration = 1;

const x = [];
const y = [];

const pixels = [];

const update = [];

c.fillStyle = "#000000";
c.fillRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i <= canvas.width; i++) {
  x[i] = [];
  y[i] = [];
  update[i] = [];
  for(let j = 0; j <= canvas.height; j++) {
    const coordinates = scaleAndShift({x: i, y: j});
    x[i][j] = coordinates.x;
    y[i][j] = coordinates.y;
    update[i][j] = 1;

    pixels.push({
      x: coordinates.x,
      y: coordinates.y,
      canvasX: i,
      canvasY: j
    })
  }
}

setInterval(function() {
  for (let i = 0; i <= canvas.width; i++) {
    for(let j = 0; j <= canvas.height; j++) {
      if(update[i][j] !== 0) {

        const nextIteration = getNextIteration(
          scaleAndShift({x: i, y: j}),
          { x: x[i][j], y: y[i][j] }
        );

        x[i][j] = nextIteration.x;
        y[i][j] = nextIteration.y;

        const lengthSquared = x[i][j] ** 2 + y[i][j] ** 2;
        
        if(lengthSquared <= 4) {
          if(update[i][j] !== 1) {
            update[i][j] += 1;
          }
        } else if(update[i][j] === 1) {
          update[i][j] += 1;
        } else {
          update[i][j] = 0;
        }
        
        if(update[i][j] > 1) {
          c.fillStyle = "hsl(" + (iteration + 250) + ", 100%, 50%)";
          c.fillRect(i, j, 1, 1);
        }
      }
    }
  }
  
  iteration++;
}, 100);

function scaleAndShift(vector) {
  const x = (vector.x - canvas.width / 2 - 100) / (canvas.height / 3);
  const y = (vector.y - canvas.height / 2) / (canvas.height / 3);
  return { x, y };
}

function getNextIteration(position, value) {
  let x = value.x ** 2 - value.y ** 2;
  let y = 2 * value.x * value.y;
  
  x += position.x;
  y += position.y;
  return { x, y };
}