export function getNode(gun, path) {
  if (!gun) return null
  if (!path) return gun
  return path.split('/').reduce((node, part) => node.get(part), gun)
}
