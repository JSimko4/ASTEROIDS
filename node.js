// Object Node
class Node {
  constructor() {
    // Nodes to message
    this.nodes = []
  }
  add(node) {
    this.nodes.push(node)
  }

  // Remove node
  remove(node) {
    var index = this.nodes.indexOf(node)
    delete this.nodes[index]
  }

  // Notify nodes of event
  notify(event, argument) {
    for (var index in this.nodes) {
      var node = this.nodes[index]
      if (typeof (node[event]) == "function")
        node[event](argument)
    }
  }
}