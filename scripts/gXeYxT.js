const grafXporTBola = document.getElementById("gXxTBola");
const grafYporTBola = document.getElementById("gYxTBola");
const grafXporTRobo = document.getElementById("gXxTRobo");
const grafYporTRobo = document.getElementById("gYxTRobo");

const funcoesBola = {
  x: "",
  vx: "",
  ax: "",
  y: "",
  vy: "",
  ay: "",
};

google.charts.load("current", { packages: ["corechart"] });

async function drawXporTBola() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  let dadosX = [];
  for (let i = 0; i < content.t.length; i++) {
    dadosX.push([content.t[i], content.x[i]]);
  }
  funcoesBola.x = regression.polynomial(dadosX, { order: 2 }).string;
  funcoesBola.vx = derivada(funcoesBola.x);
  funcoesBola.ax = derivada(funcoesBola.vx);

  dadosX.unshift(["t(s)", "x(m)"]);

  const dataX = google.visualization.arrayToDataTable(dadosX);

  let options = {
    title: "Posição x da bola em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "x(m)", minValue: 0, maxValue: 9 },
    pointSize: 0.1,
    legend: {
      alignment: "end",
      position: "none",
    },
    trendlines: {
      0: {
        type: "polynomial",
        pointsVisible: false,
        color: "",
      },
    },
  };

  const chartX = new google.visualization.ScatterChart(grafXporTBola);
  chartX.draw(dataX, options);
}

async function drawYporTBola() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  let dadosY = [];
  for (let i = 0; i < content.t.length; i++) {
    dadosY.push([content.t[i], content.y[i]]);
  }

  funcoesBola.y = regression.polynomial(dadosY, { order: 2 }).string;
  funcoesBola.vy = derivada(funcoesBola.y);
  funcoesBola.ay = derivada(funcoesBola.vy);

  dadosY.unshift(["t(s)", "y(m)"]);
  const dataY = google.visualization.arrayToDataTable(dadosY);

  options = {
    title: "Posição y da bola em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "y(m)", minValue: 0, maxValue: 6 },
    pointSize: 0.1,
    legend: {
      alignment: "end",
      position: "none",
    },
    trendlines: {
      0: {
        type: "polynomial",
        pointsVisible: false,
        color: "",
      },
    },
  };

  const chartY = new google.visualization.ScatterChart(grafYporTBola);
  chartY.draw(dataY, options);
}

async function drawXporTRobo() {
  let dados = [];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dados.push([bola.trajetoria.t[i], robo.trajetoria.x[i]]);
  }
  dados.unshift(["t(s)", "x(m)"]);

  const data = google.visualization.arrayToDataTable(dados);

  options = {
    title: "Posição x do robô em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: {
      title: "x(m)",
      minValue: 0,
      maxValue: Math.max(robo.trajetoria.x),
    },
    pointSize: 0.1,
    legend: {
      alignment: "end",
      position: "none",
    },
    trendlines: {
      0: {
        type: "polynomial",
        pointsVisible: false,
        color: "",
      },
    },
  };

  const chart = new google.visualization.ScatterChart(grafXporTRobo);

  chart.draw(data, options);
}

async function drawYporTRobo() {
  let dados = [];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dados.push([bola.trajetoria.t[i], robo.trajetoria.y[i]]);
  }
  dados.unshift(["t(s)", "y(m)"]);

  const data = google.visualization.arrayToDataTable(dados);

  options = {
    title: "Posição y do robô em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: {
      title: "y(m)",
      minValue: 0,
      maxValue: Math.max(robo.trajetoria.y),
    },
    pointSize: 0.1,
    legend: {
      alignment: "end",
      position: "none",
    },
    trendlines: {
      0: {
        type: "polynomial",
        pointsVisible: false,
        color: "",
      },
    },
  };

  const chart = new google.visualization.ScatterChart(grafYporTRobo);

  chart.draw(data, options);
}
