const pTempo = document.getElementById("tempoAtual");
const pXbola = document.getElementById("xAtual");
const pYbola = document.getElementById("yAtual");
const pDInicial = document.getElementById("dInicial");
const pDistancia = document.getElementById("distancia");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

desenhaCampo();

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

const imgBola = new Image();
imgBola.src = "../img/bola.png";
const imgRobo = new Image();
imgRobo.src = "../img/robo.png";
imgBola.onload = () => {
  bola.img = imgBola;
};
imgRobo.onload = () => {
  robo.img = imgRobo;
  main();
};

const bola = {
  img: "",
  raio: 25,
  trajx: [],
  trajy: [],
  trajt: [],
  x: 0,
  y: 0,
  t: 0,
};

function desenhaBola() {
  ctx.drawImage(
    bola.img,
    bola.x - bola.raio,
    bola.y - bola.raio,
    2 * bola.raio,
    2 * bola.raio
  );
}

const robo = {
  img: "",
  raio: 90,
  dDaBolaInicial: 0,
  dDaBola: 0,
  vmax: 2,
  amax: 2.6,
  x: 0,
  y: 0,
};

function desenhaRobo() {
  ctx.drawImage(
    robo.img,
    robo.x - robo.raio,
    robo.y - robo.raio,
    2 * robo.raio,
    2 * robo.raio
  );
}

function primeiraPosicaoRobo() {
  const xmin = bola.trajx[0] - 1;
  const xmax = bola.trajx[0] + 1;
  const ymin = bola.trajy[0] - 1;
  const ymax = bola.trajy[0] + 1;

  let d = 0;
  let x = 0;
  let y = 0;

  do {
    x = Math.random() * (xmax - xmin) + xmin;
    y = Math.random() * (ymax - ymin) + ymin;

    // Area onde o robo pode nascer
    // ctx.beginPath();
    // ctx.strokeStyle = "#FF0000";
    // ctx.arc(
    //   bola.trajx[0] * 1000,
    //   canvas.height - bola.trajy[0] * 1000,
    //   1000,
    //   0,
    //   Math.PI * 2
    // );
    // ctx.stroke();
    // ctx.closePath();

    d = Math.sqrt(
      Math.pow(x - bola.trajx[0], 2) + Math.pow(y - bola.trajy[0], 2)
    ).toFixed(2);

    robo.x = x * 1000;
    robo.y = canvas.height - y * 1000;
    robo.dDaBolaInicial = d;
  } while (d > 1 || x < 0 || y < 0);
}

function atualizaDados() {
  pTempo.innerHTML = `<b>Tempo:</b> ${bola.trajt[bola.t]} s`;
  pXbola.innerHTML = `<b>X Bola:</b> ${(bola.x / 1000).toFixed(3)} m`;
  pYbola.innerHTML = `<b>Y Bola:</b> ${(
    (canvas.height - bola.y) /
    1000
  ).toFixed(3)} m`;
  pDInicial.innerHTML = `<b>Distância Inicial:</b> ${robo.dDaBolaInicial} m`;
  pDistancia.innerHTML = `<b>Distância:</b> ${robo.dDaBola} m`;
}

async function main() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  const t = content.map((line) => line[0]);
  const x = content.map((line) => line[1]);
  const y = content.map((line) => line[2]);

  bola.trajx = x;
  bola.trajy = y;
  bola.trajt = t;

  bola.x = bola.trajx[0];
  bola.y = bola.trajy[0];

  primeiraPosicaoRobo();
  desenha();
}

function desenha() {
  bola.x = bola.trajx[bola.t] * 1000;
  bola.y = canvas.height - bola.trajy[bola.t] * 1000;

  d = Math.sqrt(
    Math.pow((robo.x - bola.x) / 1000, 2) +
      Math.pow((robo.y - bola.y) / 1000, 2)
  ).toFixed(2);
  robo.dDaBola = d;

  desenhaBola();
  desenhaRobo();
  atualizaDados();

  if (bola.t == bola.trajt.length) {
    bola.t = 0;
    resetCanvas();
    primeiraPosicaoRobo();
  } else {
    bola.t++;
  }
  setTimeout(desenha, 20);
}
