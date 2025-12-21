import { DeepLinkHandler } from '../types';

export const telegramHandler: DeepLinkHandler = {
  match: (url) => url.match(/t\.me\/([^/?]+)/),

  build: (webUrl, match) => {
    const username = match[1];

    return {
      webUrl,
      ios: `tg://resolve?domain=${username}`,
      android: `intent://resolve?domain=${username}#Intent;scheme=tg;package=org.telegram.messenger;end`,
      platform: 'telegram',
    };
  },
};
