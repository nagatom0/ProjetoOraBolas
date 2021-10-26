const grafVxporT = document.getElementById("gVxxT");
const grafVyporT = document.getElementById("gVyxT");

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawVxporT);
google.charts.setOnLoadCallback(drawVyporT);

async function drawVxporT() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  const dadosVx = content.map((line) => [
    line[0],
    eval(funcoes.vx.replace("x", `*${line[0]}`)),
  ]);

  dadosVx.unshift(["t(s)", "vx(m/s)"]);

  const dataVx = google.visualization.arrayToDataTable(dadosVx);

  let options = {
    title: "vx da bola em função do tempo",
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

  const chartVx = new google.visualization.ScatterChart(grafVxporT);
  chartVx.draw(dataVx, options);
}

async function drawVyporT() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  const dadosVy = content.map((line) => [
    line[0],
    eval(funcoes.vy.replace("x", `*${line[0]}`)),
  ]);

  dadosVy.unshift(["t(s)", "vy(m/s)"]);
  const dataVy = google.visualization.arrayToDataTable(dadosVy);

  options = {
    title: "vy da bola em função do tempo",
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

  const chartVy = new google.visualization.ScatterChart(grafVyporT);
  chartVy.draw(dataVy, options);
}
