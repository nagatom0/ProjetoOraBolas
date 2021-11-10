const grafAxporTBola = document.getElementById("gAxxTBola");
const grafAyporTBola = document.getElementById("gAyxTBola");
const grafAxporTRobo = document.getElementById("gAxxTRobo");
const grafAyporTRobo = document.getElementById("gAyxTRobo");

google.charts.load("current", { packages: ["corechart"] });

async function drawAxporTBola() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  let dadosAx = [];
  for (let i = 0; i < content.t.length; i++) {
    dadosAx.push([
      await content.t[i],
      await eval(funcoesBola.ax.replace("x", `*${content.t[i]}`)),
    ]);
  }

  dadosAx.unshift(["t(s)", "ax(m/s²)"]);

  const dataAx = await google.visualization.arrayToDataTable(dadosAx);

  let options = {
    title: "Componente x da aceleração da bola em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "ax(m/s²)", minValue: 0, maxValue: 9 },
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

  const chartAx = new google.visualization.ScatterChart(grafAxporTBola);
  chartAx.draw(dataAx, options);
}

async function drawAyporTBola() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  let dadosAy = [];
  for (let i = 0; i < content.t.length; i++) {
    dadosAy.push([
      content.t[i],
      await eval(funcoesBola.ay.replace("x", `*${content.t[i]}`)),
    ]);
  }

  dadosAy.unshift(["t(s)", "ay(m/s²)"]);
  const dataAy = await google.visualization.arrayToDataTable(dadosAy);

  options = {
    title: "Componente y da aceleração da bola em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "ay(m/s²)", minValue: 0, maxValue: 6 },
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

  const chartAy = new google.visualization.ScatterChart(grafAyporTBola);
  chartAy.draw(dataAy, options);
}

async function drawAxporTRobo() {
  let dados = [];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dados.push([bola.trajetoria.t[i], robo.trajetoria.a[i]]);
  }
  dados.unshift(["t(s)", "ax(m/s²)"]);

  const data = google.visualization.arrayToDataTable(dados);

  options = {
    title: "Componente x da aceleração do robô em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: {
      title: "ax(m/s²)",
      minValue: 0,
      maxValue: robo.aMax + 1,
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

  const chart = new google.visualization.ScatterChart(grafAxporTRobo);

  chart.draw(data, options);
}

async function drawAyporTRobo() {
  let dados = [];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dados.push([bola.trajetoria.t[i], robo.trajetoria.a[i]]);
  }
  dados.unshift(["t(s)", "ax(m/s²)"]);

  const data = google.visualization.arrayToDataTable(dados);

  options = {
    title: "Componente x da aceleração do robô em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: {
      title: "ax(m/s²)",
      minValue: 0,
      maxValue: robo.aMax + 1,
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

  const chart = new google.visualization.ScatterChart(grafAyporTRobo);

  chart.draw(data, options);
}
