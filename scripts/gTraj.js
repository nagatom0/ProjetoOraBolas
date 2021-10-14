const grafTrajetoria = document.getElementById("gTraj");

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  console.log(content);

  const dados = content.map((line) => [line[1], line[2]]);
  dados.unshift(["x(m)", "y(m)"]);

  const data = google.visualization.arrayToDataTable(dados);
  console.log(data);

  const options = {
    title: "Trajetória da bola",
    hAxis: { title: "X(m)", minValue: 0, maxValue: 9 },
    vAxis: { title: "Y(m)", minValue: 0, maxValue: 6 },
    pointSize: 0.1,
    legend: "none",
  };

  const chart = new google.visualization.ScatterChart(grafTrajetoria);

  chart.draw(data, options);
}
