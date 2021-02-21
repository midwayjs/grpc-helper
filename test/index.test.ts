import { Compiler } from '../src';
import { existsSync } from 'fs';
import { join } from 'path';
import { remove, readFileSync } from 'fs-extra';

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
    expect(existsSync(join(__dirname, './fixtures/math.ts'))).toBeTruthy();

    const content = readFileSync(join(__dirname, './fixtures/math.ts'), 'utf8');
    expect(content.includes('add(data: AddArgs): Promise<Num>;')).toBeTruthy();
    expect(content.includes('addMore(data: AddArgs): Promise<void>;')).toBeTruthy();
    expect(content.includes('sumMany(data: AddArgs): Promise<void>;')).toBeTruthy();
    expect(content.includes('addMany(data: AddArgs): Promise<void>;')).toBeTruthy();
    expect(content.includes('addEmpty(): Promise<void>;')).toBeTruthy();

    // client
    expect(content.includes('export interface MathClient {')).toBeTruthy();
    expect(content.includes('add(): grpc.IClientUnaryService<AddArgs, Num>;')).toBeTruthy();
    expect(content.includes('addMore(): grpc.IClientDuplexStreamService<AddArgs, Num>;')).toBeTruthy();
    expect(content.includes('sumMany(): grpc.IClientReadableStreamService<AddArgs, Num>;')).toBeTruthy();
    expect(content.includes('addMany(): grpc.IClientWritableStreamService<AddArgs, Num>;')).toBeTruthy();
    expect(content.includes('addEmpty(): grpc.IClientUnaryService<any, any>;')).toBeTruthy();

    await remove(join(__dirname, './fixtures/hero.ts'));
    await remove(join(__dirname, './fixtures/helloworld.ts'));
    await remove(join(__dirname, './fixtures/math.ts'));
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
    expect(existsSync(join(__dirname, './fixtures/domain/math.ts'))).toBeTruthy();

    await remove(join(__dirname, './fixtures/domain'));
  });
});
