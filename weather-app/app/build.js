let mainjs = ['./app/main.js'];

let js = ['./app/!(assets|gulp)/**/!(*Spec|*E2E).{js,jsx}'];

let less = [
  './app/assets/less/app.less',
  './node_modules/@ima/plugin-atoms/dist/*.less',
  './app/component/**/*.less',
  './app/page/**/*.less'
];

let languages = {
  cs: ['./app/**/*CS.json'],
  en: ['./app/**/*EN.json']
};

let vendors = {
  common: ['@ima/plugin-atoms', '@ima/plugin-select', 'prop-types', 'xml-js'],

  server: [{ '@ima/core': '@ima/core/dist/ima.server.cjs.js' }],

  client: [{ '@ima/core': '@ima/core/dist/ima.client.cjs.js' }],

  test: []
};

// You can add this somewhere below the vendors variable initialization
if (
  process.env.NODE_ENV === 'dev' ||
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === undefined
) {
  vendors.common.push('@ima/plugin-websocket');
  vendors.common.push('@ima/plugin-hot-reload');
}

let bundle = {
  js: [
    './build/static/js/polyfill.js',
    './build/static/js/shim.js',
    './build/static/js/vendor.client.js',
    './build/static/js/app.client.js'
  ],
  es: [
    './build/static/js/polyfill.es.js',
    './build/static/js/shim.js',
    './build/static/js/vendor.client.es.js',
    './build/static/js/app.client.es.js'
  ],
  css: ['./build/static/css/app.css']
};

module.exports = {
  js,
  mainjs,
  less,
  languages,
  vendors,
  bundle
};
