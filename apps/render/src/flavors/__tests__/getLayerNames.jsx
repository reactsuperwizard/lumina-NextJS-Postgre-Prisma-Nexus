// // osascript apps/render/scripts/run-ae-script.scpt "/Users/huston/Projects/lumina-mono/apps/render/ae-helpers/getLayerNames.jsx"
// function ConsoleLog() {
//   //To view log from OSX terminal, execute:
//   //$ nc -lvk <port> (listens on localhost:<port>)
//   this.socket = new Socket()
//   this.estkIsRunning = BridgeTalk.isRunning('estoolkit')
//   this.hostPort = '127.0.0.1:9003'
// }

// ConsoleLog.prototype.log = function (logMessage) {
//   if (this.estkIsRunning) {
//     $.writeln(logMessage)
//   } else {
//     if (this.socket.open(this.hostPort)) {
//       this.socket.write(logMessage + '\n')
//       this.socket.close()
//     }
//   }
// }

// var console = new ConsoleLog()

// for (i = 0; i < 50; i++) {
//   console.log(i)
//   $.sleep(10)
// }

var socket = new Socket()
socket.open('127.0.0.1:9003')
$.level = 2

var items = []

/* step 1: collect all project comps */
var len = app.project.items.length
for (var i = 1; i <= len; i++) {
  var item = app.project.items[i]
  // if (item.name === '_control' || item.name === 'Main' ) {
  // if (item.name !== '*') {
  items.push(item)
  // socket.writeln(item.name)
  // }
}

var layers = []

/* step 2: collect layers from comps */
var len = items.length
for (var i = 0; i < len; i++) {
  var item = items[i]
  if (!item.layers) continue;
  for (var j = 1; j <= item.numLayers; j++) {
    socket.writeln(item.layers[j].name)
  }
}

socket.close()
