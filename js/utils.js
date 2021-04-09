export function getQueryString(name) {
  let search = window.location.search.substr(1) || window.location.hash.split('?')[1];
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  if (!search) return;
  let r = search.match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}