const bola = {
  img: imgBola,
  raio: 25,
  trajetoria: {
    t: [],
    x: [],
    y: [],
  },
  x: 0,
  y: 0,
};

const robo = {
  img: imgRobo,
  raio: 90,
  x: 0,
  y: 0,
};

const simulacao = {
  t: 0,
};

function primeiraPosicaoRobo() {
  const xmin = bola.trajetoria.x[0] - 1;
  const xmax = bola.trajetoria.x[0] + 1;
  const ymin = bola.trajetoria.y[0] - 1;
  const ymax = bola.trajetoria.y[0] + 1;

  let d = 0;
  let x = 0;
  let y = 0;

  do {
    // Posição inicial aleatória
    x = Math.random() * (xmax - xmin) + xmin;
    y = Math.random() * (ymax - ymin) + ymin;

    // Distancia entre a bola e o robo
    d = Math.sqrt(
      Math.pow(x - bola.trajetoria.x[0], 2) +
        Math.pow(y - bola.trajetoria.y[0], 2)
    ).toFixed(2);

    robo.x = x;
    robo.y = y;
    // robo.dDaBolaInicial = d;
  } while (d > 1 || x < 0 || y < 0);
}

let graus = 0;
function trajetoria() {
  bola.x = bola.trajetoria.x[simulacao.t];
  bola.y = bola.trajetoria.y[simulacao.t];

  dx = Math.abs(robo.x - bola.x).toFixed(2);
  dy = Math.abs(robo.y - bola.y).toFixed(2);
  graus = Math.atan(dy / dx) * (180 / Math.PI);

  if (robo.x > bola.x) {
    graus = 180 - graus;
  }

  if (robo.y < bola.y) {
    graus = -graus;
  }

  apontaRobo(graus, robo.img, robo.raio, robo.x, robo.y);
  desenhaImagem(bola.img, bola.raio, bola.x, bola.y);
  // desenhaImagem(robo.img, robo.raio, robo.x, robo.y);

  if (simulacao.t == bola.trajetoria.t.length) {
    simulacao.t = 0;
    resetCanvas();
    primeiraPosicaoRobo();
  } else {
    simulacao.t++;
  }

  setTimeout(trajetoria, 20);
}

async function main() {
  const { t, x, y } = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  bola.trajetoria.t = t;
  bola.trajetoria.x = x;
  bola.trajetoria.y = y;

  bola.x = bola.trajetoria.x[0];
  bola.y = bola.trajetoria.y[0];

  primeiraPosicaoRobo();

  desenhaImagem(bola.img, bola.raio, bola.x, bola.y);
  desenhaImagem(robo.img, robo.raio, robo.x, robo.y);

  setTimeout(trajetoria, 1000);
}

main();
