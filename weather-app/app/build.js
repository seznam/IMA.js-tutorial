let mainjs = ['./app/main.js'];

let js = ['./app/!(assets|gulp)/**/!(*Spec).{js,jsx}'];

let less = [
  './app/assets/less/app.less',
  './node_modules/ima-ui-atoms/dist/*.less',
  './app/component/**/*.less',
  './app/page/**/*.less'
];

let languages = {
  en: ['./app/**/*EN.json']
};

let vendors = {
  common: [
    'ima',
    'ima-plugin-select',
    'ima-ui-atoms',
    'xml-js',
  ],

  server: [],

  client: [],

  test: []
};

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
