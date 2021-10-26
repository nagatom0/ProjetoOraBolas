// Retorna [coluna t/s, coluna x/m, coluna y/m]
async function fileContent(path) {
  let file = await fetch(path);
  file = await file.text();

  // Retira o enter das linhas, os espaços em branco no começo e no fim e cria uma lista com cada linha do arquivo
  let content = file.replace(/(\r)/gm, "").trim().split("\n");
  // Retira a primeira linha que contem o cabeçalho da tabela
  content.shift();

  // Separa os valores pelo tab
  content = content.map((line) => line.split("\t"));

  // Sepra as colunas em um objeto
  content = {
    t: content.map((line) => parseFloat(line[0].replace(",", "."))),
    x: content.map((line) => parseFloat(line[1].replace(",", "."))),
    y: content.map((line) => parseFloat(line[2].replace(",", "."))),
  };

  return content;
}
