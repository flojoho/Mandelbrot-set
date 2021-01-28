const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

let iteration = 1;

let pixels = [];

c.fillStyle = "#000000";
c.fillRect(0, 0, canvas.width, canvas.height);

for (let canvasX = 0; canvasX <= canvas.width; canvasX++) {
  for(let canvasY = 0; canvasY <= canvas.height; canvasY++) {
    const coordinates = scaleAndShift({ x: canvasX, y: canvasY });

    pixels.push({
      x: coordinates.x,
      y: coordinates.y,
      canvasX,
      canvasY
    })
  }
}

setInterval(function() {
  for(const pixel of pixels) {
    const nextIteration = getNextIteration(
      scaleAndShift({ x: pixel.canvasX, y: pixel.canvasY }),
      { x: pixel.x, y: pixel.y }
    )

    if(lengthSquared(nextIteration) <= 4) {
      pixel.x = nextIteration.x;
      pixel.y = nextIteration.y;
    } else {
      c.fillStyle = "hsl(" + (iteration + 250) + ", 100%, 50%)";
      c.fillRect(pixel.canvasX, pixel.canvasY, 1, 1);
      pixel.removed = true;
    }
  }
  
  pixels = pixels.filter(pixel => !pixel.removed);
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

function lengthSquared(vector) {
  return vector.x**2 + vector.y**2;
}