const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const imgBola = new Image();
imgBola.src = "./img/bola.png";

const imgRobo = new Image();
imgRobo.src = "./img/robo.png";

imgBola.onload = () => desenhaCampo();
imgRobo.onload = () => desenhaCampo();

function desenhaCampo() {
  ctx.fillStyle = "#51bb26";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 25 / 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.strokeRect(-20, canvas.height / 3, 350, canvas.height / 3);
  ctx.strokeRect(
    canvas.width - 350 + 20,
    canvas.height / 3,
    500,
    canvas.height / 3
  );
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 350, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function resetCanvas() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  desenhaCampo();
}

function desenhaImagem(img, r, x, y) {
  x = x * 500;
  y = canvas.height - y * 500;
  ctx.drawImage(img, x - r, y - r, 2 * r, 2 * r);
}

function apontaRobo(gr, img, r, x, y) {
  x = x * 500;
  y = canvas.height - y * 500;
  resetCanvas();
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((gr * Math.PI) / 180);
  ctx.drawImage(img, -r, -r, 2 * r, 2 * r);
  ctx.restore();
}

function desenhaLinha([xa, ya], [xb, yb]) {
  xa = xa * 500;
  xb = xb * 500;
  ya = canvas.height - ya * 500;
  yb = canvas.height - yb * 500;
  ctx.beginPath();
  ctx.strokeStyle = "#ff0000";
  ctx.lineWidth = 10;
  ctx.moveTo(xa, ya);
  ctx.lineTo(xb, yb);
  ctx.stroke();
  ctx.closePath();
}
