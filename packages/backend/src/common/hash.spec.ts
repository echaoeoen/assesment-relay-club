import { hashString } from './hash';

describe('src/common/hash.ts', () => {
  it('should return hashed by sha256 algo when request param is valid', () => {
    const hashed = hashString('some-string');
    expect(hashed).toBe(
      'a3635c09bda7293ae1f144a240f155cf151451f2420d11ac385d13cce4eb5fa2',
    );
  });
});
