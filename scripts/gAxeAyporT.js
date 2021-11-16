const grafAxporT = document.getElementById("gAxxT");
const grafAyporT = document.getElementById("gAyxT");

google.charts.load("current", { packages: ["corechart"] });

async function drawAxporT() {
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

  dadosAx.unshift(["t(s)", "Bola"]);

  const dataAxBola = await google.visualization.arrayToDataTable(dadosAx);

  dadosAx = [];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dadosAx.push([bola.trajetoria.t[i], robo.trajetoria.a[i]]);
  }
  dadosAx.unshift(["t(s)", "Robô"]);

  const dataAxRobo = google.visualization.arrayToDataTable(dadosAx);

  let options = {
    title: "Componente x da aceleração em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "ax(m/s²)", minValue: 0, maxValue: 4 },
    pointSize: 0.1,
    trendlines: {
      0: {
        type: "polynomial",
        pointsVisible: false,
        color: "",
      },
    },
    series: {
      0: { color: "#DC3912" },
      1: { color: "#3366CC" },
    },
    width: 628,
    height: 400,
  };

  const chartAx = new google.visualization.ScatterChart(grafAxporT);

  const joinedData = google.visualization.data.join(
    dataAxBola,
    dataAxRobo,
    "full",
    [[0, 0]],
    [1],
    [1]
  );

  chartAx.draw(joinedData, options);
}

async function drawAyporT() {
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

  dadosAy.unshift(["t(s)", "Bola"]);
  const dataAyBola = await google.visualization.arrayToDataTable(dadosAy);

  dadosAy = [];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dadosAy.push([bola.trajetoria.t[i], robo.trajetoria.a[i]]);
  }
  dadosAy.unshift(["t(s)", "Robô"]);

  const dataAyRobo = google.visualization.arrayToDataTable(dadosAy);

  options = {
    title: "Componente y da aceleração em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "ay(m/s²)", minValue: 0, maxValue: 4 },
    pointSize: 0.1,
    trendlines: {
      0: {
        type: "polynomial",
        pointsVisible: false,
        color: "",
      },
    },
    series: {
      0: { color: "#DC3912" },
      1: { color: "#3366CC" },
    },
    width: 628,
    height: 400,
  };

  const chartAy = new google.visualization.ScatterChart(grafAyporT);

  const joinedData = google.visualization.data.join(
    dataAyBola,
    dataAyRobo,
    "full",
    [[0, 0]],
    [1],
    [1]
  );

  chartAy.draw(joinedData, options);
}
