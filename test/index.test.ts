import { Compiler } from '../src';
import { existsSync } from 'fs';
import { join } from 'path';

describe('/test/index.test.ts', () => {
  it('test generate ts interface', async () => {
    const compiler = new Compiler({
      path: ['test/fixtures'],
      target: ['.proto'],
      ignore: ['node_modules', 'dist'],
    });

    compiler.compile();
    
    expect(existsSync(join(__dirname, './fixtures/hero.ts'))).toBeTruthy();
    expect(existsSync(join(__dirname, './fixtures/helloworld.ts'))).toBeTruthy();
  });
});