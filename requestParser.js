const P = require("parsimmon");

exports.LSP = P.createLanguage({
  request: r => P.seqMap(r.header, r.jsonrpc, (_, jsonrpc) => jsonrpc),
  header: () => P.seq(
    P.string("Content-Length:"),
    P.whitespace,
    P.digits.map(Number),
    P.newline.times(2)
  ),
  jsonrpc: () => P.all.map(b => JSON.parse(b)),
})