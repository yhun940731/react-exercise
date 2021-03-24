export function groupCollapsed(id, message) {
  console.groupCollapsed(id)
  console.log(message);
  console.groupEnd(id)
}

export function group(id, message) {
  console.groupStart(id)
  console.log(message);
  console.groupEnd(id)
}