const pPosBola = document.getElementById("pPosBola");
const pPosRobo = document.getElementById("pPosRobo");
const pVelRobo = document.getElementById("pVelRobo");
const pDist = document.getElementById("pDist");
const pInst = document.getElementById("pInst");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let graus = 0;
async function trajetoria() {
  bola.x = bola.trajetoria.x[simulacao.t];
  bola.y = bola.trajetoria.y[simulacao.t];

  robo.x = robo.trajetoria.x[simulacao.t].toFixed(3);
  robo.y = robo.trajetoria.y[simulacao.t].toFixed(3);

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

  atualizaDados();

  apontaRobo(robo.graus, imgRobo, robo.raio, robo.x, robo.y);
  desenhaImagem(imgBola, bola.raio, bola.x, bola.y);

  if (simulacao.t == 0) {
    await delay(1000);
  }

  if (
    (simulacao.t == simulacao.tFinal && simulacao.t != 0) ||
    simulacao.t == bola.trajetoria.t.length
  ) {
    await delay(1000);

    simulacao.t = 0;
    resetCanvas();
  } else {
    simulacao.t++;
    bola.t = bola.trajetoria.t[simulacao.t];
  }

  setTimeout(trajetoria, 20);
}

async function main() {
  setTimeout(trajetoria, 20);
}

function atualizaDados() {
  pInst.innerText = `Instante: ${bola.t}s`;
  pPosBola.innerText = `Posição da Bola:\n(${bola.x}, ${bola.y})`;
  pPosRobo.innerText = `Posição do Robô:\n(${robo.x}, ${robo.y})`;

  pVelRobo.innerText = `Velocidade do Robô: ${robo.trajetoria.v[
    simulacao.t
  ].toFixed(3)}m/s`;

  const d = simulacao.d[simulacao.t];
  pDist.innerText = `Distância:\n${d.toFixed(3)}m`;
}
