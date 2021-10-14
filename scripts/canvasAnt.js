const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

desenhaCampo();

const imgBola = new Image();
imgBola.src = "../img/bola.png";
imgBola.onload = main();

function desenhaBola(x, y) {
  // 50 mm
  const raioDaBola = 25;

  ctx.drawImage(
    imgBola,
    x - raioDaBola,
    y - raioDaBola,
    2 * raioDaBola,
    2 * raioDaBola
  );
}

function desenhaCampo() {
  ctx.fillStyle = "#51bb26";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 50;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ctx.strokeRect(-20, canvas.height / 3, 500, canvas.height / 3);
  ctx.strokeRect(
    canvas.width - 500 + 20,
    canvas.height / 3,
    500,
    canvas.height / 3
  );
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 500, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function resetCanvas() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  desenhaCampo();
}

async function main() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  const t = content.map((line) => line[0]);
  const x = content.map((line) => line[1]);
  const y = content.map((line) => line[2]);

  desenhaTrajetoria(x, y, t);
}

let i = 0;
function desenhaTrajetoria(x, y, t) {
  const xa = x[i] * 1000;
  const ya = y[i] * 1000;

  desenhaBola(xa, canvas.height - ya);

  i++;
  if (i >= t.length - 1) {
    i = 0;
    setTimeout(() => {
      desenhaTrajetoria(x, y, t);
      resetCanvas();
    }, 2000);
  } else {
    setTimeout(() => desenhaTrajetoria(x, y, t), i == 0 ? 2000 : 20);
  }
}
