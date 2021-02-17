import { Compiler } from '../src';
import { existsSync } from 'fs';
import { join } from 'path';
import { remove } from 'fs-extra';

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

    await remove(join(__dirname, './fixtures/hero.ts'));
    await remove(join(__dirname, './fixtures/helloworld.ts'));
  });

  it('test generate ts interface to specified directory', async () => {
    const compiler = new Compiler({
      path: ['test/fixtures'],
      target: ['.proto'],
      ignore: ['node_modules', 'dist'],
      output: 'test/fixtures/domain'
    });

    compiler.compile();
    
    expect(existsSync(join(__dirname, './fixtures/domain/hero.ts'))).toBeTruthy();
    expect(existsSync(join(__dirname, './fixtures/domain/helloworld.ts'))).toBeTruthy();

    await remove(join(__dirname, './fixtures/domain'));
  });
});