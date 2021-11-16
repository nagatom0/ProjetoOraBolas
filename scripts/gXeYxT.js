const grafXporT = document.getElementById("gXxT");
const grafYporT = document.getElementById("gYxT");

const funcoesBola = {
  x: "",
  vx: "",
  ax: "",
  y: "",
  vy: "",
  ay: "",
};

google.charts.load("current", { packages: ["corechart"] });

async function drawXporT() {
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

  dadosX.unshift(["t(s)", "Bola"]);

  const dataXBola = google.visualization.arrayToDataTable(dadosX);

  dadosX = [];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dadosX.push([bola.trajetoria.t[i], robo.trajetoria.x[i]]);
  }
  dadosX.unshift(["t(s)", "Robô"]);

  const dataXRobo = google.visualization.arrayToDataTable(dadosX);

  let options = {
    title: "Posição x em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "x(m)", minValue: 0, maxValue: 9 },
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
    dataXBola,
    dataXRobo,
    "full",
    [[0, 0]],
    [1],
    [1]
  );

  const chartX = new google.visualization.ScatterChart(grafXporT);
  chartX.draw(joinedData, options);
}

async function drawYporT() {
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

  console.log(funcoesBola);

  dadosY.unshift(["t(s)", "Bola"]);
  const dataYBola = google.visualization.arrayToDataTable(dadosY);

  dadosY = [];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dadosY.push([bola.trajetoria.t[i], robo.trajetoria.y[i]]);
  }
  dadosY.unshift(["t(s)", "Robô"]);

  const dataYRobo = google.visualization.arrayToDataTable(dadosY);

  options = {
    title: "Posição y em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "y(m)", minValue: 0, maxValue: 6 },
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
    dataYBola,
    dataYRobo,
    "full",
    [[0, 0]],
    [1],
    [1]
  );

  const chartY = new google.visualization.ScatterChart(grafYporT);
  chartY.draw(joinedData, options);
}
