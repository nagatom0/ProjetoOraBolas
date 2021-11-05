const simulacao = {
  t: 0,
  d: 0,
};

let graus = 0;
function trajetoria() {
  bola.x = bola.trajetoria.x[simulacao.t];
  bola.y = bola.trajetoria.y[simulacao.t];

  robo.x = robo.trajetoria.x[simulacao.t];
  robo.y = robo.trajetoria.y[simulacao.t];

  apontaRobo(robo.graus, imgRobo, robo.raio, robo.x, robo.y);
  desenhaImagem(imgBola, bola.raio, bola.x, bola.y);
  desenhaLinha(
    [robo.x, robo.y],
    [
      robo.trajetoria.x[robo.trajetoria.x.length - 1],
      robo.trajetoria.y[robo.trajetoria.y.length - 1],
    ]
  );

  const distancia = Math.sqrt(
    Math.pow(robo.x - bola.x, 2) + Math.pow(robo.y - bola.y, 2)
  );
  simulacao.d = distancia;
  console.log("Distancia ->", simulacao.d);
  console.log("Velocidade Robo ->", robo.v);
  console.log("--------------------------------------------------");

  if (simulacao.t == bola.trajetoria.t.length || simulacao.d <= robo.dInter) {
    simulacao.t = 0;
    simulacao.d = 0;
    robo.trajetoria.x = [];
    robo.trajetoria.y = [];
    resetCanvas();
    primeiraPosicaoRobo();
  } else {
    simulacao.t++;
  }

  // if (simulacao.t == 2) {
  //   setTimeout(trajetoria, 9000);
  // } else {
  //   // setTimeout(trajetoria, 20);
  // }
  setTimeout(trajetoria, 20);
}

async function main() {
  desenhaImagem(imgBola, bola.raio, bola.x, bola.y);
  desenhaImagem(imgRobo, robo.raio, robo.x, robo.y);

  setTimeout(trajetoria, 200);
}

main();
