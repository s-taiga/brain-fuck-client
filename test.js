const P = require("parsimmon");

const parser = P.createLanguage({
  h: () => P.string("hoge").many(),
})

console.log(parser.h.parse("hogehogefuga"))