async function fileContent(path) {
  let file = await fetch(path);
  file = await file.text();

  let content = file.replace(/(\r)/gm, "").trim().split("\n");
  content.shift();
  content = content.map((line) => line.split("\t"));
  content = content.map((line) => [
    parseFloat(line[0].replace(",", ".")),
    parseFloat(line[1].replace(",", ".")),
    parseFloat(line[2].replace(",", ".")),
  ]);

  return content;
}
