const grafVxporT = document.getElementById("gVxxT");
const grafVyporT = document.getElementById("gVyxT");

google.charts.load("current", { packages: ["corechart"] });

async function drawVxporT() {
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

  dadosVx.unshift(["t(s)", "Bola"]);

  const dataVxBola = await google.visualization.arrayToDataTable(dadosVx);

  dadosVx = [];
  for (let i = 0; i < robo.trajetoria.v.length; i++) {
    dadosVx.push([bola.trajetoria.t[i], robo.trajetoria.v[i]]);
  }
  dadosVx.unshift(["t(s)", "Robô"]);

  const dataVxRobo = google.visualization.arrayToDataTable(dadosVx);

  let options = {
    title: "Componente x da velocidade em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "vx(m/s)", minValue: 0, maxValue: 4 },
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

  const joinedData = google.visualization.data.join(
    dataVxBola,
    dataVxRobo,
    "full",
    [[0, 0]],
    [1],
    [1]
  );

  const chartVx = new google.visualization.ScatterChart(grafVxporT);
  chartVx.draw(joinedData, options);
}

async function drawVyporT() {
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

  dadosVy.unshift(["t(s)", "Bola"]);

  const dataVyBola = await google.visualization.arrayToDataTable(dadosVy);

  dadosVy = [];
  for (let i = 0; i < robo.trajetoria.v.length; i++) {
    dadosVy.push([bola.trajetoria.t[i], robo.trajetoria.v[i]]);
  }

  dadosVy.unshift(["t(s)", "Robô"]);

  const dataVyRobo = google.visualization.arrayToDataTable(dadosVy);

  options = {
    title: "Componente y da velocidade em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "vy(m/s)", minValue: 0, maxValue: 4 },
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

  const joinedData = google.visualization.data.join(
    dataVyBola,
    dataVyRobo,
    "full",
    [[0, 0]],
    [1],
    [1]
  );

  const chartVy = new google.visualization.ScatterChart(grafVyporT);
  chartVy.draw(joinedData, options);
}
