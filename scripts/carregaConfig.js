const pXRobo = document.getElementById("xRobo");
const pYRobo = document.getElementById("yRobo");
const btn = document.getElementById("btnSubmit");
const campo = document.getElementById("campo");
const campoT = document.getElementById("campoTitle");

btn.addEventListener("click", () => {
  btn.disabled = true;
  clearInterval(trajetoria);
  primeiraPosicaoRobo(
    parseFloat(pXRobo.value.replace(", ", ".")),
    parseFloat(pYRobo.value.replace(", ", "."))
  );

  campo.style.display = "grid";
  campoT.style.display = "block";
});

async function carregaConfig() {
  const { t, x, y } = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  bola.trajetoria.t = t;
  bola.trajetoria.x = x;
  bola.trajetoria.y = y;

  bola.x = bola.trajetoria.x[0];
  bola.y = bola.trajetoria.y[0];
}

function primeiraPosicaoRobo(px, py) {
  if (px && py) {
    robo.x0 = px;
    robo.y0 = py;
  } else {
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

        robo.x0 = x;
        robo.y0 = y;
      } while (d > 1 || x < 0 || y < 0);

      // robo.x = 1.360187489717013;
      // robo.y = 1.2373402791260575;

      pXRobo.value = robo.x0.toFixed(3);
      pYRobo.value = robo.y0.toFixed(3);
    }
  }

  defineTrajetoriaRobo();
}

async function defineTrajetoriaRobo() {
  robo = {
    raio: 45,
    x: 0,
    y: 0,
    trajetoria: {
      x: [],
      y: [],
      v: [],
      a: [],
    },
    velMax: robo.velMax,
    aMax: robo.aMax,
    graus: 0,
    dInter: 0.1,
    x0: robo.x0,
    y0: robo.y0,
  };
  simulacao = {
    t: 0,
    tFinal: 0,
    d: [],
  };

  robo.trajetoria.x.push(robo.x0);
  robo.trajetoria.y.push(robo.y0);

  for (let i = 0; i < bola.trajetoria.t.length - 1; i++) {
    const velocidade = robo.aMax * bola.trajetoria.t[i];
    if (velocidade >= robo.velMax) {
      robo.trajetoria.v.push(robo.velMax);
      robo.trajetoria.a.push(0);
    } else {
      robo.trajetoria.v.push(velocidade);
      robo.trajetoria.a.push(robo.aMax);
    }
  }

  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    const xRobo = robo.trajetoria.x[i];
    const yRobo = robo.trajetoria.y[i];
    const xBola = bola.trajetoria.x[i];
    const yBola = bola.trajetoria.y[i];
    const dRoboBola = Math.sqrt(
      Math.pow(xRobo - xBola, 2) + Math.pow(yRobo - yBola, 2)
    );

    simulacao.d.push(dRoboBola);

    const cos = (xBola - xRobo) / dRoboBola;
    const sen = (yBola - yRobo) / dRoboBola;

    const posX = xRobo + (cos * robo.trajetoria.v[i] * 2) / 100;
    const posY = yRobo + (sen * robo.trajetoria.v[i] * 2) / 100;

    robo.trajetoria.x.push(posX);
    robo.trajetoria.y.push(posY);

    robo.x = robo.trajetoria.x[i + 1];
    robo.y = robo.trajetoria.y[i + 1];

    if (dRoboBola <= robo.dInter) {
      simulacao.tFinal = i;
      break;
    }
  }

  drawTraj();
  drawXporT();
  drawYporT();
  drawVxporT();
  drawVyporT();
  drawAxporT();
  drawAyporT();
  drawChart();

  main();
}

carregaConfig();
