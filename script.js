const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

let iteration = 1;

const x = [];
const y = [];

const update = [];

c.fillStyle = "#000000";
c.fillRect(0, 0, canvas.width, canvas.height);

for (let i = 0; i <= canvas.width; i++) {
  x[i] = [];
  y[i] = [];
  update[i] = [];
  for(let j = 0; j <= canvas.height; j++){
    x[i][j] = (i - canvas.width / 2 - 100) / (canvas.height / 3);
    y[i][j] = (j - canvas.height / 2) / (canvas.height / 3);
    update[i][j] = 1;
  }
}

setInterval(function() {
  for (let i = 0; i <= canvas.width; i++) {
    for(let j = 0; j <= canvas.height; j++) {
      if(update[i][j] !== 0) {
      
        const x2 = x[i][j];
        const y2 = y[i][j];
        
        x[i][j] = x2 ** 2 - y2 ** 2;
        y[i][j] = 2 * x2 * y2;
        
        x[i][j] += (i - canvas.width / 2 - 100) / (canvas.height / 3);
        y[i][j] += (j - canvas.height / 2) / (canvas.height / 3);
        
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
        
        if(update[i][j] > 1){
          c.fillStyle = "hsl(" + (iteration + 250) + ", 100%, 50%)";
          c.fillRect(i, j, 1, 1);
        }
      }
    }
  }
  
  iteration++;
}, 100);