const messageF = require("./message")

exports.table = {
  initialize: msg => messageF.sendMessage({
    jsonrpc: "2.0",
    id: msg.id,
    result: {
      capabilities: {
        textDocumentSync: 1,
      },
    }
  }),
};