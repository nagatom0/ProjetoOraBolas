async function carregaConfig() {
  const { t, x, y } = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  bola.trajetoria.t = t;
  bola.trajetoria.x = x;
  bola.trajetoria.y = y;

  bola.x = bola.trajetoria.x[0];
  bola.y = bola.trajetoria.y[0];

  primeiraPosicaoRobo();
}

function primeiraPosicaoRobo() {
  if (robo.x0 == "" && robo.y0 == "") {
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

    console.log("1 p Robo ->", robo.x, robo.y);

    // robo.x = 1.360187489717013;
    // robo.y = 1.2373402791260575;
  } else {
    robo.x = robo.x0;
    robo.y = robo.y0;
  }
  defineTrajetoriaRobo();
}

function defineTrajetoriaRobo() {
  const xRobo = robo.x;
  const yRobo = robo.y;
  let d = 0;
  let menorD = "";
  t = 0;
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    const xBola = bola.trajetoria.x[i];
    const yBola = bola.trajetoria.y[i];

    d = Math.sqrt(Math.pow(xRobo - xBola, 2) + Math.pow(yRobo - yBola, 2));
    if (d > menorD && menorD != "") {
      t = i;
      const vm = menorD / bola.trajetoria.t[t];
      console.log("MenorD ->", menorD);
      console.log("velocidade ->", vm);
      if (vm > robo.velMax) {
        menorD = d;
        continue;
      }
      robo.v = vm;
      break;
    }

    if (d < menorD || menorD == "") {
      menorD = d;
    }
  }
  console.log("t ->", bola.trajetoria.t[t]);

  const xBola = bola.trajetoria.x[t];
  const yBola = bola.trajetoria.y[t];
  console.log("Bola ->", xBola, yBola);
  console.log("Robo ->", xRobo, yRobo);

  console.log("t ->", t, bola.trajetoria.t[t]);

  let b = xRobo;
  let a = (xBola - xRobo) / bola.trajetoria.t[t];

  for (let i = 0; i < t; i++) {
    const valor = a * bola.trajetoria.t[i] + b;
    robo.trajetoria.x.push(valor);
  }

  b = yRobo;
  a = (yBola - yRobo) / bola.trajetoria.t[t];

  for (let i = 0; i < t; i++) {
    const valor = a * bola.trajetoria.t[i] + b;
    robo.trajetoria.y.push(valor);
  }

  dx = Math.abs(robo.x - xBola).toFixed(2);
  dy = Math.abs(robo.y - yBola).toFixed(2);
  graus = Math.atan(dy / dx) * (180 / Math.PI);

  if (robo.x > xBola) {
    graus = 180 - graus;
  }

  if (robo.y < yBola) {
    graus = -graus;
  }

  robo.graus = graus;
}

carregaConfig();
