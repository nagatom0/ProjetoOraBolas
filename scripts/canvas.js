const pDist = document.getElementById("pDist");

let graus = 0;
function trajetoria() {
  bola.x = bola.trajetoria.x[simulacao.t];
  bola.y = bola.trajetoria.y[simulacao.t];

  robo.x = robo.trajetoria.x[simulacao.t];
  robo.y = robo.trajetoria.y[simulacao.t];

  const dx = Math.abs(robo.x - bola.x).toFixed(2);
  const dy = Math.abs(robo.y - bola.y).toFixed(2);
  let graus = Math.atan(dy / dx) * (180 / Math.PI);

  if (robo.x > bola.x) {
    graus = 180 - graus;
  }

  if (robo.y < bola.y) {
    graus = -graus;
  }

  robo.graus = graus;

  apontaRobo(robo.graus, imgRobo, robo.raio, robo.x, robo.y);
  desenhaImagem(imgBola, bola.raio, bola.x, bola.y);

  const d = simulacao.d[simulacao.t];

  pDist.innerText = `Distância entre a bola e o robô: ${d.toFixed(3)} m`;

  if (
    (simulacao.t == simulacao.tFinal && simulacao.t != 0) ||
    simulacao.t == bola.trajetoria.t.length
  ) {
    simulacao.t = 0;

    resetCanvas();
  } else {
    simulacao.t++;
  }
}

async function main() {
  desenhaImagem(imgBola, bola.raio, bola.x, bola.y);
  desenhaImagem(imgRobo, robo.raio, robo.x0, robo.y0);

  setInterval(trajetoria, 20);
}
