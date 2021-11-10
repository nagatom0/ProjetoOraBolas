const grafVxporTBola = document.getElementById("gVxxTBola");
const grafVyporTBola = document.getElementById("gVyxTBola");
const grafVxporTRobo = document.getElementById("gVxxTRobo");
const grafVyporTRobo = document.getElementById("gVyxTRobo");

google.charts.load("current", { packages: ["corechart"] });

async function drawVxporTBola() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  let dadosVx = [];
  for (let i = 0; i < content.t.length; i++) {
    dadosVx.push([
      content.t[i],
      await eval(funcoesBola.vx.replace("x", `*${content.t[i]}`)),
    ]);
  }

  dadosVx.unshift(["t(s)", "vx(m/s)"]);

  const dataVx = await google.visualization.arrayToDataTable(dadosVx);

  let options = {
    title: "Componente x da velocidade da bola em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "vx(m/s)", minValue: 0, maxValue: 9 },
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

  const chartVx = new google.visualization.ScatterChart(grafVxporTBola);
  chartVx.draw(dataVx, options);
}

async function drawVyporTBola() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  let dadosVy = [];
  for (let i = 0; i < content.t.length; i++) {
    dadosVy.push([
      content.t[i],
      await eval(funcoesBola.vy.replace("x", `*${content.t[i]}`)),
    ]);
  }

  dadosVy.unshift(["t(s)", "vy(m/s)"]);
  const dataVy = await google.visualization.arrayToDataTable(dadosVy);

  options = {
    title: "Componente y da velocidade da bola em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "vy(m/s)", minValue: 0, maxValue: 6 },
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

  const chartVy = new google.visualization.ScatterChart(grafVyporTBola);
  chartVy.draw(dataVy, options);
}

async function drawVxporTRobo() {
  let dados = [];
  for (let i = 0; i < robo.trajetoria.v.length; i++) {
    dados.push([bola.trajetoria.t[i], robo.trajetoria.v[i]]);
  }
  dados.unshift(["t(s)", "vx(m/s)"]);

  const data = google.visualization.arrayToDataTable(dados);

  options = {
    title: "Componente x da velocidade do robô em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: {
      title: "vx(m/s)",
      minValue: 0,
      maxValue: 4,
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

  const chart = new google.visualization.ScatterChart(grafVxporTRobo);

  chart.draw(data, options);
}

async function drawVyporTRobo() {
  let dados = [];
  for (let i = 0; i < robo.trajetoria.v.length; i++) {
    dados.push([bola.trajetoria.t[i], robo.trajetoria.v[i]]);
  }
  dados.unshift(["t(s)", "vy(m/s)"]);

  const data = google.visualization.arrayToDataTable(dados);

  options = {
    title: "Componente y da velocidade do robô em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: {
      title: "vx(m/s)",
      minValue: 0,
      maxValue: 4,
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

  const chart = new google.visualization.ScatterChart(grafVyporTRobo);

  chart.draw(data, options);
}
