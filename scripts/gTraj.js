const grafTrajBola = document.getElementById("gTrajBola");
const grafTrajRobo = document.getElementById("gTrajRobo");

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChartBola);
google.charts.setOnLoadCallback(drawChartRobo);

async function drawChartBola() {
  let dados = [];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dados.push([bola.trajetoria.x[i], bola.trajetoria.y[i]]);
  }
  dados.unshift(["x(m)", "y(m)"]);

  const data = google.visualization.arrayToDataTable(dados);

  const options = {
    title: "Trajetória da bola",
    hAxis: { title: "X(m)", minValue: 0, maxValue: 9 },
    vAxis: { title: "Y(m)", minValue: 0, maxValue: 6 },
    pointSize: 0.1,
    legend: "none",
  };

  const chart = new google.visualization.ScatterChart(grafTrajBola);

  chart.draw(data, options);
}

async function drawChartRobo() {
  let dados = [];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dados.push([robo.trajetoria.x[i], robo.trajetoria.y[i]]);
  }
  dados.unshift(["x(m)", "y(m)"]);

  const data = google.visualization.arrayToDataTable(dados);

  const options = {
    title: "Trajetória do robo",
    hAxis: { title: "X(m)", minValue: 0, maxValue: 9 },
    vAxis: { title: "Y(m)", minValue: 0, maxValue: 6 },
    pointSize: 0.1,
    legend: "none",
  };

  const chart = new google.visualization.ScatterChart(grafTrajRobo);

  chart.draw(data, options);
}
