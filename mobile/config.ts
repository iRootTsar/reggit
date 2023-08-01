import {NGROK_DOMAIN} from 'react-native-dotenv';

export const config = {
    ngrokDomain: NGROK_DOMAIN,
    api: {
        url: `${NGROK_DOMAIN}`,
    },
};
