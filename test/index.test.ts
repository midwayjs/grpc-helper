import { Compiler } from '../src';
import { existsSync } from 'fs';
import { join } from 'path';
import { remove, readFileSync } from 'fs-extra';

describe('/test/index.test.ts', () => {
  it('test generate ts interface', async () => {
    const compiler = new Compiler({
      path: ['test/fixtures/common'],
      target: ['.proto'],
      ignore: ['node_modules', 'dist'],
    });

    compiler.compile();

    expect(existsSync(join(__dirname, './fixtures/common/hero.ts'))).toBeTruthy();
    expect(existsSync(join(__dirname, './fixtures/common/helloworld.ts'))).toBeTruthy();
    expect(existsSync(join(__dirname, './fixtures/common/math.ts'))).toBeTruthy();

    const content = readFileSync(join(__dirname, './fixtures/common/math.ts'), 'utf8');
    expect(content.includes('add(data: AddArgs): Promise<Num>;')).toBeTruthy();
    expect(content.includes('addMore(data: AddArgs): Promise<void>;')).toBeTruthy();
    expect(content.includes('sumMany(data: AddArgs): Promise<void>;')).toBeTruthy();
    expect(content.includes('addMany(data: AddArgs): Promise<void>;')).toBeTruthy();
    expect(content.includes('addEmpty(): Promise<void>;')).toBeTruthy();

    // client
    expect(content.includes('export interface MathClient {')).toBeTruthy();
    expect(content.includes('add(options?: grpc.IClientOptions): grpc.IClientUnaryService<AddArgs, Num>;')).toBeTruthy();
    expect(content.includes('addMore(options?: grpc.IClientOptions): grpc.IClientDuplexStreamService<AddArgs, Num>;')).toBeTruthy();
    expect(content.includes('sumMany(options?: grpc.IClientOptions): grpc.IClientReadableStreamService<AddArgs, Num>;')).toBeTruthy();
    expect(content.includes('addMany(options?: grpc.IClientOptions): grpc.IClientWritableStreamService<AddArgs, Num>;')).toBeTruthy();
    expect(content.includes('addEmpty(options?: grpc.IClientOptions): grpc.IClientUnaryService<any, any>;')).toBeTruthy();

    await remove(join(__dirname, './fixtures/common/hero.ts'));
    await remove(join(__dirname, './fixtures/common/helloworld.ts'));
    await remove(join(__dirname, './fixtures/common/math.ts'));
    await remove(join(__dirname, './fixtures/common/hello_stream.ts'));
  });

  it('test generate ts interface to specified directory', async () => {
    const compiler = new Compiler({
      path: ['test/fixtures/common'],
      target: ['.proto'],
      ignore: ['node_modules', 'dist'],
      output: 'test/fixtures/common/domain'
    });

    compiler.compile();

    expect(existsSync(join(__dirname, './fixtures/common/domain/hero.ts'))).toBeTruthy();
    expect(existsSync(join(__dirname, './fixtures/common/domain/helloworld.ts'))).toBeTruthy();
    expect(existsSync(join(__dirname, './fixtures/common/domain/math.ts'))).toBeTruthy();

    await remove(join(__dirname, './fixtures/common/domain'));
  });

  it('test generate ts interface keep case', async () => {
    const compiler = new Compiler({
      path: ['test/fixtures/keep_case'],
      target: ['.proto'],
      ignore: ['node_modules', 'dist'],
      output: 'test/fixtures/keep_case/domain',
      keepCase: true,
    });

    compiler.compile();

    expect(existsSync(join(__dirname, './fixtures/keep_case/domain/helloworld_keep_case.ts'))).toBeTruthy();
    const content = readFileSync(join(__dirname, './fixtures/keep_case/domain/helloworld_keep_case.ts'), 'utf8');
    expect(content.includes('key_filed')).toBeTruthy();

    await remove(join(__dirname, './fixtures/keep_case/domain'));
  });

  it('test fix issue 999', async () => {
    const compiler = new Compiler({
      path: ['test/fixtures/issue999'],
      target: ['.proto'],
      ignore: ['node_modules', 'dist'],
      output: 'test/fixtures/issue999/domain',
      keepCase: true,
    });

    compiler.compile();
  });
});
