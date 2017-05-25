/**
 * Created by linmin on 24/5/17.
 */

const URI_REGEX = /^(https?:\/\/|^)(\w+(?::\w+)?(?:@))?([^\/:?#]+)(:\d+)?([^?#]*|$)(\?[^#]+|$)(\#.*|$)/i;

function checkScheme(scheme1, scheme2) {
  const s1 = (scheme1 || 'http://').toLowerCase();
  const s2 = (scheme2 || 'http://').toLowerCase();
  return s1 === s2;
}

function checkAuth(auth1, auth2) {
  return auth1 === auth2;
}

function checkHost(host1, host2) {
  const h1 = host1.toLowerCase();
  const h2 = host2.toLowerCase();
  return h1 === h2;
}

function checkPort(port1, port2) {
  const p1 = Number(port1) || 80;
  const p2 = Number(port2) || 80;
  return p1 === p2;
}

function checkPath(path1, path2) {
  const normalizePath = (path) => {
    const stack = [];
    path.split(/\//).forEach(dir => {
      if (dir === '' || dir === '.') return;
      if (dir === '..') {
        stack.pop();
      } else {
        stack.push(decodeURIComponent(dir));
      }
    });
    return stack.join('/');
  };
  const p1 = normalizePath(path1);
  const p2 = normalizePath(path2);
  return p1 === p2;
}

function checkQuery(query1, query2) {
  const normalizeQuery = query => {
    return query.split(/[?&]/).filter(item => item !== '').sort((a, b) => {
      return a.split('=')[0] > b.split('=')[0] ? 1 : -1;
    }).join('&');
  }
  const q1 = normalizeQuery(query1);
  const q2 = normalizeQuery(query2);
  return q1 === q2;
}

function checkFragment(fragment1, fragment2) {
  const f1 = fragment1 || '#';
  const f2 = fragment2 || '#';
  return f1 === f2;
}

function checkURIs(uri1, uri2) {
  const [match1, scheme1, auth1, host1, port1, path1, query1, fragment1] = uri1.match(URI_REGEX);
  const [match2, scheme2, auth2, host2, port2, path2, query2, fragment2] = uri2.match(URI_REGEX);
  const rules = [
    {func: checkScheme, params: [scheme1, scheme2]},
    {func: checkAuth, params: [auth1, auth2]},
    {func: checkHost, params: [host1, host2]},
    {func: checkPort, params: [port1, port2]},
    {func: checkPath, params: [path1, path2]},
    {func: checkQuery, params: [query1, query2]},
  ];
  return rules.every(rule => rule.func(...rule.params));
}

module.exports = checkURIs;
