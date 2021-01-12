// import { run } from '../src/cli';
import { exec } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

describe('/test/index.test.ts', () => {
  it('test generate ts interface', async () => {
    await new Promise<void>((resolve, reject) => {
      exec('ts-node src/cli.ts --path ./test/fixtures', {}, (err, stdout) => {
        if (err) {
          reject(err);
        }
        console.log(stdout);
        resolve();
      })
    });
    expect(existsSync(join(__dirname, './fixtures/hero.ts'))).toBeTruthy();
    expect(existsSync(join(__dirname, './fixtures/helloworld.ts'))).toBeTruthy();
  });
});