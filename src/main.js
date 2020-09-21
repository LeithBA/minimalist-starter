import config from './config.js'

const title = document.createElement('h1')
const canvas = document.createElement('canvas')

let mouseX = 0;
let mouseY = 0;
let clicking = false;
let color = null;


title.innerHTML = 'hello'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')
  //app.append(title)
  app.append(canvas)

  canvas.addEventListener('mouseup', e1 => {
    clicking = false;
  });
  canvas.addEventListener('mousedown', e2 => {
    clicking = true;
    color = getNewColors();
  });
  canvas.addEventListener('mousemove', e3 => {
    mouseX = e3.clientX;
    mouseY = e3.clientY;
    if (clicking)
      color = getNewColors();
  });
  color = getNewColors();
  animate();
})


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

var angle = 0;
var speed = 0.01;

function animate(e1, e2, e3) {
  requestAnimationFrame(animate);
  angle = Math.atan2(mouseX - canvas.width / 2, mouseY - canvas.height / 2);
  ctx.fillStyle = "rgba(0,0,0,0.1)";//"rgba(" + (255 - color.x) + "," + (255 - color.y) + "," + (255 - color.z) + ",1)";
  ctx.rect(0, 0, canvas.width, canvas.height);

  ctx.fill();

  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.lineWidth = 5;

  let sunX = canvas.width / 2;
  let sunY = canvas.height / 2;
  ctx.strokeStyle = "rgb(" + color.x + "," + color.y + "," + color.z + ")";
  circle(sunX, sunY, 50);


  let distX = mouseX - sunX;
  let distY = mouseY - sunY;

  let dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2))

  let iter = 20;

  for (let i = 1; i <= iter; i++) {
    ctx.lineWidth = 5 / i;
    let earthX = sunX + Math.sin(angle * i) * dist / i;
    let earthY = sunY + Math.cos(angle * i) * dist / i;

    let c = 255 * i / iter;
    let r = (color.r - c);
    let g = (color.g - c);
    let b = (color.b - c);
    ctx.strokeStyle = "rgb(" + r + "," + g + "," + b + ")";
    circle(earthX, earthY, 30 / i);


    sunX = earthX;
    sunY = earthY;

  }

}


function getNewColors() {
  let r = Math.floor(150 + Math.random() * 155);
  let g = Math.floor(150 + Math.random() * 155);
  let b = Math.floor(150 + Math.random() * 155);
  return { r, g, b }
}


function circle(x1, y1, r) {
  ctx.beginPath();
  ctx.arc(x1, y1, r, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}




