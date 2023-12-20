import awaitToError from './await-to-error';

describe('src/common/await-to-error.test.ts', () => {
  it(`should return [err, null] when promise throws an error`, async () => {
    const [err, result] = await awaitToError<Error>(
      (async function () {
        throw new Error('some error');
      })(),
    );
    expect(result).toBeNull();
    expect(err.message).toBe('some error');
  });
  it(`should return [null, reuslt] when promise throws an error`, async () => {
    const [err, result] = await awaitToError(
      (async function () {
        return 'some result';
      })(),
    );
    expect(result).toBe('some result');
    expect(err).toBeNull();
  });
});
