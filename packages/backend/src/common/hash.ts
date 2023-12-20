import * as crypto from 'crypto';
export function hashString(inputString) {
  const hash = crypto.createHash('sha256');
  hash.update(inputString);
  return hash.digest('hex');
}
