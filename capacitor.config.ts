import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bmb.misthan',
  appName: 'BMB-Misthan',
  webDir: 'public',
  server: {
    url: 'http://192.168.1.20:3000',
    cleartext: true
  }
};

export default config;
