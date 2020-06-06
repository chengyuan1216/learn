export function getTableParent() {
  let parent = this.$parent;
  // 如果有tableId代表这是table实例
  while (parent && !parent.tableId) {
    parent = parent.$parent;
  }
  return parent;
}
