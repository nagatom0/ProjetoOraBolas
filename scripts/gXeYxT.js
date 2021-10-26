const grafXporT = document.getElementById("gXxT");
const grafYporT = document.getElementById("gYxT");

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawXporT);
google.charts.setOnLoadCallback(drawYporT);

const funcoes = {
  x: "",
  vx: "",
  ax: "",
  y: "",
  vy: "",
  ay: "",
};

async function drawXporT() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  let dadosX = [];
  for (let i = 0; i < content.t.length; i++) {
    dadosX.push([content.t[i], content.x[i]]);
  }
  funcoes.x = regression.polynomial(dadosX).string;
  funcoes.vx = derivada(funcoes.x);
  funcoes.ax = derivada(funcoes.vx);

  dadosX.unshift(["t(s)", "x(m)"]);

  const dataX = google.visualization.arrayToDataTable(dadosX);

  let options = {
    title: "x da bola em função do tempo",
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

  const chartX = new google.visualization.ScatterChart(grafXporT);
  chartX.draw(dataX, options);
}

async function drawYporT() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  let dadosY = [];
  for (let i = 0; i < content.t.length; i++) {
    dadosY.push([content.t[i], content.y[i]]);
  }

  funcoes.y = regression.polynomial(dadosY).string;
  funcoes.vy = derivada(funcoes.y);
  funcoes.ay = derivada(funcoes.vy);

  dadosY.unshift(["t(s)", "y(m)"]);
  const dataY = google.visualization.arrayToDataTable(dadosY);

  options = {
    title: "y da bola em função do tempo",
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

  const chartY = new google.visualization.ScatterChart(grafYporT);
  chartY.draw(dataY, options);
}
