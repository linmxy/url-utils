/**
 * Created by linmin on 25/5/17.
 */
var assert = require('assert');
var checkURI = require('./checkURI');

assert(checkURI('http://abc.com', 'abc.com') === true, 'default protocal');
assert(checkURI('http://abc.com', 'HTTP://abc.com') === true, 'protocal case insensitive');
assert(checkURI('abc.com', 'ABC.com') === true, 'domain case insensitive');
assert(checkURI('abc.com:80', 'ABC.com') === true, 'default port');
assert(checkURI('user:password@abc.com:80', 'user1:password1@ABC.com') === false, 'basic auth is handled');
assert(checkURI('http://abc.com:80/~smith/home.html', 'http://ABC.com/%7Esmith/home.html') === true, 'path HEX encoding');
assert(checkURI('http://abc.com/drill/down/foo.html', 'http://abc.com/drill/further/../down/./foo.html') === true, 'path dot is handled');
assert(checkURI('http://abc.com/foo.html?a=1&b=2', 'http://abc.com/foo.html?b=2&a=1') === true, 'query params order is handled');
assert(checkURI('http://abc.com/foo.html?a=1&b=2&a=3', 'http://abc.com/foo.html?a=3&a=1&b=2') === false, 'multiple same named query');
assert(checkURI('http://abc.com/#', 'http://abc.com') === false, 'fragment is checked');

console.log('All test cases past');
