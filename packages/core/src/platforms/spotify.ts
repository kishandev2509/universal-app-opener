import { DeepLinkHandler } from '../types';

export const spotifyHandler: DeepLinkHandler = {
  match: (url) => url.match(/open.spotify\.com\/track\/([^/?]+)/),

  build: (webUrl, match) => {
    const songId = match[1];

    return {
      webUrl,
      ios: `spotify://track/${songId}`,
      android: `intent://track/${songId}#Intent;scheme=spotify;package=com.spotify.music;end`,
      platform: 'spotify',
    };
  },
};
