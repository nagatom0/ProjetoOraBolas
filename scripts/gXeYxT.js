const grafXporT = document.getElementById("gXxT");
const grafYporT = document.getElementById("gYxT");

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawXeYporT);

async function drawXeYporT() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  const dadosX = content.map((line) => [line[0], line[1]]);

  dadosX.unshift(["t(s)", "x(m)"]);

  const dataX = google.visualization.arrayToDataTable(dadosX);

  let options = {
    title: "X em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "X(m)", minValue: 0, maxValue: 9 },
    pointSize: 0.1,
    legend: "none",
  };

  const chartX = new google.visualization.ScatterChart(grafXporT);

  chartX.draw(dataX, options);

  const dadosY = content.map((line) => [line[0], line[2]]);

  dadosY.unshift(["t(s)", "y(m)"]);

  const dataY = google.visualization.arrayToDataTable(dadosY);

  options = {
    title: "Y em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "Y(m)", minValue: 0, maxValue: 6 },
    pointSize: 0.1,
    legend: "none",
  };

  const chartY = new google.visualization.ScatterChart(grafYporT);

  chartY.draw(dataY, options);
}
