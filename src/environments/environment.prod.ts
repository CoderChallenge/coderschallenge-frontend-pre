 // const BASE = 'http://www.api.ulearncommunity.com';
 const BASE = 'https://codechallenger-staging.herokuapp.com';
 export const environment = {
  production: true,
  BASE,
  BASE_URL: BASE + '/api/v1',
  SOCIALCONFIG: {
    GOOGLE: {
      CLIENT_ID: '801658343486-mbhj4n6b3h8cf6tg5c10jve38svgaj0t.apps.googleusercontent.com'
    },
    GITHUB: {
      CLIENT_ID: 'a0eb929456cc30483c98', // your Client ID from GitHub
      CLIENT_SCERET: '019061f1f91e9d09d4f6a61fd2cbf9277775c3d9',
      REDIRECT_URI: 'https://code-challenger.netlify.app/auth/redirect-social', // authentication url
    }
  },
   CLOUDINARYKEY:{
     UPLOAD_PRESET:'juq19lee',
     API_KEY:'319429336786386'
   }
 };
