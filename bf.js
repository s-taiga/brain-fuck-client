const messageF = require("./message")
const requestParser = require("./requestParser")
const notificationTable = require("./notification");
const requestTable = require("./request")


function parseRequest(data) {
  let offset = data.indexOf("Content-Length:", 1);
  let targetData = offset == -1 ? data : data.slice(0, offset);

  messageF.logMessage(`parse target: ${targetData}`)

  try {
    let msg = requestParser.LSP.request.tryParse(targetData);
    dispatch(msg);
    return offset != -1 ? data.slice(offset) : "";
  } catch (error) {
    messageF.logMessage(`incomplete input, wait.`);
    return data;
  }
}

function dispatch (msg) {
  if ("id" in msg && "method" in msg) { // request
    if (msg.method in requestTable.table) {
      requestTable.table[msg.method](msg);
    } else {
      messageF.sendMethodNotFoundResponse(msg.id, msg.method)
    }
  } else if ("id" in msg) { // response
    // Ignore.
    // This language server doesn't send any request.
    // If this language server receives a response, that is invalid.
  } else if ("method" in msg) { // notification
    if (msg.method in notificationTable.table) {
      notificationTable.table[msg.method](msg);
    }
  } else { // error
    messageF.sendInvalidRequestResponse();
  }
}

function languageServer() {
  let buffer = "";
  process.stdin.on("data", chunk => {
    buffer = parseRequest(buffer + chunk.toString());
  });
}

if (process.argv.length !== 3) {
  console.log(`usage: ${process.argv[1]} [--language-server|FILE]`);
} else if (process.argv[2] == "--language-server") {
  languageServer();
} else {
  // TODO: interpret(process.argv[2]);
}