// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE = 'http://127.0.0.1:8000';
export const environment = {
 production: false,
 BASE,
 BASE_URL: BASE + '/api/v1',
 SOCIALCONFIG: {
   GOOGLE: {
     CLIENT_ID: '801658343486-rcllnh6daj9fdurkft4itu5pi3395ebl.apps.googleusercontent.com'
   },
   GITHUB: {
     CLIENT_ID: '7c2bb91d6bfaafa948dd', // your Client ID from GitHub
     CLIENT_SCERET: '594b2ea05812e3525e8d82341610ba7bf74cf57f',
     REDIRECT_URI: 'http://localhost:4200/auth/redirect-social', // authentication url
   }
 },
  CLOUDINARYKEY: {
   UPLOAD_PRESET: 'juq19lee',
   API_KEY: '319429336786386'
  }
};

/*
* In development mode, for easier debugging, you can ignore zone related error
* stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
* below file. Don't forget to comment it out in production mode
* because it will have a performance impact when errors are thrown
*/
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
