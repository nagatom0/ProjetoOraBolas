const grafDist = document.getElementById("gDist");

google.charts.load("current", { packages: ["corechart"] });

async function drawChart() {
  let dados = [];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dados.push([bola.trajetoria.t[i], simulacao.d[i]]);
  }
  dados.unshift(["t(s)", "d(m)"]);

  const data = google.visualization.arrayToDataTable(dados);

  const options = {
    title: "Distância relativa entre a bola e o robô em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "d(m)", minValue: 0, maxValue: Math.max(simulacao.d) },
    pointSize: 0.1,
    legend: "none",
    width: 628,
    height: 400,
  };

  const chart = new google.visualization.ScatterChart(grafDist);

  chart.draw(data, options);
}
