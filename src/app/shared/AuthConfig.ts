import {  GoogleLoginProvider } from 'angularx-social-login';

import { environment } from '@src/environments/environment';


const config = new GoogleLoginProvider(environment.SOCIALCONFIG.GOOGLE.CLIENT_ID);

export function provideConfig() {
    return config;
  }


