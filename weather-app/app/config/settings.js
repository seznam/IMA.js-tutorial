import DocumentView from '../component/document/DocumentView';

export default (ns, oc, config) => {
  let versionStamp = `?version=${config.$Version}`;

  return {
    prod: {
      $Http: {
        defaultRequestOptions: {
          timeout: 7000, // Request timeout
          repeatRequest: 1, // Count of automatic repeated request after failing request.
          ttl: 0, // Default time to live for cached request in ms.
          headers: {
            // Set default request headers
            Accept: 'application/json',
            'Accept-Language': config.$Language
          },
          fetchOptions: {
            mode: 'cors'
          },
          cache: true
        },
        cacheOptions: {
          prefix: 'http.' // Cache key prefix for response bodies (already parsed as JSON) of completed HTTP requests.
        }
      },
      $Cache: {
        enabled: true,
        ttl: 60000
      },
      $Page: {
        $Render: {
          scripts: [
            `/static/js/locale/${config.$Language}.js${versionStamp}`,
            '/static/js/app.bundle.min.js' + versionStamp
          ],
          esScripts: [
            '/static/js/locale/' + config.$Language + '.js' + versionStamp,
            '/static/js/app.bundle.es.min.js' + versionStamp
          ],
          documentView: DocumentView
        }
      },
      $Static: {
        image: '/static/img',
        weatherIcons: '/static/weather-icons',
        css: '/static/css',
        js: '/static/js'
      },
      App: {
        api: config.$Protocol + '//' + config.$Host + '/api',
        geocoder: config.$Protocol + '//' + config.$Host + '/geo',
        suggest: config.$Protocol + '//' + config.$Host + '/suggest',
        defaultLocation: {
          title: 'Praha, okres Hlavní město Praha, kraj Hlavní město Praha, Česko',
          type: 'muni',
          lat: 50.0720383,
          lon: 14.4395213
        }
      }
    },

    test: {
      $Http: {
        defaultRequestOptions: {
          timeout: 5000
        }
      }
    },

    dev: {
      $Http: {
        defaultRequestOptions: {
          timeout: 2000
        }
      },
      $Page: {
        $Render: {
          scripts: [
            '/static/js/polyfill.js' + versionStamp,
            '/static/js/shim.js' + versionStamp,
            '/static/js/vendor.client.js' + versionStamp,
            `/static/js/locale/${config.$Language}.js${versionStamp}`,
            '/static/js/app.client.js' + versionStamp
          ],
          esScripts: [
            '/static/js/polyfill.es.js' + versionStamp,
            '/static/js/shim.es.js' + versionStamp,
            '/static/js/vendor.client.es.js' + versionStamp,
            `/static/js/locale/${config.$Language}.js${versionStamp}`,
            '/static/js/app.client.es.js' + versionStamp
          ]
        }
      }
    }
  };
};
