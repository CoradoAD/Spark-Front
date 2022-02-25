// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  urlApi: 'http://localhost:8090',

  apis: {
    energy: {
      url: 'http://localhost:8090/api/energy',
    },
    vehicle: {
      url: 'http://localhost:8090/api/vehicle',
    },
    parking: {
      url: 'http://localhost:8090/api/parking',
    },
    zone: {
      url: 'http://localhost:8090/api/zone',
    },
    users: {
      url: 'http://localhost:8090/api/users',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
