const messageF = require("./message")

exports.table = {
  initialized: () => messageF.logMessage(`initialized!`),
  "textDocument/didOpen": (msg) => {
    const uri = msg.params.textDocument.uri;
    const text = msg.params.textDocument.text;
    compile(uri, text);
  },
  "textDocument/didChange": (msg) => {
    if (msg.params.contentChanges.length !== 0) {
      const uri = msg.params.textDocument.uri;
      const text = msg.params.contentChanges[msg.params.contentChanges.length - 1].text;
      compile(uri, text);
    }
  }
};

function compile(uri, src) {
  messageF.logMessage(uri + ":" + src);
  // TODO: implement parsimmonのnodeを使う予定
};
