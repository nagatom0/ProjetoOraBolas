const grafAxporT = document.getElementById("gAxxT");
const grafAyporT = document.getElementById("gAyxT");

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawAxporT);
google.charts.setOnLoadCallback(drawAyporT);

async function drawAxporT() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  let dadosAx = [];
  for (let i = 0; i < content.t.length; i++) {
    dadosAx.push([
      content.t[i],
      await eval(funcoes.ax.replace("x", `*${content.t[i]}`)),
    ]);
  }

  dadosAx.unshift(["t(s)", "ax(m/s²)"]);

  const dataAx = google.visualization.arrayToDataTable(dadosAx);

  let options = {
    title: "ax da bola em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "ax(m/s²)", minValue: 0, maxValue: 9 },
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

  const chartAx = new google.visualization.ScatterChart(grafAxporT);
  chartAx.draw(dataAx, options);
}

async function drawAyporT() {
  const content = await fileContent(
    "../data/Ora_bolas-trajetoria _bola_2018b.dat"
  );

  let dadosAy = [];
  for (let i = 0; i < content.t.length; i++) {
    dadosAy.push([
      content.t[i],
      await eval(funcoes.ay.replace("x", `*${content.t[i]}`)),
    ]);
  }

  dadosAy.unshift(["t(s)", "ay(m/s²)"]);
  const dataAy = google.visualization.arrayToDataTable(dadosAy);

  options = {
    title: "ay da bola em função do tempo",
    hAxis: { title: "t(s)", minValue: 0, maxValue: 10 },
    vAxis: { title: "ay(m/s²)", minValue: 0, maxValue: 6 },
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

  const chartAy = new google.visualization.ScatterChart(grafAyporT);
  chartAy.draw(dataAy, options);
}
