export const DEFAULT_AVATAR = require('../assets/images/avatar.png');

export function getAvatarSource(uri) {
  if (!uri || !String(uri).trim()) {
    return DEFAULT_AVATAR;
  }
  return { uri: String(uri).trim() };
}
