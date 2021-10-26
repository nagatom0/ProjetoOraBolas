function derivada(funcao) {
  terms = funcao.replace("y = ", "").split(" + ");
  terms = terms.map((term) => {
    if (term.includes("x") && !term.includes("^"))
      term = term.replace("x", "x^1");

    if (term.match(/x\^\d/g)) {
      let valores = term.split("x");
      term = parseFloat(valores[0]) * parseFloat(valores[1].replace("^", ""));
      novoExp = parseFloat(valores[1].replace("^", "")) - 1;
      term = `${term}x^${novoExp}`;
      return term;
    }
  });

  terms = terms.filter((x) => x !== undefined);
  terms = terms.map((term) => {
    term = term.replace("x^1", "x");
    term = term.replace("x^0", "");
    return term;
  });
  const novaFuncao = "y = " + terms.join(" + ");

  return novaFuncao;
}
