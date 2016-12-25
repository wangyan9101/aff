export function Alias(path) {
  this.path = path;
}

export function alias(...path) {
  return new Alias(path);
}
