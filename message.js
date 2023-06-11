exports.sendMessage = (msg) => {
  const s = new TextEncoder("utf-8").encode(JSON.stringify(msg));
  process.stdout.write(`Content-Length: ${s.length}\r\n\r\n`);
  process.stdout.write(s);
}

exports.sendErrorResponse = (id, code, message) => {
  exports.sendMessage({ jsonrpc: "2.0", id, error: { code, message } });
}

exports.sendInvalidRequestResponse = () => {
  exports.sendErrorResponse(null, -32600, "received an invalid request");
}

exports.sendMethodNotFoundResponse = (id, method) => {
  exports.sendErrorResponse(id, -32601, method + " is not supported");
}

exports.logMessage = (message) => {
  exports.sendMessage({ jsonrpc: "2.0", method: "window/logMessage", params: { type: 3, message } });
}
