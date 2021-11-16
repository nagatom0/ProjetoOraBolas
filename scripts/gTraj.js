const grafTraj = document.getElementById("gTraj");

google.charts.load("current", { packages: ["corechart"] });

async function drawTraj() {
  let dados = [["x(m)", "Bola"]];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dados.push([bola.trajetoria.x[i], bola.trajetoria.y[i]]);
  }

  const dataBola = google.visualization.arrayToDataTable(dados);

  dados = [["x(m)", "Robô"]];
  for (let i = 0; i < bola.trajetoria.t.length; i++) {
    dados.push([robo.trajetoria.x[i], robo.trajetoria.y[i]]);
  }

  const dataRobo = google.visualization.arrayToDataTable(dados);

  const options = {
    title: "Trajetória da Bola e do Robô",
    hAxis: { title: "x(m)", minValue: 0, maxValue: 10 },
    vAxis: { title: "y(m)", minValue: 0, maxValue: 6 },
    pointSize: 0.1,
    series: {
      0: { color: "#DC3912" },
      1: { color: "#3366CC" },
    },
    width: 628,
    height: 400,
  };

  const joinedData = google.visualization.data.join(
    dataBola,
    dataRobo,
    "full",
    [[0, 0]],
    [1],
    [1]
  );

  const chart = new google.visualization.ScatterChart(grafTraj);

  chart.draw(joinedData, options);
}
